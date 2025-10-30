"use client"

import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
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
  Clock,
  Users,
  Wrench,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

interface UserProfile {
  nome?: string
  tipo?: "usuario" | "empresa"
  email?: string
  empresa_id?: string
}

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [authLoaded, setAuthLoaded] = useState(false)

  const loadUser = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session

      if (!session?.user) {
        setUser(null)
        setAuthLoaded(true)
        return
      }

      const userId = session.user.id

      // Verifica se é empresa
      const { data: empresa } = await supabase
        .from("empresas")
        .select("id, nome")
        .eq("admin_id", userId)
        .maybeSingle()

      if (empresa) {
        setUser({
          nome: empresa.nome,
          tipo: "empresa",
          empresa_id: empresa.id,
          email: session.user.email || "",
        })
        setAuthLoaded(true)
        return
      }

      // Caso contrário, é usuário comum
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("nome")
        .eq("id", userId)
        .maybeSingle()

      setUser({
        nome: usuario?.nome || session.user.email || "Usuário",
        tipo: "usuario",
        email: session.user.email || "",
      })
    } catch (err) {
      console.error("Erro ao carregar sessão:", err)
    } finally {
      setAuthLoaded(true)
    }
  }, [])

  useEffect(() => {
    loadUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) loadUser()
      else setUser(null)
    })
    return () => subscription.unsubscribe()
  }, [loadUser])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      localStorage.clear()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erro ao deslogar:", error)
    }
  }

  const renderEmpresaMenu = () => (
    <>
      <Link href={`/empresas/${user?.empresa_id}/dashboard`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>
      <Link href={`/empresas/${user?.empresa_id}/dashboard/servicos`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Wrench className="w-4 h-4" />
        Serviços
      </Link>
      <Link href={`/empresas/${user?.empresa_id}/dashboard/funcionarios`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Users className="w-4 h-4" />
        Funcionários
      </Link>
      <Link href={`/empresas/${user?.empresa_id}/dashboard/agendamentos`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Calendar className="w-4 h-4" />
        Agendamentos
      </Link>
      <Link href={`/empresas/${user?.empresa_id}/dashboard/horarios`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Clock className="w-4 h-4" />
        Horários
      </Link>
    </>
  )

  const renderUsuarioMenu = () => (
    <>
      <Link href="/buscar" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Calendar className="w-4 h-4" />
        Buscar Serviços
      </Link>
      <Link href="/agendamentos" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Clock className="w-4 h-4" />
        Meus Agendamentos
      </Link>
      <Link href="/perfil" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <User className="w-4 h-4" />
        Meu Perfil
      </Link>
    </>
  )

  const renderNaoLogadoMenu = () => (
    <>
      <Link href="/empresas" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Building2 className="w-4 h-4" />
        Para Empresas
      </Link>
      <Link href="/buscar" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <Calendar className="w-4 h-4" />
        Buscar Serviços
      </Link>
    </>
  )

  // ==============================
  // JSX principal
  // ==============================

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

          {/* Menu principal */}
          {!authLoaded ? (
            <div className="text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              {user?.tipo === "empresa"
                ? renderEmpresaMenu()
                : user?.tipo === "usuario"
                ? renderUsuarioMenu()
                : renderNaoLogadoMenu()}
            </nav>
          )}

          {/* Avatar + Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {user.nome?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{user.nome}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.tipo === "empresa" ? "Conta Empresarial" : "Usuário Comum"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.tipo === "empresa" ? (
                    <DropdownMenuItem asChild>
                      <Link href={`/empresas/${user.empresa_id}/dashboard`}>
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Painel da Empresa
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">
                        <User className="w-4 h-4 mr-2" /> Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/configuracoes">
                      <Settings className="w-4 h-4 mr-2" /> Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              authLoaded && (
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

          {/* Botão menu mobile */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && authLoaded && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {user?.tipo === "empresa"
                ? renderEmpresaMenu()
                : user?.tipo === "usuario"
                ? renderUsuarioMenu()
                : renderNaoLogadoMenu()}

              {user && (
                <div className="pt-4 border-t border-border space-y-2">
                  <p className="px-4 text-sm font-medium">{user.nome}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sair
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
