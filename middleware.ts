export { default } from "next-auth/middleware";

export const config = {
    // Protect these specific routes - all other routes are public
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/billing/:path*",
        "/grants/:path*",
        "/literature/:path*",
        "/methodology/:path*",
        "/analysis/:path*",
        "/novelty/:path*",
        "/drafting/:path*",
        "/tools/:path*",
        "/community/:path*",
        "/notifications/:path*",
        "/trends/:path*",
    ],
};

