import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentAppointments } from "@/components/dashboard/recent-appointments"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do seu negócio</p>
          </div>

          {/* Stats */}
          <DashboardStats />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Appointments */}
          <RecentAppointments />
        </div>
      </div>
    </div>
  )
}
