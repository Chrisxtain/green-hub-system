
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Campus Recycling",
    excerpt: "Learn the proper way to sort and dispose of different types of waste on campus. From plastic bottles to electronic devices, we cover it all.",
    author: "Dr. Sarah Green",
    date: "2024-01-15",
    category: "Recycling",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Reducing Waste: Simple Steps for Students",
    excerpt: "Discover practical tips to minimize your environmental footprint while studying. Small changes can make a big difference.",
    author: "Mike Chen",
    date: "2024-01-10",
    category: "Sustainability",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Understanding Hazardous Waste Disposal",
    excerpt: "Learn how to safely dispose of batteries, chemicals, and other hazardous materials commonly found on campus.",
    author: "Prof. Elena Rodriguez",
    date: "2024-01-05",
    category: "Safety",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=300&fit=crop"
  }
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 EcoTrack Blog
          </h1>
          <p className="text-gray-600">
            Learn about waste management, sustainability, and making a positive environmental impact
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group/btn p-0 h-auto text-green-600 hover:text-green-700"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-green-50 border-green-200 mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">Ready to Make a Difference?</CardTitle>
            <CardDescription className="text-green-600">
              Start tracking your environmental impact today and earn rewards for sustainable actions!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/report-waste')}
            >
              Start Reporting Waste
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
