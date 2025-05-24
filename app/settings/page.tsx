"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [mockDate, setMockDate] = useState<string>("");
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('mock_exam_date')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading settings:', error);
        return;
      }

      if (data?.mock_exam_date) {
        setMockDate(new Date(data.mock_exam_date).toISOString().split('T')[0]);
      }
    }
    loadSettings();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        mock_exam_date: mockDate || null
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 pt-20 pb-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Mock Exam Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="date"
              value={mockDate}
              onChange={(e) => setMockDate(e.target.value)}
            />
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
