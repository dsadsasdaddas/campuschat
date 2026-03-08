import { Search } from 'lucide-react';

export default function FriendsTab() {
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-20">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black sm:text-sm transition-shadow shadow-sm"
          placeholder="搜索学号、姓名或手机号"
        />
      </div>

      {/* Friend Requests */}
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">新的朋友</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 flex items-center">
            <img src="https://picsum.photos/seed/u8/200/200" alt="New Friend" className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900">钱九</h3>
              <p className="text-xs text-gray-500 truncate">请求添加你为好友: "同学你好，我是隔壁班的"</p>
            </div>
            <button className="ml-3 bg-black text-white px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors cursor-pointer shadow-sm">
              接受
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
