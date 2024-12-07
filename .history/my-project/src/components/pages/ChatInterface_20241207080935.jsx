import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Loader, X, Check, Download } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [excludedKeywords, setExcludedKeywords] = useState([]);
  const [isSelectingKeywords, setIsSelectingKeywords] = useState(false);
  const [isExcludingKeywords, setIsExcludingKeywords] = useState(false);
  const [curriculum, setCurriculum] = useState(null);
  const [recommendationStep, setRecommendationStep] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample keywords based on CS major
  const availableKeywords = [
    'Programming', 'Algorithms', 'Web Development', 'AI/ML',
    'Data Science', 'Cybersecurity', 'Networks', 'Database Systems',
    'Mobile Development', 'Cloud Computing', 'Software Engineering',
    'Computer Graphics', 'Operating Systems', 'Computer Architecture'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecommendationProcess = () => {
    setRecommendationStep('keywords');
    setIsSelectingKeywords(true);
    setKeywords(availableKeywords);
    addBotMessage("Let's find some course recommendations for you! Please select up to 7 keywords that interest you:");
  };

  const handleKeywordSelection = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(prev => prev.filter(k => k !== keyword));
    } else if (selectedKeywords.length < 7) {
      setSelectedKeywords(prev => [...prev, keyword]);
    }
  };

  const handleExclusionSelection = (keyword) => {
    if (excludedKeywords.includes(keyword)) {
      setExcludedKeywords(prev => prev.filter(k => k !== keyword));
    } else {
      setExcludedKeywords(prev => [...prev, keyword]);
    }
  };

  const addBotMessage = (text, type = 'text') => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'bot',
      type
    }]);
  };

  const handleFileUpload = async (file) => {
    if (file && file.type === 'application/pdf') {
      setCurriculum(file);
      addBotMessage('Great! I received your curriculum. Now I can provide better recommendations.');
      await generateRecommendations();
    } else {
      addBotMessage('Please upload a PDF file of your curriculum.');
    }
  };

  const continueToExclusions = () => {
    setIsSelectingKeywords(false);
    setIsExcludingKeywords(true);
    setRecommendationStep('exclusions');
    const remainingKeywords = availableKeywords.filter(k => !selectedKeywords.includes(k));
    setKeywords(remainingKeywords);
    addBotMessage("Great choices! Now, select any keywords that you're NOT interested in:");
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      // Simulate API call to OpenAI
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recommendations = [
        "CS401: Advanced Algorithms",
        "CS402: Machine Learning Fundamentals",
        "CS403: Web Development with React"
      ];

      addBotMessage("Based on your preferences, here are my recommendations:");
      addBotMessage(recommendations.join('\n'), 'recommendations');
    } catch (error) {
      addBotMessage("Sorry, I encountered an error generating recommendations.");
    } finally {
      setLoading(false);
      setRecommendationStep(null);
      setIsExcludingKeywords(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }]);
    setInputMessage('');

    if (inputMessage.toLowerCase().includes('recommend')) {
      startRecommendationProcess();
    } else {
      // Normal chat flow
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        addBotMessage(`I understand you're asking about "${inputMessage}". How can I help you further?`);
      } finally {
        setLoading(false);
      }
    }
  };

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
              {message.type === 'recommendations' ? (
                <pre className="whitespace-pre-wrap">{message.text}</pre>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}

        {(isSelectingKeywords || isExcludingKeywords) && (
          <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
            {keywords.map(keyword => (
              <button
                key={keyword}
                onClick={() => isSelectingKeywords 
                  ? handleKeywordSelection(keyword)
                  : handleExclusionSelection(keyword)
                }
                className={`px-3 py-1 rounded-full transition-colors ${
                  isSelectingKeywords
                    ? selectedKeywords.includes(keyword)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    : excludedKeywords.includes(keyword)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {keyword}
              </button>
            ))}
            <button
              onClick={isSelectingKeywords ? continueToExclusions : generateRecommendations}
              className="ml-auto mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isSelectingKeywords ? 'Continue' : 'Generate Recommendations'}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-lg">
              <Loader className="animate-spin h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e.target.files[0])}
        accept=".pdf"
        className="hidden"
      />

      <div className="flex gap-2">
        {recommendationStep === 'curriculum' && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <Upload size={20} />
          </button>
        )}
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