import React, { useState, useCallback } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
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
  const [selectedDirection, setSelectedDirection] = useState<'up' | 'down' | null>(null);

  const getRandomPrice = useCallback(() => {
    return (Math.random() * 10000 + 20000).toFixed(2);
  }, []);

  const [currentPrice, setCurrentPrice] = useState(getRandomPrice());

  const handleBetClick = (direction: 'up' | 'down') => {
    if (!betAmount) {
      toast({
        title: "Bet amount required",
        description: "Please enter a bet amount before selecting a direction.",
        variant: "destructive",
      });
      return;
    }
    setSelectedDirection(direction);
    setIsDialogOpen(true);
  };

  const handleConfirmBet = () => {
    if (selectedDirection) {
      toast({
        title: "Bet placed!",
        description: `You bet ${betAmount} that Bitcoin will go ${selectedDirection}.`,
      });
      // Simulate price change after bet
      setTimeout(() => {
        const newPrice = getRandomPrice();
        setCurrentPrice(newPrice);
        const result = (selectedDirection === 'up' && parseFloat(newPrice) > parseFloat(currentPrice)) ||
                       (selectedDirection === 'down' && parseFloat(newPrice) < parseFloat(currentPrice));
        toast({
          title: result ? "You won!" : "You lost!",
          description: `New Bitcoin price: $${newPrice}`,
          variant: result ? "default" : "destructive",
        });
      }, 3000);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bitcoin Price Prediction</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="text-6xl font-bold">
          ${currentPrice}
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => handleBetClick('up')} 
            className="w-32"
            variant="outline"
          >
            <ArrowUp className="mr-2" /> Up
          </Button>
          <Button 
            onClick={() => handleBetClick('down')} 
            className="w-32"
            variant="outline"
          >
            <ArrowDown className="mr-2" /> Down
          </Button>
        </div>
        <div className="flex items-center">
          <Input
            type="number"
            placeholder="Bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-32 mr-4 bg-gray-800 text-white"
          />
          <span>USD</span>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
            <DialogDescription>
              Are you sure you want to bet {betAmount} USD that Bitcoin will go {selectedDirection}?
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