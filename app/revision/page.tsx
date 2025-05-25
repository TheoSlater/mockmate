"use client";

import { useEffect, useState } from "react";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  PartyPopper,
  Medal,
} from "lucide-react";
import { supabase } from "@/utils/supabase";
import { questionsData, Question } from "@/data/questions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function RevisionPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await supabase
        .from("subjects")
        .select("*")
        .eq("user_id", user?.id);
      setSubjects(data || []);
    };

    fetchSubjects();
  }, [user]);

  const getFilteredQuestions = (subject: any) => {
    if (!subject || !questionsData[subject.subject]?.[subject.board]) return [];

    const allQuestions =
      questionsData[subject.subject][subject.board].questions;
    return allQuestions.filter((question) =>
      subject.selected_topics?.includes(question.topic)
    );
  };

  const startRevision = (subject: any, shouldShuffle: boolean = false) => {
    const filteredQuestions = getFilteredQuestions(subject);

    if (filteredQuestions.length === 0) {
      toast({
        title: "No questions available",
        description: "No questions found for your selected topics",
        variant: "destructive",
      });
      return;
    }

    // Shuffle questions if requested
    const questions = shouldShuffle
      ? [...filteredQuestions].sort(() => Math.random() - 0.5)
      : filteredQuestions;

    setSelectedSubject(subject.subject);
    setCurrentQuestion(questions[0]);
    setProgress(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = async (answerIndex: number) => {
    if (!currentQuestion || !selectedSubject) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    const currentSubject = subjects.find((s) => s.subject === selectedSubject);
    if (!currentSubject || !user?.id) return;

    try {
      // Update column name in query
      const { data: existingProgress } = await supabase
        .from("topic_progress")
        .select("completed_questions, total_questions")
        .eq("user_id", user.id)
        .eq("subject_id", currentSubject.id)
        .eq("topic_name", currentQuestion.topic) // Changed from 'topic' to 'topic_name'
        .single();

      const completedQuestions =
        (existingProgress?.completed_questions || 0) + (isCorrect ? 1 : 0);
      const totalQuestions = (existingProgress?.total_questions || 0) + 1;

      const { error } = await supabase.from("topic_progress").upsert(
        {
          user_id: user.id,
          subject_id: currentSubject.id,
          topic_name: currentQuestion.topic, // Changed from 'topic' to 'topic_name'
          completed_questions: completedQuestions,
          total_questions: totalQuestions,
        },
        {
          onConflict: "user_id,subject_id,topic_name",
        }
      );

      if (error) throw error;

      // Show success/failure toast
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect ? "Well done!" : "Keep trying!",
        variant: isCorrect ? "default" : "destructive",
      });
    } catch (err) {
      console.error("Error updating progress:", err);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  // Replace existing nextQuestion function
  const nextQuestion = () => {
    if (!selectedSubject) return;

    const currentSubject = subjects.find((s) => s.subject === selectedSubject);
    const filteredQuestions = getFilteredQuestions(currentSubject);

    const currentIndex = filteredQuestions.findIndex(
      (q) => q.id === currentQuestion?.id
    );
    const nextIndex = currentIndex + 1;

    // Check if we've reached the end of questions
    if (nextIndex >= filteredQuestions.length) {
      setIsComplete(true);
    } else {
      setCurrentQuestion(filteredQuestions[nextIndex]);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setProgress((nextIndex / filteredQuestions.length) * 100);
    }
  };

  // Add function to save progress
  const saveAndExit = async () => {
    if (!user?.id || !selectedSubject || !currentQuestion) return;

    const currentSubject = subjects.find((s) => s.subject === selectedSubject);
    if (!currentSubject) return;

    try {
      await supabase.from("revision_sessions").upsert(
        {
          user_id: user.id,
          subject_id: currentSubject.id,
          current_question_id: currentQuestion.id,
          progress: progress,
        },
        {
          onConflict: "user_id,subject_id",
        }
      );

      toast({
        title: "Progress saved",
        description: "You can continue your revision later",
      });

      router.push("/");
    } catch (err) {
      console.error("Error saving progress:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save progress",
      });
    }
  };

  // Add function to load saved progress
  const loadSavedProgress = async (subject: any) => {
    if (!user?.id) return;

    try {
      const { data: session } = await supabase
        .from("revision_sessions")
        .select("current_question_id, progress")
        .eq("user_id", user.id)
        .eq("subject_id", subject.id)
        .single();

      if (session) {
        setSelectedSubject(subject.subject);
        const questions =
          questionsData[subject.subject][subject.board].questions;
        const questionIndex = questions.findIndex(
          (q) => q.id === session.current_question_id
        );
        setCurrentQuestion(questions[questionIndex]);
        setProgress(session.progress);

        toast({
          title: "Session restored",
          description: "Continuing from where you left off",
        });
      } else {
        startRevision(subject);
      }
    } catch (err) {
      console.error("Error loading saved progress:", err);
      startRevision(subject);
    }
  };

  const renderCompletionScreen = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-all duration-200">
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {score.correct / score.total >= 0.7 ? (
              <Medal className="h-24 w-24 text-yellow-500" />
            ) : (
              <PartyPopper className="h-24 w-24 text-primary" />
            )}
          </div>
          <h2 className="text-3xl font-bold">Revision Complete!</h2>
          <div className="space-y-2">
            <p className="text-xl">
              You scored{" "}
              <span className="font-bold text-primary">
                {score.correct} out of {score.total}
              </span>
            </p>
            <Progress
              value={(score.correct / score.total) * 100}
              className="h-3 w-[200px] mx-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsComplete(false);
                setSelectedSubject(null);
                setScore({ correct: 0, total: 0 });
              }}
            >
              Study Another Subject
            </Button>
            <Button
              onClick={() => {
                const currentSubject = subjects.find(
                  (s) => s.subject === selectedSubject
                );
                if (currentSubject) {
                  setIsComplete(false);
                  setScore({ correct: 0, total: 0 });
                  startRevision(currentSubject, true); // add true to shuffle questions
                }
              }}
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 pt-20 pb-8 md:pt-24">
        {!selectedSubject ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Select a Subject
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
                  onClick={() => startRevision(subject)}
                >
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {subject.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Board: {subject.board}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected Topics: {subject.selected_topics?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Questions Available:{" "}
                      {getFilteredQuestions(subject).length}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : isComplete ? (
          renderCompletionScreen()
        ) : currentQuestion ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
                onClick={saveAndExit}
              >
                <ArrowLeft className="h-4 w-4" />
                Save and Exit
              </Button>
              <Progress value={progress} className="w-[200px] h-2" />
            </div>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  {currentQuestion.topic} - Question{" "}
                  {Math.round(
                    (progress / 100) *
                      (questionsData[selectedSubject][
                        subjects.find((s) => s.subject === selectedSubject)
                          ?.board || ""
                      ]?.questions.length || 0)
                  ) + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <p className="text-base sm:text-lg">
                  {currentQuestion.question}
                </p>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showExplanation
                          ? index === currentQuestion.correctAnswer
                            ? "secondary"
                            : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                          : "outline"
                      }
                      className="w-full justify-start h-auto min-h-[3rem] py-3 px-4 sm:px-6 text-left"
                      onClick={() => !showExplanation && handleAnswer(index)}
                      disabled={showExplanation}
                    >
                      <div className="flex items-start gap-3">
                        {showExplanation &&
                          index === currentQuestion.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500 mt-0.5" />
                          )}
                        {showExplanation &&
                          index === selectedAnswer &&
                          index !== currentQuestion.correctAnswer && (
                            <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                          )}
                        <span className="flex-1">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <Card className="bg-muted">
                    <CardContent className="p-4 sm:p-6">
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p className="text-sm sm:text-base">
                        {currentQuestion.explanation}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {showExplanation && (
                  <div className="flex justify-end pt-4">
                    <Button
                      className="w-full sm:w-auto"
                      size="lg"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default withAuth(RevisionPage);
