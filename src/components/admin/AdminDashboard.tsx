import React from 'react';
import { Users, Ticket, BookOpen, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Open Tickets', value: '56', icon: Ticket, color: 'bg-yellow-500' },
    { title: 'Knowledge Articles', value: '89', icon: BookOpen, color: 'bg-green-500' },
    { title: 'Resolution Rate', value: '94%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              'New ticket created by John Doe',
              'Article "PTO Policy" updated',
              'Ticket #123 resolved by HR Team',
              'New user registered: Jane Smith',
              'Knowledge base article published',
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-gray-900">45ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-gray-900">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <span className="text-sm font-medium text-gray-900">127</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;