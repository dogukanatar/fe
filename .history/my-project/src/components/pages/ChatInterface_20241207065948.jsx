const ChatInterface = () => {
  const { chats, setChats, currentChatId } = useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const message = {
          id: messages.length + 1,
          file: {
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result
          },
          sender: 'user',
          type: 'file',
          timestamp: new Date().toISOString()
        };
        setChats(prevChats => prevChats.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        ));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col h-full">
        <div 
          className={`flex-1 overflow-y-auto p-4 space-y-4 ${dragActive ? 'bg-blue-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          ref={dropZoneRef}
        >
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
                {message.type === 'file' ? (
                  <div className="flex items-center gap-2">
                    <File size={20} />
                    <span>{message.file.name}</span>
                    <a 
                      href={message.file.data}
                      download={message.file.name}
                      className="p-1 hover:text-blue-200"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                ) : (
                  message.text
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

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              multiple
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="p-2 text-gray-500 hover:text-blue-500"
            >
              <Upload size={20} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !inputMessage.trim()}
              className={`p-2 rounded-lg ${
                loading || !inputMessage.trim()
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};