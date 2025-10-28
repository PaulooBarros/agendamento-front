import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // lê cookie
  const loggedIn = req.cookies.get("loggedIn")?.value === "true";

  // se não estiver logado e tentar acessar a rota de agendamento
  if (
    req.nextUrl.pathname.startsWith("/empresa/") &&
    req.nextUrl.pathname.includes("/agendar") &&
    !loggedIn
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // permite acesso normal
  return NextResponse.next();
}

// Define quais rotas o middleware deve observar
export const config = {
  matcher: ["/empresa/:path*/agendar"],
};
