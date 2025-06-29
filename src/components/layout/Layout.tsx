import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatSupport from '../features/ChatSupport';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="container-responsive">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Features */}
      <ChatSupport />
    </div>
  );
};

export default Layout;
