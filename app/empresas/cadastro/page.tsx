import { CompanyRegistrationForm } from "@/components/auth/company-registration-form"
import Link from "next/link"
import { Calendar } from "lucide-react"

export default function CadastroEmpresaPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-lg mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-foreground">AgendaPro</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Cadastrar Empresa</h1>
          <p className="text-muted-foreground">Preencha os dados da sua empresa para começar</p>
        </div>

        <CompanyRegistrationForm />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
