import { AppointmentsCalendar } from "@/components/dashboard/appointments-calendar"

export default function AgendamentosPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
            <p className="text-muted-foreground">Visualize e gerencie todos os agendamentos</p>
          </div>

          <AppointmentsCalendar />
        </div>
      </div>
    </div>
  )
}
