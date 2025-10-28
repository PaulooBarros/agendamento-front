"use client"

import Link from "next/link"
import { Building2, Calendar, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogged = localStorage.getItem("loggedIn") === "true"
      setLoggedIn(isLogged)
      if (isLogged) {
        // Para o login padrão, podemos usar "Admin"
        setUserName("Admin")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    setLoggedIn(false)
    setUserName("")
    // opcional: redirecionar para home
    window.location.href = "/"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/empresas"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Para Empresas
            </Link>
            <Link
              href="/buscar"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Agendar
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <>
                <span className="text-sm font-medium text-foreground">Olá, {userName}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/cadastro">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="/empresas"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="w-4 h-4" />
                Para Empresas
              </Link>
              <Link
                href="/buscar"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                Agendar
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {loggedIn ? (
                  <>
                    <span className="text-sm font-medium text-foreground px-4">Olá, {userName}</span>
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
