"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Welcome back!",
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-6">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
