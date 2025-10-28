import Link from "next/link"
import { Calendar, Building2, Users, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground">
              Agendamentos Profissionais Simplificados
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A plataforma completa para empresas gerenciarem agendamentos e clientes encontrarem os melhores serviços
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/empresas">Cadastrar Minha Empresa</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/buscar">Buscar Serviços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Recursos profissionais para empresas e experiência simplificada para clientes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Agenda Inteligente</h3>
              <p className="text-muted-foreground text-sm">
                Sistema de calendário completo com visualização de horários disponíveis em tempo real
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Gestão de Clientes</h3>
              <p className="text-muted-foreground text-sm">
                Cadastro completo de clientes com histórico de agendamentos e preferências
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Relatórios e Análises</h3>
              <p className="text-muted-foreground text-sm">
                Acompanhe o desempenho do seu negócio com relatórios detalhados e insights
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Para Empresas
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Gerencie seu negócio com eficiência
                </h2>
                <p className="text-muted-foreground text-lg text-pretty">
                  Dashboard completo para gerenciar agendamentos, serviços, profissionais e muito mais
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Cadastro ilimitado de serviços e profissionais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Notificações automáticas para clientes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Controle de horários e disponibilidade</span>
                  </li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/empresas">Começar Agora</Link>
                </Button>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <span className="font-medium text-card-foreground">Agendamentos Hoje</span>
                    <span className="text-2xl font-bold text-primary">24</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                    <span className="font-medium text-card-foreground">Novos Clientes</span>
                    <span className="text-2xl font-bold text-accent">12</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                    <span className="font-medium text-card-foreground">Taxa de Ocupação</span>
                    <span className="text-2xl font-bold text-secondary">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">Salão Beleza Total</h4>
                      <p className="text-sm text-muted-foreground">Corte e Escova - R$ 80,00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">Barbearia Moderna</h4>
                      <p className="text-sm text-muted-foreground">Corte + Barba - R$ 60,00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">Estética Avançada</h4>
                      <p className="text-sm text-muted-foreground">Limpeza de Pele - R$ 120,00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                  Para Clientes
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Encontre e agende com facilidade
                </h2>
                <p className="text-muted-foreground text-lg text-pretty">
                  Busque serviços próximos a você e agende em poucos cliques
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Busca por localização e categoria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Visualize horários disponíveis em tempo real</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Histórico completo de agendamentos</span>
                  </li>
                </ul>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/buscar">Buscar Serviços</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Pronto para começar?</h2>
            <p className="text-lg text-primary-foreground/90 text-pretty">
              Junte-se a centenas de empresas que já utilizam nossa plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/empresas">Cadastrar Empresa</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/cadastro">Criar Conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
