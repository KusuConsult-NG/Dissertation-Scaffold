export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/trends/:path*",
        "/grants/:path*",
        "/novelty/:path*",
        "/methodology/:path*",
        "/community/:path*",
        "/literature/:path*",
        "/pricing/:path*"
    ]
};
