import React, { useState } from 'react';
import { ChatSubTab, User, Post, ChatPreview } from '../types';
import { Heart, MessageSquare, Send, Plus, ChevronLeft } from 'lucide-react';
import ChatRoom from './ChatRoom';

const MOCK_PRIVATE_CHATS: ChatPreview[] = [
  { id: 'c1', name: '李四', avatar: 'https://picsum.photos/seed/u2/200/200', lastMessage: '好的，明天见！', timestamp: '14:20', unread: 2 },
  { id: 'c2', name: '辅导员', avatar: 'https://picsum.photos/seed/u4/200/200', lastMessage: '请大家记得填写昨天的问卷。', timestamp: '昨天', unread: 0 },
];

export default function ChatTab({ currentUser, posts, setPosts }: { currentUser: User, posts: Post[], setPosts: (posts: Post[]) => void }) {
  const [subTab, setSubTab] = useState<ChatSubTab>('posts');
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  // State for active chat room and active post
  const [activeChat, setActiveChat] = useState<{ id: string, name: string, isGroup: boolean } | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);

  const handlePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content: newPostContent,
      timestamp: '刚刚',
      likes: 0,
      comments: 0,
      hasLiked: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsPosting(false);
  };

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation(); // Prevent opening post detail
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiking = !p.hasLiked;
        return {
          ...p,
          hasLiked: isLiking,
          likes: p.likes + (isLiking ? 1 : -1)
        };
      }
      return p;
    }));
    
    // Also update activePost if it's currently open
    if (activePost && activePost.id === postId) {
      const isLiking = !activePost.hasLiked;
      setActivePost({
        ...activePost,
        hasLiked: isLiking,
        likes: activePost.likes + (isLiking ? 1 : -1)
      });
    }
  };

  if (activeChat) {
    return (
      <ChatRoom 
        currentUser={currentUser}
        chatId={activeChat.id}
        chatName={activeChat.name}
        isGroup={activeChat.isGroup}
        onBack={() => setActiveChat(null)}
      />
    );
  }

  if (activePost) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col z-20">
        <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200 shrink-0 shadow-sm">
          <button onClick={() => setActivePost(null)} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">动态详情</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center mb-4">
              <img src={activePost.author.avatar} alt={activePost.author.name} className="w-12 h-12 rounded-full object-cover mr-3 shadow-sm" referrerPolicy="no-referrer" />
              <div>
                <h3 className="font-medium text-gray-900">{activePost.author.name}</h3>
                <p className="text-xs text-gray-500">{activePost.timestamp}</p>
              </div>
            </div>
            <p className="text-gray-800 text-base mb-6 leading-relaxed whitespace-pre-wrap">{activePost.content}</p>
            <div className="flex items-center text-gray-500 space-x-6 border-t border-gray-100 pt-4">
              <button 
                onClick={(e) => toggleLike(e, activePost.id)}
                className={`flex items-center space-x-1 transition-colors cursor-pointer ${activePost.hasLiked ? 'text-red-500' : 'hover:text-red-500'}`}
              >
                <Heart size={20} fill={activePost.hasLiked ? "currentColor" : "none"} />
                <span className="text-sm">{activePost.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-black transition-colors cursor-pointer">
                <MessageSquare size={20} />
                <span className="text-sm">{activePost.comments}</span>
              </button>
            </div>
          </div>
          
          <h4 className="text-sm font-medium text-gray-700 mb-3 px-1">全部评论</h4>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center text-gray-500 text-sm">
            暂无评论，快来抢沙发吧~
          </div>
        </div>
        
        {/* Comment Input */}
        <div className="bg-white border-t border-gray-200 p-3 shrink-0">
          <div className="flex items-end space-x-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden flex items-end">
              <textarea
                className="w-full bg-transparent p-3 text-sm focus:outline-none resize-none max-h-32"
                rows={1}
                placeholder="写评论..."
              />
            </div>
            <button className="p-3 rounded-full shrink-0 transition-colors cursor-pointer bg-black text-white hover:bg-gray-800 shadow-sm">
              <Send size={20} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Sub Navigation */}
      <div className="bg-white flex border-b border-gray-200 shrink-0">
        <button
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 cursor-pointer transition-colors ${subTab === 'posts' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          onClick={() => setSubTab('posts')}
        >
          校园动态
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 cursor-pointer transition-colors ${subTab === 'group' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          onClick={() => setSubTab('group')}
        >
          群聊
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 cursor-pointer transition-colors ${subTab === 'private' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          onClick={() => setSubTab('private')}
        >
          私聊
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        {subTab === 'posts' && (
          <div className="p-4 space-y-4 pb-20">
            {/* Post Input Area */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              {isPosting ? (
                <div className="space-y-3">
                  <textarea
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    rows={3}
                    placeholder="分享校园新鲜事..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    autoFocus
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setIsPosting(false)}
                      className="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handlePost}
                      className="px-4 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800 font-medium flex items-center cursor-pointer shadow-sm"
                    >
                      <Send size={14} className="mr-1" /> 发布
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsPosting(true)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 text-left text-gray-500 text-sm flex items-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <Plus size={18} className="mr-2 text-gray-400" />
                  发一条校园动态...
                </button>
              )}
            </div>

            {/* Posts List */}
            {posts.map(post => (
              <div 
                key={post.id} 
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setActivePost(post)}
              >
                <div className="flex items-center mb-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{post.author.name}</h3>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-gray-800 text-sm mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                <div className="flex items-center text-gray-500 space-x-6 border-t border-gray-100 pt-3">
                  <button 
                    onClick={(e) => toggleLike(e, post.id)}
                    className={`flex items-center space-x-1 transition-colors cursor-pointer ${post.hasLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                  >
                    <Heart size={18} fill={post.hasLiked ? "currentColor" : "none"} />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-black transition-colors cursor-pointer">
                    <MessageSquare size={18} />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {subTab === 'group' && (
          <div className="p-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div 
                className="p-4 border-b border-gray-100 flex items-center hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setActiveChat({ id: 'g1', name: '2026级新生大群', isGroup: true })}
              >
                <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-center font-bold text-lg mr-4 shrink-0 shadow-sm">
                  大
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">2026级新生大群</h3>
                  <p className="text-sm text-gray-500 truncate">学长：欢迎各位学弟学妹！</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-2">10:42</div>
              </div>
              <div 
                className="p-4 flex items-center hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setActiveChat({ id: 'g2', name: '计算机学院交流群', isGroup: true })}
              >
                <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-center font-bold text-lg mr-4 shrink-0 shadow-sm">
                  计
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">计算机学院交流群</h3>
                  <p className="text-sm text-gray-500 truncate">王五：今晚有算法讲座吗？</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-2">昨天</div>
              </div>
            </div>
          </div>
        )}

        {subTab === 'private' && (
          <div className="p-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {MOCK_PRIVATE_CHATS.map((chat, idx) => (
                <div 
                  key={chat.id} 
                  className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer transition-colors ${idx !== MOCK_PRIVATE_CHATS.length - 1 ? 'border-b border-gray-100' : ''}`}
                  onClick={() => setActiveChat({ id: chat.id, name: chat.name, isGroup: false })}
                >
                  <div className="relative mr-4 shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
