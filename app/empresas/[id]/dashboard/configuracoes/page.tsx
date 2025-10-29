import { CompanySettings } from "@/components/dashboard/company-settings"

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações da sua empresa</p>
          </div>

          <CompanySettings />
        </div>
      </div>
    </div>
  )
}
