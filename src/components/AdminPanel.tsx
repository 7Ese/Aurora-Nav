import { useState } from 'react';
import { Settings, Lock, Unlock, Save, RotateCcw, Plus } from 'lucide-react';
import { NavigationConfig } from '../data/navigationConfig';

interface AdminPanelProps {
  isAuthenticated: boolean;
  isEditing: boolean;
  onLogin: (password: string) => void;
  onToggleEdit: () => void;
  onSave: () => void;
  onReset: () => void;
  onAddCategory: () => void;
  onClearCache: () => void;
}

export const AdminPanel = ({
  isAuthenticated,
  isEditing,
  onLogin,
  onToggleEdit,
  onSave,
  onReset,
  onAddCategory,
  onClearCache
}: AdminPanelProps) => {
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
    setPassword('');
    setShowLogin(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="glass-card p-4">
        {!isAuthenticated ? (
          <div>
            {!showLogin ? (
              <button
                onClick={() => setShowLogin(true)}
                className="btn-icon"
                title="管理员登录"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-2 min-w-48">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入管理员密码"
                  className="glass-input px-3 py-2 text-sm"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary text-sm px-3 py-1 flex-1">
                    登录
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowLogin(false)}
                    className="btn-ghost text-sm px-3 py-1"
                  >
                    取消
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={onToggleEdit}
                className={`btn-icon ${isEditing ? 'bg-red-500/20' : 'bg-green-500/20'}`}
                title={isEditing ? '退出编辑' : '进入编辑模式'}
              >
                {isEditing ? <Unlock className="w-5 h-5 text-red-300" /> : <Lock className="w-5 h-5 text-green-300" />}
              </button>
              
              {isEditing && (
                <>
                  <button
                    onClick={onAddCategory}
                    className="btn-icon bg-blue-500/20"
                    title="添加分类"
                  >
                    <Plus className="w-5 h-5 text-blue-300" />
                  </button>
                  <button
                    onClick={onSave}
                    className="btn-icon bg-green-500/20"
                    title="保存更改"
                  >
                    <Save className="w-5 h-5 text-green-300" />
                  </button>
                </>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={onReset}
                className="btn-icon bg-yellow-500/20"
                title="重置配置"
              >
                <RotateCcw className="w-5 h-5 text-yellow-300" />
              </button>
              <button
                onClick={onClearCache}
                className="btn-ghost text-xs px-2 py-1"
                title="清理缓存"
              >
                清理缓存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};