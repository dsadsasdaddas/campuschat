import { useState } from 'react';
import { User, Post } from './types';
import { Edit2, Check, X, Camera, ChevronLeft, Heart, MessageSquare } from 'lucide-react';

type ProfileView = 'main' | 'posts' | 'security' | 'settings';

export default function ProfileTab({ 
  currentUser, 
  onUpdateUser,
  posts,
  onLogout
}: { 
  currentUser: User, 
  onUpdateUser: (u: User) => void,
  posts: Post[],
  onLogout: () => void
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>(currentUser);
  const [currentView, setCurrentView] = useState<ProfileView>('main');
  const [securityCodeSent, setSecurityCodeSent] = useState(false);

  const myPosts = posts.filter(p => p.author.id === currentUser.id);

  const handleSave = () => {
    onUpdateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(currentUser);
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    // For demo, we'll cycle through some random avatars
    const randomId = Math.floor(Math.random() * 1000);
    setEditForm({
      ...editForm,
      avatar: `https://picsum.photos/seed/${randomId}/200/200`
    });
  };

  if (currentView === 'posts') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setCurrentView('main')} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">我的帖子</h2>
        </div>
        <div className="p-4 space-y-4">
          {myPosts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">暂无发布的帖子</div>
          ) : (
            myPosts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-800 text-sm mb-4 leading-relaxed">{post.content}</p>
                <div className="flex justify-between items-center text-gray-500 border-t border-gray-100 pt-3">
                  <span className="text-xs">{post.timestamp}</span>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1"><Heart size={14} fill={post.hasLiked ? "currentColor" : "none"} className={post.hasLiked ? "text-red-500" : ""} /><span className="text-xs">{post.likes}</span></div>
                    <div className="flex items-center space-x-1"><MessageSquare size={14} /><span className="text-xs">{post.comments}</span></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'security') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setCurrentView('main')} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">账号与安全</h2>
        </div>
        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-900 border-b border-gray-100 pb-2">修改密码</h3>
            <div className="space-y-3">
              <div className="text-xs text-gray-500">当前绑定邮箱: {currentUser.email}</div>
              <div className="flex space-x-2">
                <input type="text" placeholder="邮箱验证码" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                <button onClick={() => setSecurityCodeSent(true)} className="px-3 py-2 bg-gray-100 text-gray-900 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer">
                  {securityCodeSent ? '已发送' : '获取验证码'}
                </button>
              </div>
              <input type="password" placeholder="新密码" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              <button className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium mt-2 cursor-pointer hover:bg-gray-800 transition-colors shadow-sm" onClick={() => { alert('密码修改成功'); setCurrentView('main'); }}>
                确认修改
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'settings') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <div className="bg-white p-4 flex items-center border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setCurrentView('main')} className="mr-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-900">通用设置</h2>
        </div>
        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-700">禁止别人加我为好友</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={!currentUser.allowFriendRequests}
                  onChange={(e) => onUpdateUser({...currentUser, allowFriendRequests: !e.target.checked})}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Profile Header */}
      <div className="bg-white pt-8 pb-6 px-4 shadow-sm relative border-b border-gray-200">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Edit2 size={20} />
          </button>
        )}
        
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={isEditing ? editForm.avatar : currentUser.avatar} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              referrerPolicy="no-referrer"
            />
            {isEditing && (
              <div 
                className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                onClick={handleAvatarChange}
              >
                <Camera className="text-white mb-1" size={20} />
                <span className="text-white text-[10px] font-medium">更换头像</span>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="w-full max-w-xs space-y-4 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 text-center">昵称</label>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-gray-200 focus:border-black bg-transparent py-1 text-center text-lg font-bold text-gray-900 focus:outline-none transition-colors"
                  value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 text-center">学号</label>
                {currentUser.studentId ? (
                  <div className="text-center text-sm text-gray-500 py-1">{currentUser.studentId} (已绑定，不可修改)</div>
                ) : (
                  <input 
                    type="text" 
                    placeholder="请输入学号进行绑定"
                    className="w-full border-b-2 border-gray-200 focus:border-black bg-transparent py-1 text-center text-sm text-gray-900 focus:outline-none transition-colors"
                    value={editForm.studentId || ''}
                    onChange={e => setEditForm({...editForm, studentId: e.target.value})}
                  />
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 text-center">个人简介</label>
                <textarea 
                  className="w-full border-2 border-gray-200 focus:border-black rounded-lg bg-transparent p-2 text-sm text-gray-700 focus:outline-none transition-colors resize-none text-center"
                  rows={2}
                  value={editForm.bio}
                  onChange={e => setEditForm({...editForm, bio: e.target.value})}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <button 
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <X size={16} className="mr-1" /> 取消
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Check size={16} className="mr-1" /> 保存
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              {currentUser.studentId && (
                <p className="text-xs text-gray-600 mt-1 bg-gray-100 px-2 py-0.5 rounded-full">
                  学号: {currentUser.studentId}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">{currentUser.bio || '这个人很懒，什么都没写~'}</p>
            </>
          )}
        </div>
      </div>

      {/* Settings List */}
      <div className="mt-4 px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          <div 
            className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setCurrentView('posts')}
          >
            <span className="text-sm text-gray-700">我的帖子</span>
            <span className="text-xs text-gray-400">{myPosts.length}</span>
          </div>
          <div 
            className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setCurrentView('security')}
          >
            <span className="text-sm text-gray-700">账号与安全</span>
            <span className="text-gray-300">›</span>
          </div>
          <div 
            className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setCurrentView('settings')}
          >
            <span className="text-sm text-gray-700">通用设置</span>
            <span className="text-gray-300">›</span>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full mt-6 bg-white border border-red-100 text-red-500 py-3 rounded-2xl shadow-sm text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer"
        >
          退出登录
        </button>
      </div>
    </div>
  );
}
