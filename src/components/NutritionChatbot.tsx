
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
  content: "Hello! I'm your AI Nutrition Assistant. I can help answer questions about nutrition, diet, and general wellness. What would you like to know today?",
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
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
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
      <h2 className="section-title">AI Nutrition Assistant</h2>
      <p className="section-subtitle">
        Chat with our AI assistant to get answers to your nutrition and wellness questions
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="feature-card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <User size={16} className={message.sender === 'user' ? 'text-primary-foreground' : ''} />
                      ) : (
                        <Bot size={16} />
                      )}
                      <span className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {message.sender === 'user' ? 'You' : 'Nutrition AI'} • {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-secondary">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} />
                      <span className="text-xs text-muted-foreground">
                        Nutrition AI • {formatTime(new Date())}
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

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about nutrition, diets, and wellness..."
              className="input-field flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`primary-button px-4 ${isLoading ? 'opacity-70' : ''}`}
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
