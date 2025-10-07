'use client'
import { Activity, Users, Zap, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Active Workflows',
    value: '12',
    change: '+4.75%',
    changeType: 'positive',
    icon: Zap,
  },
  {
    name: 'Total Executions',
    value: '1,247',
    change: '+12.02%',
    changeType: 'positive',
    icon: Activity,
  },
  {
    name: 'Connected Apps',
    value: '8',
    change: '+2.05%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Success Rate',
    value: '98.2%',
    change: '+0.14%',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}