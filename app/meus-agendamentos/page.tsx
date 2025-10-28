import { UserAppointments } from "@/components/user/user-appointments"

export default function MeusAgendamentosPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meus Agendamentos</h1>
            <p className="text-muted-foreground">Visualize e gerencie todos os seus agendamentos</p>
          </div>
          <UserAppointments />
        </div>
      </div>
    </div>
  )
}
