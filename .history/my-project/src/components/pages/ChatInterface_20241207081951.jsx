import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Plus, Trash2, Edit2, Download, MessageCircle, Upload, FileText, X } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ChatInterface = () => {
  const [chats, setChats] = useState([
    { 
      id: 1, 
      name: 'New Chat', 
      messages: [{ 
        id: 1, 
        text: 'Hello! I can help you with course recommendations and schedule planning. You can also share files or ask me questions!', 
        sender: 'bot', 
        timestamp: new Date() 
      }] 
    }
  ]);
  
  const [currentChatId, setCurrentChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingChatName, setEditingChatName] = useState(null);
  const [newChatName, setNewChatName] = useState('');
  const [recommendationState, setRecommendationState] = useState({
    active: false,
    step: null,
    selectedKeywords: [],
    excludedKeywords: []
  });
  
  const messagesEndRef = useRef(null);
  const chatContentRef = useRef(null);
  const fileInputRef = useRef(null);

  const keywords = [
    'Programming', 'Algorithms', 'Data Structures', 'Web Development',
    'Artificial Intelligence', 'Machine Learning', 'Database Systems',
    'Computer Networks', 'Cybersecurity', 'Software Engineering',
    'Mobile Development', 'Cloud Computing', 'Operating Systems'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentChat = () => chats.find(chat => chat.id === currentChatId);

  const addMessage = (message) => {
    setChats(prevChats => prevChats.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, { ...message, id: chat.messages.length + 1 }] }
        : chat
    ));
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
    if (!isValidType) {
      addMessage({
        text: "Please upload only images (PNG, JPEG) or PDF files.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      });
      return;
    }

    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > 10) {
      addMessage({
        text: "File size should be less than 10MB.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      });
      return;
    }

    // Add file message
    addMessage({
      sender: 'user',
      timestamp: new Date(),
      type: 'file',
      fileData: {
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }
    });

    // Bot response for file upload
    setTimeout(() => {
      addMessage({
        text: `I've received your ${file.type.includes('pdf') ? 'PDF' : 'image'}: ${file.name}`,
        sender: 'bot',
        timestamp: new Date()
      });
    }, 1000);
  };

  const startCourseRecommendation = () => {
    setRecommendationState({
      active: true,
      step: 'keywords',
      selectedKeywords: [],
      excludedKeywords: []
    });

    addMessage({
      text: "Let's find the perfect courses for you! Please select up to 7 keywords that interest you:",
      sender: 'bot',
      timestamp: new Date(),
      type: 'keyword-selection',
      keywords: keywords
    });
  };

  const handleKeywordSelection = (keyword) => {
    const { selectedKeywords } = recommendationState;
    
    if (selectedKeywords.length < 7) {
      const updatedKeywords = [...selectedKeywords, keyword];
      setRecommendationState(prev => ({
        ...prev,
        selectedKeywords: updatedKeywords
      }));

      if (updatedKeywords.length === 7) {
        // Move to exclusion step
        moveToExclusionStep();
      }
    }
  };

  const moveToExclusionStep = () => {
    setRecommendationState(prev => ({
      ...prev,
      step: 'exclusions'
    }));

    addMessage({
      text: "Great! Now, select any topics you're NOT interested in:",
      sender: 'bot',
      timestamp: new Date(),
      type: 'keyword-exclusion',
      keywords: keywords.filter(k => !recommendationState.selectedKeywords.includes(k))
    });
  };

  const createNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `New Chat ${chats.length + 1}`,
      messages: [{
        id: 1,
        text: 'Hello! How can I help you with your courses today?',
        sender: 'bot',
        timestamp: new Date()
      }]
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId) => {
    if (chats.length === 1) return;
    setChats(chats.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(chats[0].id);
    }
  };

  const startEditingChatName = (chatId, currentName) => {
    setEditingChatName(chatId);
    setNewChatName(currentName);
  };

  const saveChatName = (chatId) => {
    if (newChatName.trim()) {
      setChats(chats.map(chat => 
        chat.id === chatId ? { ...chat, name: newChatName.trim() } : chat
      ));
    }
    setEditingChatName(null);
    setNewChatName('');
  };

  const exportToPDF = async () => {
    const currentChat = getCurrentChat();
    if (!currentChat) return;

    const content = document.createElement('div');
    content.innerHTML = `
      <h2 style="text-align: center; margin-bottom: 20px;">${currentChat.name}</h2>
      ${currentChat.messages.map(msg => `
        <div style="margin: 10px 0; ${msg.sender === 'bot' ? '' : 'text-align: right;'}">
          <strong>${msg.sender === 'bot' ? 'Bot' : 'You'}:</strong>
          <div style="margin-top: 5px;">${msg.text}</div>
          <small style="color: gray;">${new Date(msg.timestamp).toLocaleString()}</small>
        </div>
      `).join('')}
    `;

    const opt = {
      margin: 1,
      filename: `${currentChat.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save();
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentChat = getCurrentChat();
    const newMessage = {
      id: currentChat.messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChats(chats.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ));
    setInputMessage('');
    setLoading(true);

    // Check for course recommendation trigger
    if (inputMessage.toLowerCase().includes('recommend') || 
        inputMessage.toLowerCase().includes('suggestion')) {
      startCourseRecommendation();
      setLoading(false);
      return;
    }

    try {
      setTimeout(() => {
        const botResponse = {
          id: currentChat.messages.length + 2,
          text: `I understand you're asking about "${inputMessage}". How can I help you further?`,
          sender: 'bot',
          timestamp: new Date()
        };

        setChats(chats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botResponse] }
            : chat
        ));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  const currentChat = getCurrentChat();

  return (
    <div className="flex h-full">
      {/* Keep your existing sidebar code */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          New Chat
        </button>

        <div className="space-y-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                currentChatId === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              {editingChatName === chat.id ? (
                <input
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  onBlur={() => saveChatName(chat.id)}
                  onKeyPress={(e) => e.key === 'Enter' && saveChatName(chat.id)}
                  className="flex-1 px-2 py-1 text-sm border rounded"
                  autoFocus
                />
              ) : (
                <>
                  <div
                    className="flex items-center gap-2 flex-1"
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    <MessageCircle size={16} />
                    <span className="truncate">{chat.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditingChatName(chat.id, chat.name)}
                      className="p-1 hover:text-blue-500"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteChat(chat.id)}
                      className="p-1 hover:text-red-500"
                      disabled={chats.length === 1}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col h-full">
        {/* Keep your existing header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{currentChat?.name}</h2>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Download size={18} />
            Export PDF
          </button>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContentRef}>
          {currentChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === 'bot'
                    ? 'bg-gray-100 text-gray-800'
                    : message.type === 'file'
                    ? 'bg-white border'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.type === 'file' ? (
                  <div className="space-y-2">
                    {message.fileData.type.startsWith('image/') ? (
                      <img 
                        src={message.fileData.url} 
                        alt={message.fileData.name}
                        className="max-w-full rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <FileText size={20} />
                        <span>{message.fileData.name}</span>
                      </div>
                    )}
                  </div>
                ) : message.type === 'keyword-selection' || message.type === 'keyword-exclusion' ? (
                  <div>
                    <p>{message.text}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.keywords.map(keyword => (
                        <button
                          key={keyword}
                          onClick={() => handleKeywordSelection(keyword)}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>{message.text}</div>
                    <div className="text-xs mt-2 opacity-70">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </>
                )}
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

        {/* Enhanced Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              accept="image/*,.pdf"
            />
            <button
              onClick={handleFileButton}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Upload file"
            >
              <Upload size={20} />
            </button>
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
      </div>
    </div>
  );
};

export default ChatInterface;