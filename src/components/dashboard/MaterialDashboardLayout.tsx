import React, { ReactNode } from 'react';

interface MaterialDashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const MaterialDashboardLayout: React.FC<MaterialDashboardLayoutProps> = ({ 
  children, 
  title = 'Dashboard' 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                NT
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">NovaTrust</span>
            </div>
            
            <nav className="space-y-2">
              {[
                { icon: '🏠', label: 'Dashboard', href: '/dashboard' },
                { icon: '💰', label: 'My Funds', href: '/funds' },
                { icon: '📊', label: 'Analytics', href: '/analytics' },
                { icon: '🎯', label: 'Auctions', href: '/auctions' },
                { icon: '📝', label: 'Documents', href: '/documents' },
                { icon: '⚙️', label: 'Settings', href: '/settings' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200"
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-600">Welcome back to NovaTrust</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">User</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
            </div>
          </header>
          
          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MaterialDashboardLayout; 