import { useState } from 'react';
import Sidebar from '@/components/messenger/Sidebar';
import ChatSection from '@/components/messenger/ChatSection';
import ContentTabs from '@/components/messenger/ContentTabs';
import { Chat, Message, File, Task, Contact, TableData, TabType } from '@/components/messenger/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [currentUser] = useState({ id: 1, name: 'Вы', role: 'admin' as const });
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableColumns, setNewTableColumns] = useState(['']);
  const [tables, setTables] = useState<TableData[]>([
    {
      id: 1,
      name: 'План спринта',
      columns: ['Задача', 'Ответственный', 'Статус', 'Дедлайн'],
      rows: [
        ['Разработка API', 'Дмитрий Петров', 'В работе', '28.12.2024'],
        ['Дизайн макетов', 'Анна Смирнова', 'Завершено', '25.12.2024'],
        ['Тестирование', 'Сергей Иванов', 'Ожидает', '30.12.2024'],
      ],
      createdBy: 'admin',
      createdAt: '24.12.2024'
    }
  ]);

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

  const handleCreateTable = () => {
    if (newTableName.trim() && newTableColumns.filter(c => c.trim()).length > 0) {
      const newTable: TableData = {
        id: tables.length + 1,
        name: newTableName,
        columns: newTableColumns.filter(c => c.trim()),
        rows: [],
        createdBy: currentUser.role,
        createdAt: new Date().toLocaleDateString('ru-RU')
      };
      setTables([...tables, newTable]);
      setNewTableName('');
      setNewTableColumns(['']);
      setIsCreateTableOpen(false);
    }
  };

  const addColumn = () => {
    setNewTableColumns([...newTableColumns, '']);
  };

  const updateColumn = (index: number, value: string) => {
    const updated = [...newTableColumns];
    updated[index] = value;
    setNewTableColumns(updated);
  };

  const removeColumn = (index: number) => {
    if (newTableColumns.length > 1) {
      setNewTableColumns(newTableColumns.filter((_, i) => i !== index));
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'chats' ? (
        <ChatSection
          chats={chats}
          messages={messages}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <ContentTabs
          activeTab={activeTab}
          files={files}
          tasks={tasks}
          contacts={contacts}
          tables={tables}
          currentUser={currentUser}
          isCreateTableOpen={isCreateTableOpen}
          setIsCreateTableOpen={setIsCreateTableOpen}
          newTableName={newTableName}
          setNewTableName={setNewTableName}
          newTableColumns={newTableColumns}
          setNewTableColumns={setNewTableColumns}
          handleCreateTable={handleCreateTable}
          addColumn={addColumn}
          updateColumn={updateColumn}
          removeColumn={removeColumn}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      )}
    </div>
  );
};

export default Index;
