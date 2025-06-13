
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Campus Recycling",
    excerpt: "Learn the proper way to sort and dispose of different types of waste on campus. From plastic bottles to electronic devices, we cover it all.",
    content: `Proper waste disposal is crucial for maintaining a clean and sustainable campus environment. Here's your comprehensive guide:

**Plastic Waste:**
- Rinse containers before disposal
- Remove caps and labels when possible
- Sort by plastic type (look for recycling numbers)
- Avoid contaminated plastics

**Paper & Cardboard:**
- Keep dry and clean
- Remove any plastic components
- Flatten cardboard boxes
- Separate newspapers from mixed paper

**Electronic Waste:**
- Never throw in regular trash
- Use designated e-waste collection points
- Remove batteries separately
- Wipe personal data before disposal

**Organic Waste:**
- Use compost bins for food scraps
- Avoid meat and dairy in compost
- Include fruit peels, vegetable scraps
- Keep separate from other waste types`,
    author: "Dr. Sarah Green",
    date: "2024-01-15",
    category: "Recycling",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Reducing Waste: Simple Steps for Students",
    excerpt: "Discover practical tips to minimize your environmental footprint while studying. Small changes can make a big difference.",
    content: `As students, we can significantly reduce waste through simple daily practices:

**In Your Dorm/Apartment:**
- Use reusable water bottles and coffee cups
- Buy in bulk to reduce packaging
- Repurpose containers for storage
- Choose digital receipts and documents

**Study Materials:**
- Buy used textbooks or rent them
- Use both sides of paper
- Share resources with classmates
- Opt for digital notes when possible

**Food & Dining:**
- Bring reusable bags for shopping
- Use campus dining halls instead of packaged meals
- Compost food waste properly
- Plan meals to avoid food waste

**Technology:**
- Extend device lifespan with proper care
- Use cloud storage instead of physical drives
- Repair instead of replacing when possible
- Donate working electronics you no longer need`,
    author: "Mike Chen",
    date: "2024-01-10",
    category: "Sustainability",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Understanding Hazardous Waste Disposal",
    excerpt: "Learn how to safely dispose of batteries, chemicals, and other hazardous materials commonly found on campus.",
    content: `Hazardous waste requires special handling to protect both human health and the environment:

**Common Hazardous Items on Campus:**
- Batteries (all types)
- Fluorescent bulbs and CFLs
- Paint and art supplies
- Cleaning chemicals
- Laboratory chemicals
- Mercury-containing devices

**Proper Disposal Methods:**
- Use designated hazardous waste collection events
- Never mix different chemicals
- Keep items in original containers when possible
- Label unknown substances clearly

**Battery Disposal:**
- Lithium batteries: tape terminals before disposal
- Lead-acid batteries: return to auto shops
- Alkaline batteries: check local regulations
- Rechargeable batteries: use manufacturer take-back programs

**Safety Precautions:**
- Wear protective equipment when handling
- Ensure proper ventilation
- Never pour chemicals down drains
- Keep hazardous waste away from food and water`,
    author: "Prof. Elena Rodriguez",
    date: "2024-01-05",
    category: "Safety",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop"
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === parseInt(id || ''));
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <Button onClick={() => navigate('/blog')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button onClick={() => navigate('/blog')} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <Card>
          <div className="relative">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90">
                {post.category}
              </Badge>
            </div>
          </div>
          
          <CardHeader>
            <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <span>{post.readTime} read</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">Ready to Make a Difference?</CardTitle>
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
