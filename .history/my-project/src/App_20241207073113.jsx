import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './components/pages/auth/SignUp';
import { Menu, MessageCircle, Calendar, BookOpen, List, LogIn, UserPlus } from 'lucide-react';
import SignIn from './components/pages/auth/SignIn';
import CourseList from './components/pages/CourseList';
import MyList from './components/pages/MyList';
import Timetable from './components/pages/Timetable';
import ChatInterface from './components/pages/ChatInterface';

export default function App() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'timetable', icon: Calendar, label: 'Timetable' },
    { id: 'courses', icon: BookOpen, label: 'Course List' },
    { id: 'mylist', icon: List, label: 'My List' },
    { id: 'signin', icon: LogIn, label: 'Sign In' },
    { id: 'signup', icon: UserPlus, label: 'Sign Up' },
  ];

  /**
   * Render the page based on the current page state.
   * @returns {JSX.Element} The rendered page.
   */
  const renderPage = () => {
    switch(currentPage) {
      case 'signup':
        return <SignUp />;
      case 'signin':
        return <SignIn />;
      case 'mylist':
        return <MyList />;
      case 'timetable':
        return <Timetable />;
      case 'courses':
        return <CourseList />;
      case 'chat':
        return <ChatInterface />;
      default:
        return <div className="p-4">Welcome to kimmmmchi</div>;
    }
  };

  return (
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === 'bot'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Loader className="animate-spin h-5 w-5 text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
  
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
            className={`p-3 rounded-lg ${
              loading || !inputMessage.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
  );
};

export default ChatInterface;
