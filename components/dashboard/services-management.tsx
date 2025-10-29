"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Pencil, Plus } from "lucide-react"

export function ServiceManagement({ empresaId }: { empresaId: string }) {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: "", descricao: "", preco: "", duracao: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  // 🔹 Buscar serviços existentes
  useEffect(() => {
    if (empresaId) fetchServices()
  }, [empresaId])

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("empresa_id", empresaId)
      .order("id", { ascending: true })

    if (error) console.error("Erro ao carregar serviços:", error.message)
    else setServices(data || [])
  }

  // 🔹 Criar novo serviço
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { nome, descricao, preco, duracao } = formData
    const { error } = await supabase.from("servicos").insert([
      {
        empresa_id: empresaId,
        nome,
        descricao,
        preco: parseFloat(preco),
        duracao_minutos: parseInt(duracao),
      },
    ])

    if (error) alert("Erro ao adicionar serviço: " + error.message)
    else {
      await fetchServices()
      setFormData({ nome: "", descricao: "", preco: "", duracao: "" })
    }

    setLoading(false)
  }

  // 🔹 Editar serviço existente
  const handleEditService = (service: any) => {
    setEditingId(service.id)
    setFormData({
      nome: service.nome,
      descricao: service.descricao,
      preco: service.preco,
      duracao: service.duracao_minutos,
    })
  }

  // 🔹 Salvar alterações no serviço
  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { nome, descricao, preco, duracao } = formData
    const { error } = await supabase
      .from("servicos")
      .update({
        nome,
        descricao,
        preco: parseFloat(preco),
        duracao_minutos: parseInt(duracao),
      })
      .eq("id", editingId)

    if (error) alert("Erro ao atualizar serviço: " + error.message)
    else {
      setEditingId(null)
      await fetchServices()
      setFormData({ nome: "", descricao: "", preco: "", duracao: "" })
    }

    setLoading(false)
  }

  // 🔹 Excluir serviço
  const handleDeleteService = async (id: string) => {
    if (!confirm("Deseja realmente excluir este serviço?")) return
    const { error } = await supabase.from("servicos").delete().eq("id", id)
    if (error) alert("Erro ao excluir serviço: " + error.message)
    else fetchServices()
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {editingId ? "Editar Serviço" : "Adicionar Novo Serviço"}
        </h2>
        <form onSubmit={editingId ? handleUpdateService : handleAddService} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duracao">Duração (minutos)</Label>
              <Input
                id="duracao"
                type="number"
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading
              ? "Salvando..."
              : editingId
              ? "Salvar Alterações"
              : "Adicionar Serviço"}
          </Button>
        </form>
      </Card>

      {/* Lista de Serviços */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Serviços Cadastrados</h2>
        {services.length === 0 ? (
          <p className="text-muted-foreground">Nenhum serviço cadastrado ainda.</p>
        ) : (
          <ul className="divide-y divide-border">
            {services.map((service) => (
              <li key={service.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">{service.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.descricao} — R$ {service.preco?.toFixed(2)} — {service.duracao_minutos} min
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditService(service)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
