import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Chat, Message } from './types';

type ChatSectionProps = {
  chats: Chat[];
  messages: Message[];
  selectedChat: number;
  setSelectedChat: (id: number) => void;
  messageInput: string;
  setMessageInput: (value: string) => void;
  handleSendMessage: () => void;
};

const ChatSection = ({
  chats,
  messages,
  selectedChat,
  setSelectedChat,
  messageInput,
  setMessageInput,
  handleSendMessage
}: ChatSectionProps) => {
  return (
    <>
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

      <div className="flex-1 flex flex-col">
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
      </div>
    </>
  );
};

export default ChatSection;
