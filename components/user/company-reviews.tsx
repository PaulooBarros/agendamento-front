import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function CompanyReviews() {
  const reviews = [
    {
      id: 1,
      author: "Maria Silva",
      initials: "MS",
      rating: 5,
      date: "Há 2 dias",
      comment: "Excelente atendimento! A profissional foi muito atenciosa e o resultado ficou perfeito.",
    },
    {
      id: 2,
      author: "João Santos",
      initials: "JS",
      rating: 5,
      date: "Há 1 semana",
      comment: "Melhor barbearia da região. Sempre saio satisfeito com o corte.",
    },
    {
      id: 3,
      author: "Paula Oliveira",
      initials: "PO",
      rating: 4,
      date: "Há 2 semanas",
      comment: "Muito bom! Ambiente agradável e profissionais qualificados. Recomendo!",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Avaliações</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{review.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-card-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
