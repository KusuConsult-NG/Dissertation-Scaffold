import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    let hasSecret = false;
    let hasUrl = false;
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && key.trim() === 'NEXTAUTH_SECRET' && value && value.trim().length > 0) {
            hasSecret = true;
        }
        if (key && key.trim() === 'NEXTAUTH_URL' && value && value.trim().length > 0) {
            hasUrl = true;
            console.log("Found URL:", value.trim());
        }
    });

    if (hasSecret) {
        console.log("✅ NEXTAUTH_SECRET is set.");
    } else {
        console.error("❌ NEXTAUTH_SECRET is MISSING.");
    }

    if (hasUrl) {
        console.log("✅ NEXTAUTH_URL is set.");
    } else {
        console.error("❌ NEXTAUTH_URL is MISSING. (Might default to localhost matching VERCEL_URL if not set)");
    }
} else {
    console.error("❌ .env.local file not found.");
}
