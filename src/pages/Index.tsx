import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const Index = () => {
  const [betAmount, setBetAmount] = useState('');
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  const getRandomImage = useCallback(() => {
    const width = 400;
    const height = 300;
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }, []);

  const [leftImage, setLeftImage] = useState(getRandomImage());
  const [rightImage, setRightImage] = useState(getRandomImage());

  const handleBetClick = (side: 'left' | 'right') => {
    if (!betAmount) {
      toast({
        title: "Bet amount required",
        description: "Please enter a bet amount before selecting a side.",
        variant: "destructive",
      });
      return;
    }
    setSelectedSide(side);
    setIsDialogOpen(true);
  };

  const handleConfirmBet = () => {
    if (selectedSide) {
      toast({
        title: "Bet placed!",
        description: `You bet ${betAmount} on the ${selectedSide} image.`,
      });
      // Refresh images after bet
      setLeftImage(getRandomImage());
      setRightImage(getRandomImage());
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzE3MjU0YyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjQ0MjgxIiBzdHJva2Utd2lkdGg9IjIiPjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjQ0MjgxIiBzdHJva2Utd2lkdGg9IjIiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-10"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">Guess Which One is AI</h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img src={leftImage} alt="Left Image" className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg" />
            <Button 
              onClick={() => handleBetClick('left')} 
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700"
              variant="outline"
            >
              <ArrowLeft className="mr-2" /> Left
            </Button>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img src={rightImage} alt="Right Image" className="w-full h-64 object-cover rounded-lg mb-4 shadow-lg" />
            <Button 
              onClick={() => handleBetClick('right')} 
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700"
              variant="outline"
            >
              Right <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Input
            type="number"
            placeholder="Bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-32 mr-4 bg-gray-800 text-white border-blue-500"
          />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
            <DialogDescription>
              Are you sure you want to bet {betAmount} on the {selectedSide} image?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-gray-700 hover:bg-gray-600">Cancel</Button>
            <Button onClick={handleConfirmBet} className="bg-blue-600 hover:bg-blue-700">Confirm Bet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;