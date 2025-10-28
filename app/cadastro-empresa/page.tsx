import { CompanyRegistrationForm } from "@/components/company-registration-form"

export default function CadastroEmpresaPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Cadastro de Empresa</h1>
            <p className="text-muted-foreground">
              Preencha os dados da sua empresa para começar a receber agendamentos
            </p>
          </div>
          <CompanyRegistrationForm />
        </div>
      </div>
    </div>
  )
}
