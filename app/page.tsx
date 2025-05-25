"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Calendar, FlaskConical, Lightbulb, Timer } from "lucide-react";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

function Home() {
  const { user } = useAuth();
  const name = user?.user_metadata?.name || "there";
  const [daysUntilExam, setDaysUntilExam] = useState<number | null>(null);
  const [subjectProgress, setSubjectProgress] = useState<
    Record<string, number>
  >({});
  const [totalTopics, setTotalTopics] = useState(0);
  const [masteredTopics, setMasteredTopics] = useState(0);

  useEffect(() => {
    const fetchExamDate = async () => {
      if (!user?.id) return;

      try {
        const { data: existingSettings, error: checkError } = await supabase
          .from("user_settings")
          .select("mock_exam_date")
          .eq("user_id", user.id)
          .maybeSingle();

        if (checkError) {
          console.error("Error checking settings:", checkError);
          return;
        }

        if (!existingSettings) {
          // Use upsert instead of insert to handle potential race conditions
          const { error: createError } = await supabase
            .from("user_settings")
            .upsert(
              {
                user_id: user.id,
                mock_exam_date: null,
              },
              {
                onConflict: "user_id",
              }
            );

          if (createError) {
            console.error("Error creating settings:", createError);
            return;
          }
        } else if (existingSettings.mock_exam_date) {
          const examDate = new Date(existingSettings.mock_exam_date);
          const today = new Date();
          const diffTime = examDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysUntilExam(diffDays > 0 ? diffDays : null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchExamDate();
  }, [user]);

  const handleUpdateExamDate = async () => {
    if (!user?.id) return;

    const date = prompt("Enter your exam date (YYYY-MM-DD):");
    if (!date) return;

    const { error } = await supabase.from("user_settings").upsert({
      user_id: user.id,
      mock_exam_date: date,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update exam date",
      });
    } else {
      window.location.reload();
    }
  };

  const fetchProgress = useCallback(async () => {
    if (!user?.id) return;

    try {
      // First fetch subjects
      const { data: subjects } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", user.id);

      if (subjects) {
        const progress: Record<string, number> = {};
        let totalMastered = 0;
        let total = 0;

        // Then fetch progress for each subject
        for (const subject of subjects) {
          const { data: topicProgress } = await supabase
            .from("topic_progress")
            .select("completed_questions, total_questions")
            .eq("subject_id", subject.id);

          if (topicProgress && topicProgress.length > 0) {
            const completed = topicProgress.reduce(
              (acc, curr) =>
                acc + (curr.completed_questions / curr.total_questions) * 100,
              0
            );
            const average = completed / topicProgress.length;
            progress[subject.subject] = Math.round(average);

            totalMastered += topicProgress.filter(
              (t) => t.completed_questions / t.total_questions >= 0.8
            ).length;
            total += topicProgress.length;
          } else {
            progress[subject.subject] = 0;
          }
        }

        setSubjectProgress(progress);
        setMasteredTopics(totalMastered);
        setTotalTopics(total);
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 pt-20 pb-8 md:pt-24">
        <div className="grid gap-8 lg:grid-cols-2 mb-8 w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold">Hey {name}</h1>
              <p className="text-xl text-muted-foreground">
                Here&apos;s your revision outlook
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="p-4 space-y-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    Mocks in
                  </CardTitle>
                  <div>
                    <p className="text-3xl font-bold tracking-tight">
                      {daysUntilExam ? `${daysUntilExam} days` : "Not set"}
                    </p>
                    <Button
                      variant="link"
                      className="px-0 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={handleUpdateExamDate}
                    >
                      {daysUntilExam ? "Update date" : "Set date"}
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="p-4 space-y-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-primary" />
                    Topics Mastered
                  </CardTitle>
                  <div>
                    <p className="text-3xl font-bold tracking-tight">
                      {masteredTopics}/{totalTopics}
                    </p>
                    <Progress
                      value={
                        totalTopics ? (masteredTopics / totalTopics) * 100 : 0
                      }
                      className="mt-2 h-2"
                    />
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/revision" className="flex-1">
                <Button size="lg" className="w-full ">
                  Continue Today&apos;s Revision
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="destructive"
                className="flex-1 shadow-lg hover:shadow-destructive/25 transition-all"
              >
                Panic Mode
              </Button> */}
            </div>
          </div>

          <Card className="relative overflow-hidden bg-gradient-to-br from-card/50 to-card hover:shadow-lg transition-all duration-200">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-1 to-chart-2 opacity-20 dark:opacity-10" />
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {Object.entries(subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{subject}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study tools section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Study Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <FlaskConical className="h-5 w-5" />
                  Practice Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Take a quick 10-minute test
                </p>
                <Button className="w-full mt-4">Start Quiz</Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Lightbulb className="h-5 w-5" />
                  Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Review your study decks
                </p>
                <Button className="w-full mt-4" variant="secondary">
                  View Decks
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Brain className="h-5 w-5" />
                  AI Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Generate practice questions
                </p>
                <Button className="w-full mt-4" variant="secondary">
                  Generate
                </Button>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Timer className="h-5 w-5" />
                  Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Focus with Pomodoro
                </p>
                <Button className="w-full mt-4" variant="secondary">
                  Start Timer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
