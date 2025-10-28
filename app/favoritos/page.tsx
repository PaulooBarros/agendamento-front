import { FavoriteCompanies } from "@/components/user/favorite-companies"

export default function FavoritosPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Favoritos</h1>
            <p className="text-muted-foreground">Seus estabelecimentos favoritos</p>
          </div>
          <FavoriteCompanies />
        </div>
      </div>
    </div>
  )
}
