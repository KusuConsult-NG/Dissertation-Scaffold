import fs from 'fs';
import path from 'path';

// Load environment variables Manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} else {
    console.warn("No .env.local file found");
}

async function verifyUser() {
    console.log("Verifying User Retrieval...");

    // Dynamic import
    const { getUser } = await import("../lib/db");

    // Use the email from the previous successful creation or a known one
    // Since I can't easily parse the previous unique email, I'll rely on the one I just saw in logs or create a new one.
    // Let's try to fetch a user I know likely exists or I'll create one AND then fetch it.

    const email = "test-verification@example.com";
    const { createUser } = await import("../lib/db");

    // 1. Create a user to be sure
    console.log(`Creating user: ${email}`);
    await createUser({
        name: "Verification User",
        email,
        password: "password123",
        image: null,
        bio: "",
        title: "Tester",
        plan: "free",
    });

    // 2. Try to get the user
    console.log(`Fetching user: ${email}`);
    const user = await getUser(email);

    if (user) {
        console.log("✅ User found!");
        console.log("ID:", user.id);
        console.log("Email:", user.email);
        console.log("Password:", user.password);
    } else {
        console.error("❌ User NOT found after creation!");
    }

    process.exit(0);
}

verifyUser();
