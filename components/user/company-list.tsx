"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CompanyList() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    }
  }, []);

  const companies = [
    {
      id: 1,
      name: "Salão Beleza Total",
      category: "Salão de Beleza",
      rating: 4.8,
      reviews: 124,
      address: "Rua das Flores, 123 - Centro",
      distance: "1.2 km",
      priceRange: "R$ 50 - R$ 150",
      openNow: true,
      image: "/beauty-salon-interior.png",
    },
    {
      id: 2,
      name: "Barbearia Moderna",
      category: "Barbearia",
      rating: 4.9,
      reviews: 89,
      address: "Av. Principal, 456 - Jardins",
      distance: "2.5 km",
      priceRange: "R$ 40 - R$ 80",
      openNow: true,
      image: "/modern-barbershop.png",
    },
    {
      id: 3,
      name: "Estética Avançada",
      category: "Estética",
      rating: 4.7,
      reviews: 156,
      address: "Rua do Comércio, 789 - Vila Nova",
      distance: "3.8 km",
      priceRange: "R$ 80 - R$ 200",
      openNow: false,
      image: "/aesthetic-clinic.jpg",
    },
    {
      id: 4,
      name: "Spa Relaxante",
      category: "Spa",
      rating: 4.6,
      reviews: 67,
      address: "Alameda das Palmeiras, 321 - Alto da Boa Vista",
      distance: "4.2 km",
      priceRange: "R$ 100 - R$ 300",
      openNow: true,
      image: "/relaxing-spa.jpg",
    },
  ];

  const handleAgendar = (companyId: number) => {
    if (isLoggedIn) {
      router.push(`/empresa/${companyId}/agendar`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{companies.length} estabelecimentos encontrados</p>
      </div>

      <div className="grid gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={company.image || "/placeholder.svg"}
                  alt={company.name}
                  className="w-full h-full object-cover min-h-[200px]"
                />
              </div>
              <div className="md:col-span-2 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.category}</p>
                    </div>
                    {company.openNow ? (
                      <Badge className="bg-green-500/10 text-green-700">Aberto</Badge>
                    ) : (
                      <Badge variant="secondary">Fechado</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{company.rating}</span>
                      <span className="text-muted-foreground">({company.reviews} avaliações)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {company.address} • {company.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{company.priceRange}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/empresa/${company.id}`}>Ver Detalhes</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleAgendar(company.id)}
                  >
                    <span>{isLoggedIn ? "Agendar Agora" : "Login para Agendar"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
