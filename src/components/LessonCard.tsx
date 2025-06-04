
import { Play, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface LessonCardProps {
  title: string;
  description: string;
  duration: string;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isCurrentLesson?: boolean;
}

const LessonCard = ({ 
  title, 
  description, 
  duration, 
  progress, 
  difficulty, 
  isCurrentLesson = false 
}: LessonCardProps) => {
  const difficultyColor = {
    Beginner: 'bg-success-100 text-success-700 border-success-200',
    Intermediate: 'bg-warning-100 text-warning-700 border-warning-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isCurrentLesson ? 'ring-2 ring-primary border-primary' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {duration}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyColor[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
          
          {isCurrentLesson && (
            <Award className="h-6 w-6 text-primary flex-shrink-0" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Button 
          className="w-full" 
          variant={isCurrentLesson ? "default" : "outline"}
        >
          <Play className="h-4 w-4 mr-2" />
          {isCurrentLesson ? 'Continue Learning' : 'Start Lesson'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
