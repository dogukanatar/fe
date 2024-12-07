import { useState } from 'react';
import { Menu, MessageCircle, Calendar, BookOpen, List, LogIn, UserPlus } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'courses', icon: BookOpen, label: 'Course List' },
    { id: 'mylist', icon: List, label: 'My List' },
    { id: 'signin', icon: LogIn, label: 'Sign In' },
    { id: 'signup', icon: UserPlus, label: 'Sign Up' },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'signup':
        return <div className="p-4">Sign Up Page</div>;
      case 'signin':
        return <div className="p-4">Sign In Page</div>;
      case 'mylist':
        return <div className="p-4">My List Page</div>;
      case 'schedule':
        return <div className="p-4">Schedule Page</div>;
      case 'courses':
        return <div className="p-4">Course List Page</div>;
      case 'chat':
        return <div className="p-4">Chat Interface</div>;
      default:
        return <div className="p-4">Welcome to the Home Page</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {isSidebarOpen && <span className="font-semibold">YourApp</span>}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg mb-1 
                ${currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                ${!isSidebarOpen && 'justify-center'}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}