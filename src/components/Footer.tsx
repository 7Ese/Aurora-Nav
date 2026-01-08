import { useState } from 'react';

interface FooterProps {
  onLogin: (password: string) => void;
  onToggleEdit: () => void;
  onSave: () => void;
  onReset: () => void;
  onAddCategory: () => void;
  onClearCache: () => void;
  onExportConfig: () => void;
  isAuthenticated: boolean;
  isEditing: boolean;
}

export const Footer = ({ 
  onLogin, 
  onToggleEdit, 
  onSave, 
  onReset, 
  onAddCategory, 
  onClearCache,
  onExportConfig,
  isAuthenticated,
  isEditing 
}: FooterProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(password);
    setPassword('');
    setShowLogin(false);
  };

  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16 relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Admin Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                {showLogin ? (
                  <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="管理员密码"
                      className="bg-transparent text-white text-sm px-2 py-1 border border-white/20 rounded outline-none focus:border-white/40"
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button
                      onClick={handleLogin}
                      className="text-white/80 hover:text-white text-sm px-2 py-1 bg-theme-primary/20 rounded transition-colors"
                    >
                      <i className="fas fa-sign-in-alt mr-1"></i>
                      登录
                    </button>
                    <button
                      onClick={() => setShowLogin(false)}
                      className="text-white/60 hover:text-white/80 text-sm px-2 py-1"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-sm px-3 py-2 bg-glass-bg/50 backdrop-blur-md border border-glass-border text-white hover:bg-glass-bg/70 rounded-lg transition-all duration-300 shadow-glass"
                    >
                      <i className="fas fa-cog mr-1"></i>
                      编辑导航
                    </button>
                    <button
                      onClick={onClearCache}
                      className="text-sm px-3 py-2 bg-glass-bg/50 backdrop-blur-md border border-glass-border text-white hover:bg-glass-bg/70 rounded-lg transition-all duration-300 shadow-glass"
                    >
                      <i className="fas fa-broom mr-1"></i>
                      清理缓存
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                {/* Main editing controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={onToggleEdit}
                    className={`text-sm px-3 py-2 rounded-lg transition-all duration-300 bg-glass-bg/50 backdrop-blur-md border border-glass-border text-white hover:bg-glass-bg/70 shadow-glass ${
                      isEditing 
                        ? 'ring-2 ring-green-400/50' 
                        : ''
                    }`}
                  >
                    <i className={`fas ${isEditing ? 'fa-eye' : 'fa-edit'} mr-1`}></i>
                    {isEditing ? '预览' : '编辑导航'}
                  </button>
                  
                  {isEditing && (
                    <>
                      <button
                        onClick={onSave}
                        className="text-sm px-3 py-2 bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors"
                      >
                        <i className="fas fa-save mr-1"></i>
                        保存
                      </button>
                      
                      <button
                        onClick={onAddCategory}
                        className="text-sm px-3 py-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded-lg transition-colors"
                      >
                        <i className="fas fa-plus mr-1"></i>
                        分类
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={onReset}
                    className="text-sm px-3 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    <i className="fas fa-undo mr-1"></i>
                    重置
                  </button>
                </div>

                {/* Additional action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onExportConfig}
                    className="text-sm px-3 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors"
                  >
                    <i className="fas fa-download mr-1"></i>
                    导出配置
                  </button>
                  <button
                    onClick={onClearCache}
                    className="text-sm px-3 py-2 bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 rounded-lg transition-colors"
                  >
                    <i className="fas fa-broom mr-1"></i>
                    清理缓存
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Site Info - Centered */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              © 2024 个人导航网站. 现代化设计，响应式布局
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};