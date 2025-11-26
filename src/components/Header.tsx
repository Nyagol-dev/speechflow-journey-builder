
import { useState } from 'react';
import { Mic, User, Settings, Award, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/services/authService';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  session: any | null;
}

const Header = ({ activeSection, onSectionChange, session }: HeaderProps) => {
  const [streakDays] = useState(7);

  const handleLogout = () => {
    authService.logout();
    window.location.reload(); // Simple way to reset state
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">SpeechFlow</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Button 
            variant="ghost" 
            className={activeSection === 'dashboard' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}
            onClick={() => onSectionChange('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={activeSection === 'lessons' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}
            onClick={() => onSectionChange('lessons')}
          >
            Lessons
          </Button>
          <Button 
            variant="ghost" 
            className={activeSection === 'progress' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}
            onClick={() => onSectionChange('progress')}
          >
            Progress
          </Button>
          <Button 
            variant="ghost" 
            className={activeSection === 'profile' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}
            onClick={() => onSectionChange('profile')}
          >
            Profile
          </Button>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* Streak Counter */}
          <div className="hidden sm:flex items-center space-x-2">
            <Award className="h-5 w-5 text-success" />
            <Badge variant="secondary" className="bg-success-50 text-success-700 border-success-200">
              {streakDays} day streak
            </Badge>
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
              {session ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{session.user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onSectionChange('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onSectionChange('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">Guest</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
