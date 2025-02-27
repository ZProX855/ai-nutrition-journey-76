
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getChatbotResponse } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const welcomeMessage: Message = {
  id: 'welcome',
  content: "👋 Hello! I'm Dr. Nutri, your AI Nutrition Assistant. I'm here to help answer your questions about nutrition, diet, and wellness!\n\n• Need diet advice?\n• Curious about specific foods?\n• Want exercise recommendations?\n\nJust ask me anything! How can I help you today? 😊",
  sender: 'bot',
  timestamp: new Date(),
};

const NutritionChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      toast({
        title: "Couldn't get a response",
        description: "Our nutrition assistant is having trouble right now. Please try again later.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "😓 I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="ai-assistant" className="section-container">
      <h2 className="section-title">Chat with Dr. Nutri</h2>
      <p className="section-subtitle">
        Your friendly AI nutrition doctor is here to answer all your wellness questions
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="feature-card rounded-3xl border-2 border-wellness-200" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          <div className="bg-wellness-100/30 rounded-t-3xl py-3 px-4 border-b border-wellness-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Dr. Nutri</h3>
                <p className="text-xs text-muted-foreground">AI Nutrition Doctor</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '400px' }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-3xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-wellness-100/50 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <User size={16} className={message.sender === 'user' ? 'text-primary-foreground' : ''} />
                      ) : (
                        <Bot size={16} />
                      )}
                      <span className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {message.sender === 'user' ? 'You' : 'Dr. Nutri'} • {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-3xl rounded-tl-none px-4 py-3 bg-wellness-100/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} />
                      <span className="text-xs text-muted-foreground">
                        Dr. Nutri • {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      <p>Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dr. Nutri about nutrition, diets, and wellness..."
              className="input-field flex-1 rounded-full"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`primary-button rounded-full p-3 ${isLoading ? 'opacity-70' : ''}`}
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NutritionChatbot;
