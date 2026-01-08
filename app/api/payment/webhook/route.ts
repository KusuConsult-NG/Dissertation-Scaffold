import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { updateUser, getUser } from "@/lib/db";

export async function POST(req: Request) {
    try {
        // Get Paystack signature from headers
        const headersList = headers();
        const signature = headersList.get("x-paystack-signature");

        if (!signature) {
            console.error("[Webhook] No signature provided");
            return NextResponse.json({ error: "No signature" }, { status: 400 });
        }

        // Get raw body for signature verification
        const body = await req.text();

        // Verify signature
        const hash = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
            .update(body)
            .digest("hex");

        if (hash !== signature) {
            console.error("[Webhook] Invalid signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // Parse the event
        const event = JSON.parse(body);

        console.log(`[Webhook] Received event: ${event.event}`);

        // Handle different event types
        switch (event.event) {
            case "charge.success":
                await handleChargeSuccess(event.data);
                break;

            case "subscription.create":
            case "subscription.disable":
                // Future: Handle subscription events
                console.log(`[Webhook] ${event.event} event received (not yet implemented)`);
                break;

            default:
                console.log(`[Webhook] Unhandled event type: ${event.event}`);
        }

        // Always return 200 to acknowledge receipt
        return NextResponse.json({ received: true });

    } catch (error) {
        console.error("[Webhook] Error processing webhook:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

async function handleChargeSuccess(data: any) {
    try {
        const { reference, customer, metadata, amount, status } = data;

        // Only process successful payments
        if (status !== "success") {
            console.log(`[Webhook] Skipping non-success charge: ${status}`);
            return;
        }

        // Extract plan from metadata
        const plan = metadata?.custom_fields?.find(
            (field: any) => field.variable_name === "plan"
        )?.value;

        if (!plan) {
            console.error("[Webhook] No plan found in metadata");
            return;
        }

        // Find user by email from customer data
        const userEmail = customer.email;
        const user = getUser(userEmail);

        if (!user) {
            console.error(`[Webhook] User not found: ${userEmail}`);
            return;
        }

        // Update user plan
        const updatedUser = updateUser(userEmail, {
            plan: plan.toLowerCase(),
        });

        console.log(
            `[Webhook] Successfully updated ${userEmail} to ${plan} plan (ref: ${reference})`
        );

        // Optional: Store payment record
        // In production, you'd save this to a payments table
        // savePaymentRecord({ reference, userEmail, plan, amount, timestamp: new Date() });

    } catch (error) {
        console.error("[Webhook] Error handling charge.success:", error);
        throw error;
    }
}
