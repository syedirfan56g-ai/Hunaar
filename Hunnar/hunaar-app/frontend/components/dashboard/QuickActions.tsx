'use client'
import Link from 'next/link'
import { Plus, Zap, Link as LinkIcon, BarChart } from 'lucide-react'

const actions = [
  {
    name: 'Create Workflow',
    href: '/dashboard/workflows/new',
    icon: Plus,
    description: 'Build a new automation',
    color: 'bg-primary-500 hover:bg-primary-600',
  },
  {
    name: 'Add Integration',
    href: '/dashboard/integrations',
    icon: LinkIcon,
    description: 'Connect new apps',
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'View Analytics',
    href: '/dashboard/analytics',
    icon: BarChart,
    description: 'Check performance',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
]

export function QuickActions() {
  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6 space-y-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">{action.name}</h4>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}