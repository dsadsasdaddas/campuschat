import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Lock, KeyRound, ArrowRight } from 'lucide-react';

export default function Auth({ onLogin }: { onLogin: (user: User) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !code)) return;
    
    // Mock login/register
    onLogin({
      id: 'u1',
      name: email.split('@')[0] || '新用户',
      avatar: 'https://picsum.photos/seed/user1/200/200',
      bio: '这个人很懒，什么都没写~',
      email: email,
      allowFriendRequests: true
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6 font-sans">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">校园微聊</h1>
          <p className="text-sm text-gray-500">{isLogin ? '欢迎回来，请登录' : '注册新账号，加入校园'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                placeholder="邮箱地址"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-shadow"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="验证码"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-shadow"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </div>
              <button 
                type="button"
                onClick={() => setCodeSent(true)}
                className="px-4 py-3 bg-gray-100 text-gray-900 rounded-2xl text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                {codeSent ? '已发送' : '获取验证码'}
              </button>
            </div>
          )}

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                placeholder={isLogin ? "密码" : "设置密码"}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-shadow"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-3 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center mt-6 cursor-pointer shadow-md"
          >
            {isLogin ? '登录' : '注册'}
            <ArrowRight size={16} className="ml-2" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600 hover:text-black font-medium cursor-pointer transition-colors"
          >
            {isLogin ? '没有账号？点击注册' : '已有账号？直接登录'}
          </button>
        </div>
      </div>
    </div>
  );
}
