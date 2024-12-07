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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isUser
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-white border'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form 
        onSubmit={handleSend}
        className="border-t bg-white p-4"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};