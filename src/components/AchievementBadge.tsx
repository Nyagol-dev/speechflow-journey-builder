
import { Badge } from '@/components/ui/badge';
import { Award, Star, Clock, User } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: 'award' | 'star' | 'clock' | 'user';
  isUnlocked: boolean;
  progress?: number;
}

const AchievementBadge = ({ 
  title, 
  description, 
  icon, 
  isUnlocked, 
  progress 
}: AchievementBadgeProps) => {
  const iconComponents = {
    award: Award,
    star: Star,
    clock: Clock,
    user: User
  };

  const IconComponent = iconComponents[icon];

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
      isUnlocked 
        ? 'bg-success-50 border-success-200 shadow-sm' 
        : 'bg-gray-50 border-gray-200 opacity-60'
    }`}>
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isUnlocked 
            ? 'bg-success text-white' 
            : 'bg-gray-300 text-gray-500'
        }`}>
          <IconComponent className="h-6 w-6" />
        </div>
        
        <div>
          <h4 className={`font-semibold text-sm ${
            isUnlocked ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {title}
          </h4>
          <p className={`text-xs mt-1 ${
            isUnlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {description}
          </p>
        </div>

        {!isUnlocked && progress !== undefined && (
          <Badge variant="secondary" className="text-xs">
            {progress}% complete
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;
