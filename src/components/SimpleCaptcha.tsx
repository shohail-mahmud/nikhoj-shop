import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle, Cat, Dog, Car, Bike, Flower2, TreePine, Fish, Bird, Coffee, Pizza, IceCream, Cake, ShieldCheck } from "lucide-react";
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
  const targetIconIndex = Math.floor(Math.random() * ICONS.length);
  const targetIcon = ICONS[targetIconIndex];
  
  const grid: GridItem[] = [];
  const targetCount = Math.floor(Math.random() * 3) + 2;
  
  for (let i = 0; i < targetCount; i++) {
    grid.push({
      id: `target-${i}`,
      iconIndex: targetIconIndex,
      colorIndex: Math.floor(Math.random() * COLORS.length),
      isTarget: true,
    });
  }
  
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
      <DialogContent className="w-[calc(100%-2rem)] max-w-[340px] rounded-2xl p-4 sm:p-5">
        <DialogHeader className="space-y-1 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verification
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Select all the <span className="font-semibold text-foreground">{targetIcon.label}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* Challenge header */}
          <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <targetIcon.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="text-muted-foreground">Find all {targetIcon.label}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={refresh}
              className="h-7 w-7"
              title="New challenge"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          {/* Image grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {grid.map((item) => {
              const IconComponent = ICONS[item.iconIndex].icon;
              const isSelected = selected.has(item.id);
              
              return (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-150",
                    "active:scale-95",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/50",
                    success && item.isTarget && "border-green-500 bg-green-500/10",
                    error && isSelected && !item.isTarget && "border-destructive bg-destructive/10"
                  )}
                >
                  <IconComponent className={cn("h-6 w-6 sm:h-7 sm:w-7", COLORS[item.colorIndex])} />
                </button>
              );
            })}
          </div>
          
          {/* Status messages */}
          {error && (
            <div className="flex items-center gap-2 text-destructive text-xs sm:text-sm bg-destructive/10 rounded-lg px-3 py-2">
              <XCircle className="h-4 w-4 flex-shrink-0" />
              <span>Incorrect. Try again.</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 text-green-600 text-xs sm:text-sm bg-green-500/10 rounded-lg px-3 py-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Verified! Redirecting...</span>
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-9 text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerify} 
              className="flex-1 h-9 text-xs sm:text-sm" 
              disabled={selected.size === 0 || success}
            >
              Verify {selected.size > 0 && `(${selected.size})`}
            </Button>
          </div>
          
          {/* Why captcha notice */}
          <p className="text-[10px] sm:text-xs text-center text-muted-foreground leading-relaxed">
            This helps us prevent spam and ensures genuine orders reach us.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
