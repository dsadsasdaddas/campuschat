import { useState } from 'react';
import { MessageCircle, UserPlus, User as UserIcon } from 'lucide-react';
import ChatTab from './components/ChatTab';
import FriendsTab from './components/FriendsTab';
import ProfileTab from './ProfileTab';
import Auth from './components/Auth';
import { TabType, User, Post } from './types';

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: { id: 'u2', name: '李四', avatar: 'https://picsum.photos/seed/u2/200/200', bio: '', email: 'lisi@example.com', allowFriendRequests: true },
    content: '今天食堂的糖醋排骨太好吃了！强烈推荐！🍖',
    timestamp: '10分钟前',
    likes: 12,
    comments: 3,
  },
  {
    id: 'p2',
    author: { id: 'u3', name: '王五', avatar: 'https://picsum.photos/seed/u3/200/200', bio: '', email: 'wangwu@example.com', allowFriendRequests: true },
    content: '有没有组队去图书馆自习的？目前缺2人。',
    timestamp: '半小时前',
    likes: 5,
    comments: 8,
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  if (!isLoggedIn || !currentUser) {
    return <Auth onLogin={(user) => { setCurrentUser(user); setIsLoggedIn(true); }} />;
  }

  return (
    <div className="flex justify-center min-h-screen font-sans bg-gray-100">
      <div className="w-full max-w-md bg-white h-screen flex flex-col shadow-xl relative overflow-hidden">
        {/* Header */}
        <header className="bg-white text-gray-900 p-4 z-10 shrink-0 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-center tracking-tight">校园微聊</h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative bg-gray-50">
          {activeTab === 'chat' && <ChatTab currentUser={currentUser} posts={posts} setPosts={setPosts} />}
          {activeTab === 'friends' && <FriendsTab />}
          {activeTab === 'profile' && (
            <ProfileTab 
              currentUser={currentUser} 
              onUpdateUser={setCurrentUser} 
              posts={posts}
              onLogout={() => { setIsLoggedIn(false); setCurrentUser(null); setActiveTab('chat'); }}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 flex justify-around items-center h-16 shrink-0 z-10 absolute bottom-0 w-full">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer transition-colors ${
              activeTab === 'chat' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-[10px] font-medium">聊天/动态</span>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer transition-colors ${
              activeTab === 'friends' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <UserPlus size={24} />
            <span className="text-[10px] font-medium">加好友</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer transition-colors ${
              activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <UserIcon size={24} />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
