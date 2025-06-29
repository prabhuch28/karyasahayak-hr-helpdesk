import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardAPI, DashboardStats } from '../../services/api';
import StatsCards from './StatsCards';
import RecentTickets from './RecentTickets';
import QuickActions from './QuickActions';
import LoadingSpinner from '../common/LoadingSpinner';
import { TrendingUp, Clock, Users, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const achievements = [
    { title: 'Quick Responder', description: 'Responded to tickets within 2 hours', icon: Clock, color: 'bg-blue-500' },
    { title: 'Problem Solver', description: 'Resolved 10+ tickets this month', icon: Award, color: 'bg-green-500' },
    { title: 'Team Player', description: 'Helped colleagues with their requests', icon: Users, color: 'bg-purple-500' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {getGreeting()}, {user?.firstName}! 👋
              </h1>
              <p className="text-xl text-white/90 mb-4">
                Here's what's happening with your HR requests today.
              </p>
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-sm">All systems operational</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm">Avg response: 2 hours</span>
                </div>
              </div>
            </div>
            <QuickActions />
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Tickets - Takes 2 columns */}
        <div className="xl:col-span-2">
          {stats && <RecentTickets tickets={stats.recentTickets} />}
        </div>
        
        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Popular Knowledge Articles */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Popular Articles
            </h3>
            <div className="space-y-3">
              {[
                { title: 'How to Request PTO', views: 245, category: 'PTO' },
                { title: 'Payroll Schedule 2024', views: 189, category: 'Payroll' },
                { title: 'Benefits Enrollment Guide', views: 156, category: 'Benefits' },
                { title: 'Remote Work Policy', views: 134, category: 'Policy' },
                { title: 'Expense Reimbursement', views: 98, category: 'Finance' }
              ].map((article, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">{article.title}</span>
                    <span className="text-xs text-gray-500">{article.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{article.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {user?.role === 'EMPLOYEE' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Your Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className={`p-2 rounded-lg ${achievement.color} mr-3`}>
                      <achievement.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Quick Tips</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Use specific titles for faster ticket resolution</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Check the knowledge base before creating tickets</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Include relevant details and dates in descriptions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;