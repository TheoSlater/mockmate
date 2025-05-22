"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Calendar, FlaskConical, Lightbulb, Timer } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pt-24">
        {/* Hero Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Hey Theo, here&apos;s your revision outlook
            </h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-4 w-4" />
                    Mocks in
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold">28 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-4 w-4" />
                    Topics Mastered
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold">12/42</p>
                  <Progress value={28.5} className="mt-2" />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col xs:flex-row gap-3">
              <Button size="lg" className="flex-1 text-sm sm:text-base">
                Continue Today&apos;s Revision
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="flex-1 text-sm sm:text-base"
              >
                Panic Mode
              </Button>
            </div>
          </div>

          <Card className="relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-chart-1 to-chart-2 opacity-20 dark:opacity-10" />
            <CardHeader className="p-4 sm:p-6">
              <CardTitle>Study Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Physics</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Chemistry</span>
                    <span>32%</span>
                  </div>
                  <Progress value={32} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Biology</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Section */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Study Tools</h2>
        <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="h-full">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5" />
                Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Take a quick 10-minute test
              </p>
              <Button className="w-full mt-3 sm:mt-4 text-sm">
                Start Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
                Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Review your study decks
              </p>
              <Button
                className="w-full mt-3 sm:mt-4 text-sm"
                variant="secondary"
              >
                View Decks
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                AI Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Generate practice questions
              </p>
              <Button
                className="w-full mt-3 sm:mt-4 text-sm"
                variant="secondary"
              >
                Generate
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Timer className="h-4 w-4 sm:h-5 sm:w-5" />
                Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Focus with Pomodoro
              </p>
              <Button
                className="w-full mt-3 sm:mt-4 text-sm"
                variant="secondary"
              >
                Start Timer
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
