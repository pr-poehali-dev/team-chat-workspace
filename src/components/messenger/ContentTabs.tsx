import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { File, Task, Contact, TableData, TabType, CurrentUser } from './types';

type ContentTabsProps = {
  activeTab: TabType;
  files: File[];
  tasks: Task[];
  contacts: Contact[];
  tables: TableData[];
  currentUser: CurrentUser;
  isCreateTableOpen: boolean;
  setIsCreateTableOpen: (value: boolean) => void;
  newTableName: string;
  setNewTableName: (value: string) => void;
  newTableColumns: string[];
  setNewTableColumns: (value: string[]) => void;
  handleCreateTable: () => void;
  addColumn: () => void;
  updateColumn: (index: number, value: string) => void;
  removeColumn: (index: number) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
};

const ContentTabs = ({
  activeTab,
  files,
  tasks,
  contacts,
  tables,
  currentUser,
  isCreateTableOpen,
  setIsCreateTableOpen,
  newTableName,
  setNewTableName,
  newTableColumns,
  setNewTableColumns,
  handleCreateTable,
  addColumn,
  updateColumn,
  removeColumn,
  getStatusColor,
  getPriorityColor
}: ContentTabsProps) => {
  return (
    <div className="flex-1 flex flex-col">
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

      {activeTab === 'tables' && (
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Таблицы
                </h2>
                <p className="text-muted-foreground">Создавайте и управляйте таблицами для командной работы</p>
              </div>
              <Dialog open={isCreateTableOpen} onOpenChange={setIsCreateTableOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary rounded-xl">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать таблицу
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-heading">Создать новую таблицу</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Название таблицы</label>
                      <Input
                        value={newTableName}
                        onChange={(e) => setNewTableName(e.target.value)}
                        placeholder="Например: План задач"
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold">Колонки</label>
                        <Button
                          onClick={addColumn}
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                        >
                          <Icon name="Plus" size={16} className="mr-1" />
                          Добавить колонку
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {newTableColumns.map((col, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={col}
                              onChange={(e) => updateColumn(index, e.target.value)}
                              placeholder={`Колонка ${index + 1}`}
                              className="rounded-xl flex-1"
                            />
                            {newTableColumns.length > 1 && (
                              <Button
                                onClick={() => removeColumn(index)}
                                variant="outline"
                                size="icon"
                                className="rounded-xl"
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={handleCreateTable}
                      className="w-full bg-gradient-to-r from-primary to-secondary rounded-xl"
                    >
                      Создать таблицу
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-6">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                >
                  <div className="p-6 border-b border-border bg-card/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Icon name="Table" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg">{table.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Создано {table.createdAt}
                            {table.createdBy === 'admin' && (
                              <Icon name="Crown" size={14} className="inline ml-2 text-yellow-500" />
                            )}
                          </p>
                        </div>
                      </div>
                      {currentUser.role === 'admin' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <Icon name="Edit" size={16} className="mr-1" />
                            Редактировать
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg text-destructive">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {table.columns.map((col, index) => (
                            <TableHead key={index} className="font-semibold">
                              {col}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {table.rows.length > 0 ? (
                          table.rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={table.columns.length}
                              className="text-center text-muted-foreground py-8"
                            >
                              Нет данных. Добавьте первую строку
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {currentUser.role === 'admin' && (
                    <div className="p-4 border-t border-border bg-muted/20">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Icon name="Plus" size={16} className="mr-1" />
                        Добавить строку
                      </Button>
                    </div>
                  )}
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
  );
};

export default ContentTabs;
