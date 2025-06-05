
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

interface AnalyticsData {
  fluencyScore: number;
  pronunciationScore: number;
  speedScore: number;
  confidenceLevel: number;
  weeklyProgress: Array<{ day: string; score: number; time: number }>;
  improvementAreas: Array<{ area: string; current: number; target: number }>;
}

const SpeechAnalytics = () => {
  const [analytics] = useState<AnalyticsData>({
    fluencyScore: 78,
    pronunciationScore: 85,
    speedScore: 72,
    confidenceLevel: 69,
    weeklyProgress: [
      { day: 'Mon', score: 65, time: 15 },
      { day: 'Tue', score: 70, time: 20 },
      { day: 'Wed', score: 68, time: 18 },
      { day: 'Thu', score: 75, time: 25 },
      { day: 'Fri', score: 78, time: 22 },
      { day: 'Sat', score: 80, time: 30 },
      { day: 'Sun', score: 82, time: 28 },
    ],
    improvementAreas: [
      { area: 'Consonant Clarity', current: 65, target: 85 },
      { area: 'Vowel Pronunciation', current: 78, target: 90 },
      { area: 'Rhythm & Pace', current: 72, target: 80 },
      { area: 'Voice Projection', current: 69, target: 85 },
    ],
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fluency</p>
                <p className={`text-2xl font-bold ${getScoreColor(analytics.fluencyScore)}`}>
                  {analytics.fluencyScore}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <Progress 
              value={analytics.fluencyScore} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pronunciation</p>
                <p className={`text-2xl font-bold ${getScoreColor(analytics.pronunciationScore)}`}>
                  {analytics.pronunciationScore}%
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
            <Progress 
              value={analytics.pronunciationScore} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Speaking Speed</p>
                <p className={`text-2xl font-bold ${getScoreColor(analytics.speedScore)}`}>
                  {analytics.speedScore}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning-500" />
            </div>
            <Progress 
              value={analytics.speedScore} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confidence</p>
                <p className={`text-2xl font-bold ${getScoreColor(analytics.confidenceLevel)}`}>
                  {analytics.confidenceLevel}%
                </p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
            <Progress 
              value={analytics.confidenceLevel} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Speech Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Practice Time (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.improvementAreas.map((area) => (
              <div key={area.area} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{area.area}</span>
                  <span className="text-sm text-gray-600">
                    {area.current}% / {area.target}%
                  </span>
                </div>
                <div className="relative">
                  <Progress value={(area.current / area.target) * 100} className="h-3" />
                  <div 
                    className="absolute top-0 w-1 h-3 bg-gray-400 rounded"
                    style={{ left: `${(area.target / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeechAnalytics;
