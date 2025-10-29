import { ClientsManagement } from "@/components/dashboard/clients-management"

export default function ClientesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua base de clientes</p>
          </div>

          <ClientsManagement />
        </div>
      </div>
    </div>
  )
}
