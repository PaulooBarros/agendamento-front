"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Calendar,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

interface UserProfile {
  nome?: string
  tipo?: "usuario" | "empresa"
  empresa_id?: string
}

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Carrega sessão e identifica tipo de usuário
  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session

      if (session?.user) {
        const userId = session.user.id

        // Verifica se é empresa
        const { data: empresa } = await supabase
          .from("empresas")
          .select("id, nome")
          .eq("admin_id", userId)
          .single()

        if (empresa) {
          setUser({ nome: empresa.nome, tipo: "empresa", empresa_id: empresa.id })
          setLoading(false)
          return
        }

        // Se não for empresa, verifica se é usuário comum
        const { data: usuario } = await supabase
          .from("usuarios")
          .select("nome")
          .eq("id", userId)
          .single()

        if (usuario) {
          setUser({ nome: usuario.nome, tipo: "usuario" })
        } else {
          setUser({ nome: session.user.email || "Usuário" })
        }
      } else {
        setUser(null)
      }

      setLoading(false)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => loadUser())

    return () => subscription.unsubscribe()
  }, [])

  // 🔹 Logout forçado (limpa sessão do Supabase + localStorage)
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" })
      localStorage.clear()
      setUser(null)
      router.refresh()
      router.push("/")
    } catch (err) {
      console.error("Erro ao deslogar:", err)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">AgendaPro</span>
          </Link>

          {/* Navegação Desktop */}
          {!loading && (
            <nav className="hidden md:flex items-center gap-6">
              {user?.tipo === "empresa" ? (
                <Link
                  href={`/empresas/${user.empresa_id}/dashboard`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  Minha Empresa
                </Link>
              ) : (
                <>
                  <Link
                    href="/empresas"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    Para Empresas
                  </Link>
                  <Link
                    href="/buscar"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* Área de Autenticação Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-foreground flex items-center gap-1">
                  {user.tipo === "empresa" ? (
                    <>
                      <Briefcase className="w-4 h-4 text-primary" />
                      {user.nome}
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 text-primary" />
                      {user.nome}
                    </>
                  )}
                </span>

                {user.tipo === "empresa" && user.empresa_id && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      router.push(`/empresas/${user.empresa_id}/dashboard`)
                    }
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Painel
                  </Button>
                )}

                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sair
                </Button>
              </>
            ) : (
              !loading && (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/cadastro">Cadastrar</Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && !loading && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {user?.tipo === "empresa" ? (
                <Link
                  href={`/empresas/${user.empresa_id}/dashboard`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Minha Empresa
                </Link>
              ) : (
                <>
                  <Link
                    href="/empresas"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Building2 className="w-4 h-4" />
                    Para Empresas
                  </Link>
                  <Link
                    href="/buscar"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar
                  </Link>
                </>
              )}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <span className="text-sm font-medium text-foreground px-4 flex items-center gap-1">
                      {user.tipo === "empresa" ? (
                        <>
                          <Briefcase className="w-4 h-4 text-primary" />
                          {user.nome}
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4 text-primary" />
                          {user.nome}
                        </>
                      )}
                    </span>

                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-1" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Entrar
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                        Cadastrar
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
