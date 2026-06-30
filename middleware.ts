import { NextRequest, NextResponse } from "next/server";

/**
 * Canonical-host enforcement. We pick ONE convention — https + www + no
 * trailing slash — and 301 the variants:
 *   • trailing slash       → handled by Next (trailingSlash: false) automatically
 *   • http → https         → handled by Vercel at the edge automatically
 *   • apex/non-www → www   → enforced here with a permanent (301) redirect
 *
 * Only the bare apex is rewritten, so there is no redirect loop. Localhost and
 * *.vercel.app preview hosts are left untouched.
 */
const CANONICAL_HOST = "www.hamiltoncitydental.ca";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  // Skip local dev and Vercel preview deployments.
  if (host.startsWith("localhost") || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  // Redirect the apex (and any non-www form of the brand domain) to www.
  if (host === "hamiltoncitydental.ca") {
    const url = req.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on pages only; skip Next internals, the API and static assets.
  matcher: ["/((?!_next/|api/|assets/|favicon.ico|.*\\..*).*)"],
};
