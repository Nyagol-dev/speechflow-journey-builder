
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ProgressRing from './ProgressRing';
import LessonCard from './LessonCard';
import AchievementBadge from './AchievementBadge';
import AudioRecorder from './AudioRecorder';
import { Play, Award, Clock, User as UserIcon } from 'lucide-react';
import { User } from '@supabase/supabase-js';

const Dashboard = ({ user }: { user: User }) => {
  const [dailyProgress] = useState(75);
  const [userStats] = useState({
    xp: 2450,
    level: 8,
    lessonsCompleted: 24,
    speakingTime: 180, // minutes
    improvementScore: 89
  });

  const currentLesson = {
    title: "Consonant Clarity",
    description: "Practice clear pronunciation of consonant sounds with targeted exercises",
    duration: "15 min",
    progress: 60,
    difficulty: "Intermediate" as const
  };

  const recentLessons = [
    {
      title: "Vowel Sounds",
      description: "Master the five basic vowel sounds with guided practice",
      duration: "12 min",
      progress: 100,
      difficulty: "Beginner" as const
    },
    {
      title: "Breath Control",
      description: "Learn proper breathing techniques for speech therapy",
      duration: "18 min",
      progress: 100,
      difficulty: "Beginner" as const
    }
  ];

  const achievements = [
    {
      title: "First Lesson",
      description: "Complete your first lesson",
      icon: "award" as const,
      isUnlocked: true
    },
    {
      title: "Week Warrior",
      description: "Practice for 7 days straight",
      icon: "star" as const,
      isUnlocked: true
    },
    {
      title: "Time Master",
      description: "Complete 30 minutes in one day",
      icon: "clock" as const,
      isUnlocked: false,
      progress: 67
    },
    {
      title: "Speech Champion",
      description: "Reach level 10",
      icon: "user" as const,
      isUnlocked: false,
      progress: 80
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.email}!
        </h1>
        <p className="text-gray-600">
          You're doing great! Keep up the excellent progress.
        </p>
      </div>

      {/* Speech Practice Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Practice Speaking</h2>
        <AudioRecorder />
      </div>

      {/* Daily Goal Progress */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Today's Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressRing progress={dailyProgress} size={150}>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{dailyProgress}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </ProgressRing>
          <p className="text-sm text-gray-600 mt-4">
            15 minutes daily practice goal
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userStats.xp.toLocaleString()}</div>
            <div className="text-sm text-gray-600">XP Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">Level {userStats.level}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{userStats.lessonsCompleted}</div>
            <div className="text-sm text-gray-600">Lessons Done</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats.speakingTime}m</div>
            <div className="text-sm text-gray-600">Speaking Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Lesson */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
        <LessonCard {...currentLesson} isCurrentLesson={true} />
      </div>

      {/* Recent Lessons */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Lessons</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {recentLessons.map((lesson, index) => (
            <LessonCard key={index} {...lesson} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementBadge key={index} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
