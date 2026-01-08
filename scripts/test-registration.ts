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

async function testRegistration() {
    console.log("Testing Registration API...");

    // Dynamic import to ensure env vars are loaded first
    const { POST } = await import("../app/api/auth/register/route");

    // Mock request
    const mockRequest = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Test User",
            email: `test-${Date.now()}@example.com`,
            password: "password123",
            state: "Lagos",
            lga: "Ikeja",
            institution: "Unilag",
            researchLevel: "PhD",
            researchArea: "AI in Medicine"
        }),
    });

    try {
        const response = await POST(mockRequest);
        const data = await response.json();

        if (response.status === 201) {
            console.log("✅ Registration Successful!");
            console.log("User created:", data.user.email);
            console.log("Research Level:", data.user.researchLevel);
        } else {
            console.error("❌ Registration Failed:", response.status);
            console.error(data);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Test Error:", error);
        process.exit(1);
    }
}

testRegistration();
