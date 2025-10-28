import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Calendar, Users, Scissors, Settings } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Novo Agendamento",
      description: "Criar um novo agendamento",
      icon: Calendar,
      href: "/empresas/dashboard/agendamentos/novo",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Gerenciar Serviços",
      description: "Adicionar ou editar serviços",
      icon: Scissors,
      href: "/empresas/dashboard/servicos",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Gerenciar Profissionais",
      description: "Adicionar ou editar profissionais",
      icon: Users,
      href: "/empresas/dashboard/profissionais",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Configurações",
      description: "Ajustar configurações da empresa",
      icon: Settings,
      href: "/empresas/dashboard/configuracoes",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="p-6 hover:shadow-lg transition-all hover:border-primary cursor-pointer h-full">
              <div className="space-y-3">
                <div className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
