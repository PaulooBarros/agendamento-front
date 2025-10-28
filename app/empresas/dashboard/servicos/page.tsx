import { ServicesManagement } from "@/components/dashboard/services-management"

export default function ServicosPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Serviços</h1>
            <p className="text-muted-foreground">Adicione e gerencie os serviços oferecidos pela sua empresa</p>
          </div>

          <ServicesManagement />
        </div>
      </div>
    </div>
  )
}
