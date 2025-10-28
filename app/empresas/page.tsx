import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Users, BarChart3 } from "lucide-react"

export default function EmpresasPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-balance text-foreground">
              Gerencie sua empresa com eficiência
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Dashboard completo para controlar agendamentos, serviços, profissionais e muito mais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/empresas/dashboard">Acessar Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/empresas/cadastro">Cadastrar Empresa</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Gestão de Agendamentos</h3>
            <p className="text-muted-foreground text-sm">
              Visualize e gerencie todos os agendamentos em um calendário intuitivo
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Cadastro de Profissionais</h3>
            <p className="text-muted-foreground text-sm">
              Adicione e gerencie sua equipe de profissionais e seus horários
            </p>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Relatórios e Análises</h3>
            <p className="text-muted-foreground text-sm">
              Acompanhe métricas importantes e o desempenho do seu negócio
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
