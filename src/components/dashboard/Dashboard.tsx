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
    { title: 'Quick Responder', description: 'Responded to tickets within 2 hours', icon: Clock, color: 'bg-primary-500' },
    { title: 'Problem Solver', description: 'Resolved 10+ tickets this month', icon: Award, color: 'bg-success-500' },
    { title: 'Team Player', description: 'Helped colleagues with their requests', icon: Users, color: 'bg-secondary-500' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden gradient-brand rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-brand">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                {getGreeting()}, {user?.firstName}! 👋
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-3 sm:mb-4">
                Here's what's happening with your HR requests today.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-white/80">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm">All systems operational</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm">Avg response: 2 hours</span>
                </div>
              </div>
            </div>
            <div className="lg:ml-4">
              <QuickActions />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Tickets - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          {stats && <RecentTickets tickets={stats.recentTickets} />}
        </div>
        
        {/* Sidebar Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Popular Knowledge Articles */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-neutral-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
              Popular Articles
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { title: 'How to Request PTO', views: 245, category: 'PTO' },
                { title: 'Payroll Schedule 2024', views: 189, category: 'Payroll' },
                { title: 'Benefits Enrollment Guide', views: 156, category: 'Benefits' },
                { title: 'Remote Work Policy', views: 134, category: 'Policy' },
                { title: 'Expense Reimbursement', views: 98, category: 'Finance' }
              ].map((article, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-neutral-50 rounded-lg sm:rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer card-hover-subtle">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-medium text-neutral-900 block truncate">{article.title}</span>
                    <span className="text-xs text-neutral-500">{article.category}</span>
                  </div>
                  <div className="text-right ml-2">
                    <span className="text-xs text-neutral-500">{article.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {user?.role === 'EMPLOYEE' && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-neutral-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3 sm:mb-4 flex items-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-warning-600" />
                Your Achievements
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start p-2 sm:p-3 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg sm:rounded-xl">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${achievement.color} mr-2 sm:mr-3 flex-shrink-0`}>
                      <achievement.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-neutral-900 truncate">{achievement.title}</h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl border border-primary-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-primary-900 mb-3 sm:mb-4">💡 Quick Tips</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-primary-800">
              <div className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                <span>Use specific titles for faster ticket resolution</span>
              </div>
              <div className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                <span>Check the knowledge base before creating tickets</span>
              </div>
              <div className="flex items-start">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
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
