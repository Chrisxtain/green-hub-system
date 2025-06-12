
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Coffee, BookOpen, Ticket, ShoppingBag, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Rewards() {
  const { profile } = useAuth();

  const rewards = [
    {
      id: 1,
      title: 'Free Coffee',
      description: 'Get a free coffee from the campus café',
      points: 50,
      icon: Coffee,
      category: 'Food & Drink',
      available: true,
    },
    {
      id: 2,
      title: 'Library Late Fee Waiver',
      description: 'Waive one library late fee (up to $10)',
      points: 75,
      icon: BookOpen,
      category: 'Academic',
      available: true,
    },
    {
      id: 3,
      title: 'Campus Event Ticket',
      description: 'Free ticket to select campus events',
      points: 100,
      icon: Ticket,
      category: 'Entertainment',
      available: true,
    },
    {
      id: 4,
      title: 'Eco-Friendly Tote Bag',
      description: 'Reusable campus-branded tote bag',
      points: 150,
      icon: ShoppingBag,
      category: 'Merchandise',
      available: true,
    },
    {
      id: 5,
      title: 'Priority Parking Spot',
      description: '1-day reserved parking spot near campus center',
      points: 200,
      icon: Star,
      category: 'Premium',
      available: false,
    },
    {
      id: 6,
      title: 'Campus Store Voucher',
      description: '$10 voucher for the campus bookstore',
      points: 250,
      icon: Gift,
      category: 'Shopping',
      available: true,
    },
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (!profile) return;

    if (profile.points < reward.points) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.points - profile.points} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    if (!reward.available) {
      toast({
        title: "Reward unavailable",
        description: "This reward is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    // Here you would implement the actual redemption logic
    toast({
      title: "Reward redeemed!",
      description: `You've successfully redeemed ${reward.title}. Check your email for details.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food & Drink': return 'bg-orange-100 text-orange-800';
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Entertainment': return 'bg-purple-100 text-purple-800';
      case 'Merchandise': return 'bg-green-100 text-green-800';
      case 'Premium': return 'bg-yellow-100 text-yellow-800';
      case 'Shopping': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rewards Store 🎁
          </h1>
          <p className="text-gray-600 mb-4">
            Redeem your eco-points for awesome campus perks!
          </p>
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-lg">{profile?.points || 0} Points</span>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.id} className={`relative ${!reward.available ? 'opacity-75' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${reward.available ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
                    <reward.icon className="h-6 w-6" />
                  </div>
                  <Badge className={getCategoryColor(reward.category)}>
                    {reward.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-lg">{reward.points} pts</span>
                  </div>
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={!reward.available || (profile?.points || 0) < reward.points}
                    variant={reward.available && (profile?.points || 0) >= reward.points ? "default" : "outline"}
                  >
                    {!reward.available ? 'Out of Stock' : 
                     (profile?.points || 0) < reward.points ? 'Not Enough Points' : 'Redeem'}
                  </Button>
                </div>
              </CardContent>
              {!reward.available && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* How to Earn More Points */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn More Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">+10</span>
                </div>
                <h4 className="font-semibold">Report Waste</h4>
                <p className="text-sm text-gray-600">Find and report waste on campus</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">+25</span>
                </div>
                <h4 className="font-semibold">Clean Up Events</h4>
                <p className="text-sm text-gray-600">Participate in campus clean-up events</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">+50</span>
                </div>
                <h4 className="font-semibold">Education Quizzes</h4>
                <p className="text-sm text-gray-600">Complete recycling education modules</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
