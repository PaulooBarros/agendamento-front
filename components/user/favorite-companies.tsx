import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Heart } from "lucide-react"

export function FavoriteCompanies() {
  const favorites = [
    {
      id: 1,
      name: "Salão Beleza Total",
      category: "Salão de Beleza",
      rating: 4.8,
      reviews: 124,
      address: "Rua das Flores, 123 - Centro",
      openNow: true,
      image: "/placeholder.svg?key=popid",
    },
    {
      id: 2,
      name: "Barbearia Moderna",
      category: "Barbearia",
      rating: 4.9,
      reviews: 89,
      address: "Av. Principal, 456 - Jardins",
      openNow: true,
      image: "/placeholder.svg?key=w7pxa",
    },
  ]

  return (
    <div className="space-y-6">
      {favorites.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {favorites.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={company.image || "/placeholder.svg"} alt={company.name} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.category}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Heart className="w-5 h-5 fill-current" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">{company.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({company.reviews} avaliações)</span>
                    {company.openNow && <Badge className="bg-green-500/10 text-green-700 ml-auto">Aberto</Badge>}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{company.address}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/empresa/${company.id}`}>Ver Detalhes</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/empresa/${company.id}/agendar`}>Agendar</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Você ainda não tem favoritos</p>
          <Button asChild>
            <Link href="/buscar">Buscar Estabelecimentos</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
