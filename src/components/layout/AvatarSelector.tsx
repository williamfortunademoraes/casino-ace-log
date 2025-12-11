import { useState } from 'react';
import { Camera, Upload, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const avatarCollection = [
  { id: 1, emoji: '🎰', bg: 'from-primary to-primary/60' },
  { id: 2, emoji: '🎲', bg: 'from-blue-500 to-blue-600' },
  { id: 3, emoji: '🃏', bg: 'from-purple-500 to-purple-600' },
  { id: 4, emoji: '💎', bg: 'from-cyan-500 to-cyan-600' },
  { id: 5, emoji: '🎯', bg: 'from-red-500 to-red-600' },
  { id: 6, emoji: '🏆', bg: 'from-yellow-500 to-yellow-600' },
  { id: 7, emoji: '👑', bg: 'from-amber-500 to-amber-600' },
  { id: 8, emoji: '⚡', bg: 'from-orange-500 to-orange-600' },
  { id: 9, emoji: '🔥', bg: 'from-rose-500 to-rose-600' },
  { id: 10, emoji: '💰', bg: 'from-emerald-500 to-emerald-600' },
  { id: 11, emoji: '🌟', bg: 'from-indigo-500 to-indigo-600' },
  { id: 12, emoji: '🎪', bg: 'from-pink-500 to-pink-600' },
];

interface AvatarSelectorProps {
  currentAvatar?: string | null;
  userInitials: string;
  onSelect: (avatarUrl: string | null) => void;
  onUpload: (file: File) => void;
}

const AvatarSelector = ({ currentAvatar, userInitials, onSelect, onUpload }: AvatarSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      setOpen(false);
    }
  };

  const handleEmojiSelect = (avatar: typeof avatarCollection[0]) => {
    setSelectedEmoji(avatar.id);
    // Store emoji avatar as a special string
    onSelect(`emoji:${avatar.id}:${avatar.emoji}:${avatar.bg}`);
    setOpen(false);
  };

  const handleRemoveAvatar = () => {
    setSelectedEmoji(null);
    onSelect(null);
    setOpen(false);
  };

  const renderCurrentAvatar = () => {
    if (currentAvatar?.startsWith('emoji:')) {
      const parts = currentAvatar.split(':');
      const emoji = parts[2];
      const bg = parts[3];
      return (
        <Avatar className="h-20 w-20 cursor-pointer ring-2 ring-border ring-offset-2 ring-offset-background hover:ring-primary transition-all">
          <div className={cn('w-full h-full flex items-center justify-center bg-gradient-to-br text-3xl', bg)}>
            {emoji}
          </div>
        </Avatar>
      );
    }

    return (
      <Avatar className="h-20 w-20 cursor-pointer ring-2 ring-border ring-offset-2 ring-offset-background hover:ring-primary transition-all">
        <AvatarImage src={currentAvatar || undefined} />
        <AvatarFallback className="bg-primary/20 text-primary text-2xl font-semibold">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="relative group">
          {renderCurrentAvatar()}
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle>Escolha seu Avatar</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="collection">Coleção</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection" className="mt-4">
            <div className="grid grid-cols-4 gap-3">
              {avatarCollection.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => handleEmojiSelect(avatar)}
                  className={cn(
                    'aspect-square rounded-xl flex items-center justify-center text-2xl transition-all bg-gradient-to-br hover:scale-105 hover:ring-2 hover:ring-primary',
                    avatar.bg,
                    selectedEmoji === avatar.id && 'ring-2 ring-primary'
                  )}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleRemoveAvatar}
                className="w-full text-muted-foreground"
              >
                <User className="w-4 h-4 mr-2" />
                Usar iniciais
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4">
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all">
              <Upload className="w-10 h-10 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Clique para enviar uma imagem</span>
              <span className="text-xs text-muted-foreground/70 mt-1">PNG, JPG até 2MB</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSelector;
