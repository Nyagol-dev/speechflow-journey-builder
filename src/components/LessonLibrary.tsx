
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Play, 
  Star, 
  Clock, 
  Users,
  BookOpen,
  Mic,
  Target
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  rating: number;
  completedBy: number;
  objectives: string[];
  isCompleted: boolean;
  isLocked: boolean;
}

const LessonLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const [lessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Vowel Pronunciation Basics',
      description: 'Master the fundamental vowel sounds in English speech therapy',
      category: 'Pronunciation',
      difficulty: 'Beginner',
      duration: 15,
      rating: 4.8,
      completedBy: 1250,
      objectives: ['Learn 5 basic vowel sounds', 'Practice minimal pairs', 'Record pronunciation'],
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '2',
      title: 'Consonant Clusters',
      description: 'Improve clarity with complex consonant combinations',
      category: 'Pronunciation',
      difficulty: 'Intermediate',
      duration: 20,
      rating: 4.6,
      completedBy: 890,
      objectives: ['Master /str/, /spl/ sounds', 'Practice tongue placement', 'Build muscle memory'],
      isCompleted: false,
      isLocked: false,
    },
    {
      id: '3',
      title: 'Breathing Techniques',
      description: 'Control airflow for better speech projection and endurance',
      category: 'Fluency',
      difficulty: 'Beginner',
      duration: 12,
      rating: 4.9,
      completedBy: 1450,
      objectives: ['Diaphragmatic breathing', 'Breath support exercises', 'Pacing techniques'],
      isCompleted: true,
      isLocked: false,
    },
    {
      id: '4',
      title: 'Advanced Rhythm Patterns',
      description: 'Master complex speech rhythms and intonation patterns',
      category: 'Rhythm',
      difficulty: 'Advanced',
      duration: 25,
      rating: 4.7,
      completedBy: 456,
      objectives: ['Stress patterns', 'Intonation curves', 'Natural flow'],
      isCompleted: false,
      isLocked: true,
    },
    {
      id: '5',
      title: 'Public Speaking Confidence',
      description: 'Build confidence for presentations and public speaking',
      category: 'Confidence',
      difficulty: 'Intermediate',
      duration: 30,
      rating: 4.5,
      completedBy: 678,
      objectives: ['Reduce anxiety', 'Voice projection', 'Body language'],
      isCompleted: false,
      isLocked: false,
    },
  ]);

  const categories = ['All', 'Pronunciation', 'Fluency', 'Rhythm', 'Confidence'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success-100 text-success-700 border-success-200';
      case 'Intermediate': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pronunciation': return <Target className="h-4 w-4" />;
      case 'Fluency': return <Mic className="h-4 w-4" />;
      case 'Rhythm': return <BookOpen className="h-4 w-4" />;
      case 'Confidence': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-32">
              <Filter className="h-4 w-4 mr-2" />
              {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map(category => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-32">
              <Filter className="h-4 w-4 mr-2" />
              {selectedDifficulty}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {difficulties.map(difficulty => (
              <DropdownMenuItem
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <Card 
            key={lesson.id} 
            className={`transition-all duration-200 hover:shadow-lg ${
              lesson.isLocked ? 'opacity-60' : ''
            } ${lesson.isCompleted ? 'ring-1 ring-success' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(lesson.category)}
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                </div>
                {lesson.isCompleted && (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{lesson.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getDifficultyColor(lesson.difficulty)}>
                  {lesson.difficulty}
                </Badge>
                <Badge variant="secondary">{lesson.category}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-warning-500" />
                  {lesson.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {lesson.completedBy}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Objectives:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full" 
                variant={lesson.isCompleted ? "outline" : "default"}
                disabled={lesson.isLocked}
              >
                <Play className="h-4 w-4 mr-2" />
                {lesson.isLocked ? 'Locked' : lesson.isCompleted ? 'Review Lesson' : 'Start Lesson'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default LessonLibrary;
