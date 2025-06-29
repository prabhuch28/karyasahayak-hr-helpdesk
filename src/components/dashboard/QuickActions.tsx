import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, MessageSquare } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      to: '/tickets/new',
      icon: Plus,
      label: 'New Ticket',
      color: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
      to: '/knowledge',
      icon: BookOpen,
      label: 'Browse KB',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <div className="flex space-x-3">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.to}
          className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${action.color}`}
        >
          <action.icon className="w-4 h-4 mr-2" />
          {action.label}
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;