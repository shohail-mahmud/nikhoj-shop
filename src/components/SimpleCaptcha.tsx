import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle, Cat, Dog, Car, Bike, Flower2, TreePine, Fish, Bird, Coffee, Pizza, IceCream, Cake } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleCaptchaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const ICONS = [
  { id: "cat", icon: Cat, label: "cats" },
  { id: "dog", icon: Dog, label: "dogs" },
  { id: "car", icon: Car, label: "cars" },
  { id: "bike", icon: Bike, label: "bikes" },
  { id: "flower", icon: Flower2, label: "flowers" },
  { id: "tree", icon: TreePine, label: "trees" },
  { id: "fish", icon: Fish, label: "fish" },
  { id: "bird", icon: Bird, label: "birds" },
  { id: "coffee", icon: Coffee, label: "coffee cups" },
  { id: "pizza", icon: Pizza, label: "pizzas" },
  { id: "icecream", icon: IceCream, label: "ice creams" },
  { id: "cake", icon: Cake, label: "cakes" },
];

const COLORS = [
  "text-rose-500",
  "text-blue-500",
  "text-green-500",
  "text-amber-500",
  "text-purple-500",
  "text-cyan-500",
  "text-pink-500",
  "text-indigo-500",
  "text-teal-500",
];

interface GridItem {
  id: string;
  iconIndex: number;
  colorIndex: number;
  isTarget: boolean;
}

const generateGrid = () => {
  // Pick a random target icon
  const targetIconIndex = Math.floor(Math.random() * ICONS.length);
  const targetIcon = ICONS[targetIconIndex];
  
  // Generate grid with 9 items (3x3)
  const grid: GridItem[] = [];
  const targetCount = Math.floor(Math.random() * 3) + 2; // 2-4 target icons
  
  // Add target icons
  for (let i = 0; i < targetCount; i++) {
    grid.push({
      id: `target-${i}`,
      iconIndex: targetIconIndex,
      colorIndex: Math.floor(Math.random() * COLORS.length),
      isTarget: true,
    });
  }
  
  // Fill rest with random non-target icons
  const remainingCount = 9 - targetCount;
  const otherIcons = ICONS.filter((_, idx) => idx !== targetIconIndex);
  
  for (let i = 0; i < remainingCount; i++) {
    const randomIconIndex = Math.floor(Math.random() * otherIcons.length);
    const actualIndex = ICONS.findIndex(icon => icon.id === otherIcons[randomIconIndex].id);
    grid.push({
      id: `other-${i}`,
      iconIndex: actualIndex,
      colorIndex: Math.floor(Math.random() * COLORS.length),
      isTarget: false,
    });
  }
  
  // Shuffle the grid
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  
  return { grid, targetIcon };
};

export const SimpleCaptcha = ({ open, onOpenChange, onSuccess }: SimpleCaptchaProps) => {
  const [{ grid, targetIcon }, setChallenge] = useState(() => generateGrid());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const refresh = useCallback(() => {
    setChallenge(generateGrid());
    setSelected(new Set());
    setError(false);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (open) {
      refresh();
    }
  }, [open, refresh]);

  const toggleSelection = (id: string) => {
    if (success) return;
    
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    setError(false);
  };

  const handleVerify = () => {
    const targetIds = grid.filter(item => item.isTarget).map(item => item.id);
    const selectedArray = Array.from(selected);
    
    // Check if selection matches exactly
    const isCorrect = 
      targetIds.length === selectedArray.length &&
      targetIds.every(id => selected.has(id));
    
    if (isCorrect) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onOpenChange(false);
        onSuccess();
      }, 600);
    } else {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        refresh();
      }, 1200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🛡️ Quick Verification
          </DialogTitle>
          <DialogDescription>
            Select all the <span className="font-semibold text-foreground">{targetIcon.label}</span> to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <targetIcon.icon className="h-5 w-5 text-primary" />
              <span>Find all {targetIcon.label}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={refresh}
              title="New challenge"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {grid.map((item) => {
              const IconComponent = ICONS[item.iconIndex].icon;
              const isSelected = selected.has(item.id);
              
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-xl border-2 transition-all duration-200",
                    "hover:scale-105 hover:shadow-md",
                    isSelected
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                      : "border-border bg-muted/30 hover:border-primary/50",
                    success && item.isTarget && "border-green-500 bg-green-500/10",
                    error && isSelected && !item.isTarget && "border-destructive bg-destructive/10"
                  )}
                >
                  <IconComponent className={cn("h-8 w-8", COLORS[item.colorIndex])} />
                </button>
              );
            })}
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <XCircle className="h-4 w-4" />
              Wrong selection. Try again with a new challenge.
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              Correct! Redirecting to Instagram...
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerify} 
              className="flex-1" 
              disabled={selected.size === 0 || success}
            >
              Verify ({selected.size} selected)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
