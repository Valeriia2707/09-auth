import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_PREFIXES = ["/profile", "/notes"];

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

 
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;

  let isAuthenticated = !!accessToken;
  const response = NextResponse.next();


  if (!accessToken && refreshToken) {
    try {

      const sessionRes = await checkSession();

      if (sessionRes.status === 200 && sessionRes.data.isSuccess) {
        isAuthenticated = true;

        const setCookieHeaders = sessionRes.headers["set-cookie"];
        
        if (setCookieHeaders) {

          setCookieHeaders.forEach((cookie) => {
            response.headers.append("set-cookie", cookie);
          });
        }
      }
    } catch (error) {
      console.error("Middleware session check failed:", error);
      isAuthenticated = false;
    }
  }

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isPrivate = PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));


  if (!isAuthenticated && isPrivate) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  
  if (isAuthenticated && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; 
    

    const redirectResponse = NextResponse.redirect(url);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        redirectResponse.headers.append(key, value);
      }
    });
    return redirectResponse;
  }

  return response;
}