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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guess Which One is AI</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img src={leftImage} alt="Left Image" className="w-full h-64 object-cover rounded-lg mb-4" />
          <Button 
            onClick={() => handleBetClick('left')} 
            className="w-full max-w-xs"
            variant="outline"
          >
            <ArrowLeft className="mr-2" /> Left
          </Button>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img src={rightImage} alt="Right Image" className="w-full h-64 object-cover rounded-lg mb-4" />
          <Button 
            onClick={() => handleBetClick('right')} 
            className="w-full max-w-xs"
            variant="outline"
          >
            Right <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <Input
          type="number"
          placeholder="How much do you want to bet?"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="mr-4 bg-gray-800 text-white max-w-xs"
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
            <DialogDescription>
              Are you sure you want to bet {betAmount} on the {selectedSide} image?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmBet}>Confirm Bet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;