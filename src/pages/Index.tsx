import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const Index = () => {
  const [betAmount, setBetAmount] = useState('');
  const { toast } = useToast()

  const fetchImages = async () => {
    const response = await axios.get('http://183.122.23.1:9001');
    return response.data;
  };

  const { data: images, isLoading, isError } = useQuery({
    queryKey: ['images'],
    queryFn: fetchImages
  });

  const handleBet = (side: 'left' | 'right') => {
    if (!betAmount) {
      toast({
        title: "Bet amount required",
        description: "Please enter a bet amount before selecting a side.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Bet placed!",
      description: `You bet ${betAmount} on the ${side} image.`,
    });
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error fetching images</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guess Which One is AI</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-full md:w-1/2">
          <img src={images?.left} alt="Left Image" className="w-full h-64 object-cover rounded-lg" />
          <Button onClick={() => handleBet('left')} className="mt-4 w-full">
            <ArrowLeft className="mr-2" /> Left
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <img src={images?.right} alt="Right Image" className="w-full h-64 object-cover rounded-lg" />
          <Button onClick={() => handleBet('right')} className="mt-4 w-full">
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
          className="mr-4 bg-gray-800 text-white"
        />
      </div>
    </div>
  );
};

export default Index;