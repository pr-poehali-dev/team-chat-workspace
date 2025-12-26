import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  isOwn?: boolean;
};

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
};

type File = {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  time: string;
};

type Task = {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
};

type Contact = {
  id: number;
  name: string;
  role: 'admin' | 'member';
  status: 'online' | 'offline';
  avatar: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'files' | 'tasks' | 'contacts' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [currentUser] = useState({ id: 1, name: 'Вы', role: 'admin' });

  const chats: Chat[] = [
    { id: 1, name: 'Команда разработки', lastMessage: 'Отлично, давайте встретимся завтра', time: '14:23', unread: 3, avatar: '👨‍💻' },
    { id: 2, name: 'Дизайн проект', lastMessage: 'Отправил макеты', time: '12:45', unread: 0, avatar: '🎨' },
    { id: 3, name: 'Маркетинг', lastMessage: 'Нужно обсудить стратегию', time: 'Вчера', unread: 1, avatar: '📊' },
  ];

  const messages: Message[] = [
    { id: 1, user: 'Анна Смирнова', avatar: '👩', content: 'Привет! Как продвигается работа над новым функционалом?', time: '14:15' },
    { id: 2, user: 'Вы', avatar: '👤', content: 'Всё идёт по плану, уже готово 80%', time: '14:18', isOwn: true },
    { id: 3, user: 'Дмитрий Петров', avatar: '👨', content: 'Отлично! Можем созвониться завтра?', time: '14:20' },
    { id: 4, user: 'Вы', avatar: '👤', content: 'Конечно, давайте в 10:00', time: '14:23', isOwn: true },
  ];

  const files: File[] = [
    { id: 1, name: 'design-specs.pdf', size: '2.4 MB', type: 'PDF', uploadedBy: 'Анна Смирнова', time: '2 часа назад' },
    { id: 2, name: 'presentation.pptx', size: '5.1 MB', type: 'PPTX', uploadedBy: 'Дмитрий Петров', time: '5 часов назад' },
    { id: 3, name: 'mockup.fig', size: '12.3 MB', type: 'Figma', uploadedBy: 'Анна Смирнова', time: '1 день назад' },
  ];

  const tasks: Task[] = [
    { id: 1, title: 'Добавить функцию экспорта данных', status: 'in-progress', assignedTo: 'Дмитрий Петров', priority: 'high', createdBy: 'admin' },
    { id: 2, title: 'Обновить документацию API', status: 'pending', assignedTo: 'Анна Смирнова', priority: 'medium', createdBy: 'admin' },
    { id: 3, title: 'Провести code review', status: 'completed', assignedTo: 'Сергей Иванов', priority: 'high', createdBy: 'member' },
  ];

  const contacts: Contact[] = [
    { id: 1, name: 'Вы (Администратор)', role: 'admin', status: 'online', avatar: '👤' },
    { id: 2, name: 'Анна Смирнова', role: 'member', status: 'online', avatar: '👩' },
    { id: 3, name: 'Дмитрий Петров', role: 'member', status: 'online', avatar: '👨' },
    { id: 4, name: 'Сергей Иванов', role: 'member', status: 'offline', avatar: '👨‍💼' },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50';
      case 'in-progress': return 'bg-blue-500/20 text-blue-600 border-blue-500/50';
      case 'completed': return 'bg-green-500/20 text-green-600 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-600 border-red-500/50';
      case 'medium': return 'bg-orange-500/20 text-orange-600 border-orange-500/50';
      case 'low': return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/30 dark:from-background dark:via-purple-950/20 dark:to-pink-950/20">
      {/* Sidebar */}
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

      {/* Chats List / Content Sidebar */}
      {activeTab === 'chats' && (
        <div className="w-80 bg-card/50 backdrop-blur-sm border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Беседы
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Все ваши групповые чаты</p>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] ${
                    selectedChat === chat.id
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-lg'
                      : 'bg-card hover:bg-accent/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{chat.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-gradient-to-r from-primary to-secondary border-0 animate-pulse">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chats' && (
          <>
            <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="text-3xl">👨‍💻</div>
                <div>
                  <h3 className="font-heading font-bold text-lg">Команда разработки</h3>
                  <p className="text-sm text-muted-foreground">Активны: Анна, Дмитрий, Сергей</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in ${message.isOwn ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="text-2xl">{message.avatar}</div>
                    <div className={`flex-1 max-w-lg ${message.isOwn ? 'items-end' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold">{message.user}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isOwn
                            ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-sm'
                            : 'bg-card border border-border rounded-bl-sm'
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto flex gap-3">
                <Button variant="outline" size="icon" className="rounded-xl shrink-0">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Введите сообщение..."
                  className="flex-1 rounded-xl bg-background border-border"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'files' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Файлы
              </h2>
              <p className="text-muted-foreground mb-8">Все загруженные файлы группы</p>
              
              <div className="grid gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Icon name="FileText" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • Загрузил {file.uploadedBy} • {file.time}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-primary/20">{file.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    Запросы
                  </h2>
                  <p className="text-muted-foreground">Управление задачами команды</p>
                </div>
                {currentUser.role === 'admin' && (
                  <Button className="bg-gradient-to-r from-primary to-secondary rounded-xl">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать запрос
                  </Button>
                )}
              </div>
              
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{task.title}</h4>
                          {task.createdBy === 'admin' && (
                            <Icon name="Crown" size={16} className="text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Назначено: {task.assignedTo}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === 'pending' ? 'Ожидает' : task.status === 'in-progress' ? 'В работе' : 'Завершено'}
                        </Badge>
                      </div>
                    </div>
                    {currentUser.role === 'admin' && (
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          Изменить
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg text-destructive">
                          Удалить
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Контакты
              </h2>
              <p className="text-muted-foreground mb-8">Участники команды</p>
              
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="text-4xl">{contact.avatar}</div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                            contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{contact.name}</h4>
                          {contact.role === 'admin' && (
                            <Icon name="Crown" size={16} className="text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {contact.role === 'admin' ? 'Администратор' : 'Участник'}
                        </p>
                      </div>
                      <Badge variant={contact.status === 'online' ? 'default' : 'secondary'} className="rounded-lg">
                        {contact.status === 'online' ? 'В сети' : 'Не в сети'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="Settings" size={40} className="text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold mb-4">Настройки</h2>
              <p className="text-muted-foreground">
                Управление уведомлениями, приватностью и параметрами команды
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;