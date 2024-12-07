import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={renderPage()} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
};

