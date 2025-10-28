import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Calendar } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-lg mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-foreground">AgendaPro</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">Entre com sua conta para continuar</p>
        </div>

        <LoginForm />

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-primary font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            É uma empresa?{" "}
            <Link href="/empresas/cadastro" className="text-primary font-medium hover:underline">
              Cadastre sua empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
