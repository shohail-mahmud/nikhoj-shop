import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface SimpleCaptchaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const generateProblem = () => {
  const operators = ["+", "-", "×"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch (operator) {
    case "+":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 - num2;
      break;
    case "×":
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
  }
  
  return { num1, num2, operator, answer };
};

export const SimpleCaptcha = ({ open, onOpenChange, onSuccess }: SimpleCaptchaProps) => {
  const [problem, setProblem] = useState(generateProblem);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setProblem(generateProblem());
      setUserAnswer("");
      setError(false);
      setSuccess(false);
    }
  }, [open]);

  const refreshProblem = () => {
    setProblem(generateProblem());
    setUserAnswer("");
    setError(false);
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = parseInt(userAnswer.trim(), 10);
    
    if (parsed === problem.answer) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onOpenChange(false);
        onSuccess();
      }, 500);
    } else {
      setError(true);
      setSuccess(false);
      setUserAnswer("");
      // Generate new problem after wrong answer
      setTimeout(() => {
        refreshProblem();
      }, 1000);
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
            Solve this simple math problem to continue to Instagram.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center gap-3 p-6 bg-muted/50 rounded-xl">
            <div className="text-3xl font-bold text-foreground">
              {problem.num1} {problem.operator} {problem.num2} = ?
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={refreshProblem}
              className="ml-2"
              title="New problem"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="captcha-answer">Your Answer</Label>
            <Input
              id="captcha-answer"
              type="number"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setError(false);
              }}
              placeholder="Enter your answer"
              className={`text-center text-lg ${
                error ? "border-destructive focus-visible:ring-destructive" : 
                success ? "border-green-500 focus-visible:ring-green-500" : ""
              }`}
              autoFocus
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <XCircle className="h-4 w-4" />
              Wrong answer. Try again with a new problem.
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
            <Button type="submit" className="flex-1" disabled={!userAnswer.trim()}>
              Verify
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
