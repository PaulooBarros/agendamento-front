import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Clock, Phone, Mail, Share2, Heart } from "lucide-react"

export function CompanyDetails() {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src="/beauty-salon-interior.png"
              alt="Salão Beleza Total"
              className="w-full md:w-80 h-64 object-cover rounded-lg"
            />

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-card-foreground">Salão Beleza Total</h1>
                    <p className="text-muted-foreground">Salão de Beleza</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-700">Aberto</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <span className="text-sm text-muted-foreground">(124 avaliações)</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Salão de beleza completo com profissionais especializados em cortes, coloração, tratamentos capilares e
                muito mais. Ambiente moderno e acolhedor.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Rua das Flores, 123 - Centro, São Paulo - SP</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Seg - Sex: 9h às 19h | Sáb: 9h às 17h</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>contato@belezatotal.com</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritar
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
