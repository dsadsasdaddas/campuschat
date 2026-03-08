import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { User, Message } from '../types';

export default function ChatRoom({ 
  currentUser, 
  chatId, 
  chatName, 
  isGroup, 
  onBack 
}: { 
  currentUser: User; 
  chatId: string; 
  chatName: string; 
  isGroup: boolean; 
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      senderId: isGroup ? 'u4' : chatId,
      senderName: isGroup ? '学长' : chatName,
      senderAvatar: `https://picsum.photos/seed/${isGroup ? 'u4' : chatId}/200/200`,
      content: isGroup ? '欢迎各位学弟学妹！' : '好的，明天见！',
      timestamp: '10:42'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate auto-reply for demo purposes
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: isGroup ? 'u5' : chatId,
        senderName: isGroup ? '同学A' : chatName,
        senderAvatar: `https://picsum.photos/seed/${isGroup ? 'u5' : chatId}/200/200`,
        content: isGroup ? '收到！谢谢学长！' : '没问题，到时候联系。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col z-20">
      {showInfo && (
        <div className="absolute inset-0 bg-white z-30 flex flex-col">
          <div className="px-4 py-3 flex items-center border-b border-gray-200 bg-white">
            <button onClick={() => setShowInfo(false)} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-medium text-gray-900">{isGroup ? '群聊信息' : '个人信息'}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {isGroup ? (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 text-gray-800 rounded-2xl flex items-center justify-center font-bold text-2xl mb-3 shadow-sm">
                    {chatName.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{chatName}</h3>
                  <p className="text-sm text-gray-500 mt-1">群成员: 128人</p>
                </div>
                <button 
                  onClick={() => { alert('已退出群聊'); onBack(); }}
                  className="w-full bg-white border border-red-100 text-red-500 py-3 rounded-2xl shadow-sm text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
                >
                  退出群聊
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <img src={`https://picsum.photos/seed/${chatId}/200/200`} alt={chatName} className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm" referrerPolicy="no-referrer" />
                  <h3 className="text-lg font-bold text-gray-900">{chatName}</h3>
                  <p className="text-xs text-gray-600 mt-2 bg-gray-100 px-2 py-0.5 rounded-full">学号: 2023{Math.floor(Math.random() * 10000)}</p>
                  <p className="text-sm text-gray-500 mt-3 text-center">这个人很懒，什么都没写~</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shrink-0 shadow-sm z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">{chatName}</h2>
          {isGroup && <span className="ml-2 text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">群聊</span>}
        </div>
        <button 
          onClick={() => setShowInfo(true)}
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-full shadow-sm">昨天 10:40</span>
        </div>
        
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[75%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <img 
                  src={msg.senderAvatar} 
                  alt={msg.senderName} 
                  className={`w-8 h-8 rounded-full object-cover shrink-0 shadow-sm ${isMe ? 'ml-2' : 'mr-2'}`}
                  referrerPolicy="no-referrer"
                />
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  {isGroup && !isMe && (
                    <span className="text-xs text-gray-500 mb-1 ml-1">{msg.senderName}</span>
                  )}
                  <div 
                    className={`px-4 py-2 rounded-2xl text-sm shadow-sm border ${
                      isMe 
                        ? 'bg-black text-white border-gray-800 rounded-tr-sm' 
                        : 'bg-white text-gray-800 border-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 mx-1">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3 shrink-0">
        <div className="flex items-end space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer shrink-0">
            <ImageIcon size={24} />
          </button>
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden flex items-end shadow-sm">
            <textarea
              className="w-full bg-transparent p-3 text-sm focus:outline-none resize-none max-h-32"
              rows={1}
              placeholder="发送消息..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-3 rounded-full shrink-0 transition-colors cursor-pointer shadow-sm ${
              inputText.trim() 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} className={inputText.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
