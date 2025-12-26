import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { TabType } from './types';

type SidebarProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 space-y-6">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg">
        T
      </div>
      
      <Separator className="w-8" />
      
      <nav className="flex-1 flex flex-col space-y-4">
        <button
          onClick={() => setActiveTab('chats')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeTab === 'chats'
              ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="MessageSquare" size={24} />
        </button>
        
        <button
          onClick={() => setActiveTab('files')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeTab === 'files'
              ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="FileText" size={24} />
        </button>
        
        <button
          onClick={() => setActiveTab('tasks')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative ${
            activeTab === 'tasks'
              ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="AlertCircle" size={24} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            2
          </span>
        </button>
        
        <button
          onClick={() => setActiveTab('contacts')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeTab === 'contacts'
              ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="Users" size={24} />
        </button>
        
        <button
          onClick={() => setActiveTab('tables')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            activeTab === 'tables'
              ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
              : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="Table" size={24} />
        </button>
      </nav>
      
      <button
        onClick={() => setActiveTab('settings')}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          activeTab === 'settings'
            ? 'bg-sidebar-accent text-sidebar-primary shadow-lg scale-110'
            : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
        }`}
      >
        <Icon name="Settings" size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
