import Link from "next/link"
import { Calendar } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground">AgendaPro</span>
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              Plataforma profissional de agendamento para empresas e clientes.
            </p>
          </div>

          {/* Para Empresas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Para Empresas</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/empresas"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cadastrar Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas/planos"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Planos e Preços
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Clientes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Para Clientes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buscar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Buscar Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/meus-agendamentos"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Meus Agendamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/favoritos"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-foreground">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgendaPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
