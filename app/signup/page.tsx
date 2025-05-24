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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async () => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: signUpError.message,
        });
        return;
      }

      if (authData.user) {
        const { error: settingsError } = await supabase
          .from("user_settings")
          .upsert(
            {
              user_id: authData.user.id,
              mock_exam_date: null,
            },
            {
              onConflict: "user_id",
              ignoreDuplicates: true,
            }
          );

        if (settingsError) {
          console.error("Error creating user settings:", settingsError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create user settings",
          });
        } else {
          toast({
            title: "Success",
            description: "Account created successfully! Please log in.",
          });
        }
      }

      router.push("/login");
    } catch (err) {
      console.error("Error during signup:", err);
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
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Input
            placeholder="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
