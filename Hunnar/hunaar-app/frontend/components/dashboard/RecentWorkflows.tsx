'use client'
import Link from 'next/link'
import { Play, Pause, MoreHorizontal, Calendar } from 'lucide-react'

const workflows = [
  {
    id: 1,
    name: 'Gmail → Slack Notifications',
    description: 'Send Slack messages when important emails arrive',
    status: 'active',
    lastRun: '2 hours ago',
    executions: 45,
    successRate: 98,
  },
  {
    id: 2,
    name: 'Lead Capture → CRM',
    description: 'Automatically add new leads to Salesforce',
    status: 'active',
    lastRun: '5 minutes ago',
    executions: 23,
    successRate: 100,
  },
  {
    id: 3,
    name: 'Social Media → Analytics',
    description: 'Track social mentions in Google Sheets',
    status: 'paused',
    lastRun: '1 day ago',
    executions: 12,
    successRate: 95,
  },
  {
    id: 4,
    name: 'Customer Support → Ticket',
    description: 'Create support tickets from form submissions',
    status: 'active',
    lastRun: '30 minutes ago',
    executions: 78,
    successRate: 97,
  },
]

export function RecentWorkflows() {
  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Workflows</h3>
          <Link
            href="/dashboard/workflows"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            View all
          </Link>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {workflow.name}
                  </h4>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    workflow.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {workflow.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {workflow.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last run: {workflow.lastRun}
                  </div>
                  <div>
                    {workflow.executions} executions
                  </div>
                  <div className="text-green-600">
                    {workflow.successRate}% success
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-md hover:bg-gray-100 ${
                    workflow.status === 'active' ? 'text-yellow-600' : 'text-green-600'
                  }`}
                  title={workflow status === 'active' ? 'Pause workflow' : 'Resume workflow'}
                >
                  {workflow.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <button className="p-2 rounded-md hover:bg-gray-100 text-gray-400">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}