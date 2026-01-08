import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUser } from "@/lib/db";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { reference, plan } = await req.json();

        if (!reference || !plan) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Verify payment with Paystack API
        const verifyUrl = `https://api.paystack.co/transaction/verify/${reference}`;
        const paystackResponse = await fetch(verifyUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!paystackResponse.ok) {
            console.error('[Payment] Paystack verification failed:', await paystackResponse.text());
            return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
        }

        const verificationData = await paystackResponse.json();

        // Check if payment was successful
        if (!verificationData.data || verificationData.data.status !== 'success') {
            console.error('[Payment] Payment not successful:', verificationData);
            return NextResponse.json({ error: "Payment was not successful" }, { status: 400 });
        }

        console.log(`[Payment] Verified reference ${reference} for plan ${plan}. Updating user ${session.user.email}.`);

        // Update user plan in DB
        const updatedUser = await updateUser(session.user.email, {
            plan: plan.toLowerCase(), // 'pro', 'enterprise'
        });

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return success with updated user data
        return NextResponse.json({
            success: true,
            user: updatedUser,
            plan: updatedUser.plan
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
