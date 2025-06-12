
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, PlayCircle, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function EducationHub() {
  const [completedModules, setCompletedModules] = useState<number[]>([1, 3]);

  const modules = [
    {
      id: 1,
      title: 'Recycling Basics',
      description: 'Learn the fundamentals of recycling and waste management',
      duration: '10 min',
      points: 25,
      difficulty: 'Beginner',
      completed: true,
      lessons: 5,
      type: 'interactive',
    },
    {
      id: 2,
      title: 'Plastic Types & Recycling',
      description: 'Understand different plastic types and their recycling codes',
      duration: '15 min',
      points: 35,
      difficulty: 'Intermediate',
      completed: false,
      lessons: 7,
      type: 'video',
    },
    {
      id: 3,
      title: 'Campus Waste Streams',
      description: 'How waste flows through our university campus',
      duration: '12 min',
      points: 30,
      difficulty: 'Beginner',
      completed: true,
      lessons: 6,
      type: 'interactive',
    },
    {
      id: 4,
      title: 'Composting Fundamentals',
      description: 'Organic waste processing and composting techniques',
      duration: '20 min',
      points: 40,
      difficulty: 'Intermediate',
      completed: false,
      lessons: 8,
      type: 'mixed',
    },
    {
      id: 5,
      title: 'E-Waste Management',
      description: 'Proper disposal of electronic devices and components',
      duration: '18 min',
      points: 45,
      difficulty: 'Advanced',
      completed: false,
      lessons: 9,
      type: 'video',
    },
    {
      id: 6,
      title: 'Circular Economy Principles',
      description: 'Understanding the circular economy and sustainability',
      duration: '25 min',
      points: 50,
      difficulty: 'Advanced',
      completed: false,
      lessons: 10,
      type: 'interactive',
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Recycling Symbol Quiz',
      description: 'Test your knowledge of recycling symbols and codes',
      questions: 10,
      points: 20,
      difficulty: 'Easy',
      timeLimit: '5 min',
    },
    {
      id: 2,
      title: 'Waste Sorting Challenge',
      description: 'Sort different items into the correct waste streams',
      questions: 15,
      points: 30,
      difficulty: 'Medium',
      timeLimit: '8 min',
    },
    {
      id: 3,
      title: 'Sustainability Expert Test',
      description: 'Advanced quiz on environmental impact and solutions',
      questions: 20,
      points: 50,
      difficulty: 'Hard',
      timeLimit: '15 min',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Intermediate':
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'interactive': return <BookOpen className="h-4 w-4" />;
      case 'mixed': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const totalPoints = completedModules.reduce((sum, moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    return sum + (module?.points || 0);
  }, 0);

  const completionRate = (completedModules.length / modules.length) * 100;

  const handleStartModule = (moduleId: number) => {
    // In a real app, this would navigate to the module content
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Education Hub 📚
          </h1>
          <p className="text-gray-600">
            Learn about recycling and sustainability to earn points!
          </p>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{completedModules.length}</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={completionRate} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className={`relative ${module.completed ? 'ring-2 ring-green-500' : ''}`}>
                {module.completed && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(module.type)}
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      +{module.points} pts
                    </div>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {module.duration}
                    </div>
                    <div>{module.lessons} lessons</div>
                  </div>
                  <Button 
                    onClick={() => handleStartModule(module.id)}
                    className="w-full"
                    variant={module.completed ? "outline" : "default"}
                  >
                    {module.completed ? 'Review' : 'Start Module'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Knowledge Quizzes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Knowledge Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span>{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span>{quiz.timeLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Points:</span>
                      <span className="text-green-600 font-semibold">+{quiz.points}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Take Quiz
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
