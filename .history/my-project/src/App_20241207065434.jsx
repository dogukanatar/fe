import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MessageCircle, Calendar, BookOpen, List, LogIn, UserPlus } from 'lucide-react';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import CourseList from './CourseList';
import MyList from './MyList';
import ChatInterface from './ChatInterface';
import Timetable from './Timetable';

export default function App() {
  const [currentPage, setCurrentPage] = useState('courses');
  
  const navItems = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'courses', icon: BookOpen, label: 'Course List' },
    { id: 'mylist', icon: List, label: 'My List' },
    { id: 'signin', icon: LogIn, label: 'Sign In' },
    { id: 'signup', icon: UserPlus, label: 'Sign Up' }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'signin':
        return <SignIn />;
      case 'signup':
        return <SignUp />;
      case 'mylist':
        return <MyList />;
      case 'schedule':
        return <Timetable />;
      case 'courses':
        return <CourseList />;
      case 'chat':
        return <ChatInterface />;
      default:
        return <div className="text-2xl font-bold">Welcome to the Home Page</div>;
    }
  };

  return (
    <Router>
      <div className="h-screen flex bg-white">
        <div className="w-64 bg-gray-50 border-r flex flex-col">
          <div className="p-4 border-b">
            <span className="text-xl font-bold text-gray-800">Course Manager</span>
          </div>
          
          <nav className="flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-100
                  ${currentPage === item.id ? 'bg-blue-50 text-blue-600 hover:bg-blue-50' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b px-6 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.id === currentPage)?.label || 'Home'}
              </h1>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-white">
            <div className="max-w-7xl mx-auto p-6">
              {renderPage()}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}