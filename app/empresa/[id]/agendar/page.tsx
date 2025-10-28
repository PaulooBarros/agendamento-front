import { BookingSystem } from "@/components/booking/booking-system"

export default function AgendarPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Fazer Agendamento</h1>
            <p className="text-muted-foreground">Selecione o serviço, profissional, data e horário</p>
          </div>

          <BookingSystem />
        </div>
      </div>
    </div>
  )
}
