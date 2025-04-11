"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckIcon } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { addLead } from "@/lib/lead";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

export default function Lead() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { toast } = useToast();

  const { unlockAchievement } = useAchievementsContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { success, error } = await addLead(email);
    setIsLoading(false);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
      return;
    }
    if (success) {
      setIsSubscribed(true);
      toast({
        title: "Success",
        description: "You have successfully subscribed to the newsletter!",
        variant: "default",
      });
      unlockAchievement("lead");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stay updated</CardTitle>
        <CardDescription>
          Subscribe to the newsletter to receive new articles directly in your
          inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading || !email}
            >
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center py-2 text-green-500">
            <CheckIcon className="mr-2 h-5 w-5" />
            <span>Subscription completed!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        I&apos;ll never send spam. You can unsubscribe at any time.
      </CardFooter>
    </Card>
  );
}
