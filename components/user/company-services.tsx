"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CompanyServices() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
    }
  }, []);

  const services = [
    { id: 1, name: "Corte Feminino", description: "Corte de cabelo feminino com lavagem e finalização", duration: "60 min", price: "R$ 80,00" },
    { id: 2, name: "Corte Masculino", description: "Corte de cabelo masculino", duration: "30 min", price: "R$ 40,00" },
    { id: 3, name: "Escova Progressiva", description: "Escova progressiva com produtos de alta qualidade", duration: "120 min", price: "R$ 200,00" },
    { id: 4, name: "Coloração", description: "Coloração completa com produtos profissionais", duration: "90 min", price: "R$ 150,00" },
    { id: 5, name: "Manicure", description: "Manicure completa com esmaltação", duration: "45 min", price: "R$ 35,00" },
    { id: 6, name: "Pedicure", description: "Pedicure completa com esmaltação", duration: "45 min", price: "R$ 40,00" },
  ];

  const handleAgendar = (serviceId: number) => {
    if (isLoggedIn) {
      router.push(`/empresa/${serviceId}/agendar`);
    } else {
      router.push("/login"); // redireciona para login se não estiver logado
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Serviços</h2>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg text-card-foreground">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{service.price}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => handleAgendar(service.id)}>
                {isLoggedIn ? "Agendar" : "Login para Agendar"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
