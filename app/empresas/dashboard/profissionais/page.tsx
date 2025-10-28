import { ProfessionalsManagement } from "@/components/dashboard/professionals-management"

export default function ProfissionaisPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Profissionais</h1>
            <p className="text-muted-foreground">Adicione e gerencie os profissionais da sua equipe</p>
          </div>

          <ProfessionalsManagement />
        </div>
      </div>
    </div>
  )
}
