"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/navbar";
import { questionsData } from "@/data/questions";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// Constants moved outside component to avoid recreation
const AVAILABLE_SUBJECTS = [
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "English Literature",
  "English Language",
  "History",
  "Geography",
  "Computer Science",
  "French",
  "Spanish",
  "German",
];

const EXAM_BOARDS = {
  GCSE: ["AQA", "Edexcel", "OCR", "WJEC"],
  "A-Level": ["AQA", "Edexcel", "OCR", "WJEC"],
};

type QualificationType = "GCSE" | "A-Level";

type SubjectEntry = {
  id?: string;
  qualification: QualificationType;
  subject: string;
  board: string;
  user_id?: string;
  selected_topics?: string[];
};

function SubjectsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [subjects, setSubjects] = useState<SubjectEntry[]>([]);
  const [newSubject, setNewSubject] = useState<Partial<SubjectEntry>>({
    qualification: "GCSE",
    subject: "",
    board: "",
  });
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [editingSubject, setEditingSubject] = useState<SubjectEntry | null>(
    null
  );
  const [subjectToDelete, setSubjectToDelete] = useState<SubjectEntry | null>(
    null
  );

  const availableTopics =
    newSubject.subject && newSubject.board
      ? questionsData[newSubject.subject]?.[newSubject.board]?.topics || []
      : [];

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("subjects")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching subjects:", error);
          toast({
            title: "Error",
            description: "Failed to fetch subjects: " + error.message,
            variant: "destructive",
          });
          return;
        }

        setSubjects(data || []);
      } catch (err) {
        console.error("Error:", err);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    fetchSubjects();
  }, [user, toast]);

  const handleAddSubject = async () => {
    if (
      !newSubject.qualification ||
      !newSubject.subject ||
      !newSubject.board ||
      selectedTopics.length === 0
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select at least one topic",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add subjects",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: subject, error: subjectError } = await supabase
        .from("subjects")
        .insert({
          ...newSubject,
          user_id: user.id,
          selected_topics: selectedTopics,
        } as SubjectEntry)
        .select()
        .single();

      if (subjectError) throw subjectError;

      // Initialize topic progress for selected topics
      const topicProgressPromises = selectedTopics.map((topic) =>
        supabase.from("topic_progress").insert({
          user_id: user.id,
          subject_id: subject.id,
          topic_name: topic,
          completed_questions: 0,
          total_questions: questionsData[subject.subject][
            subject.board
          ].questions.filter((q) => q.topic === topic).length,
        })
      );

      await Promise.all(topicProgressPromises);

      setSubjects([subject, ...subjects]);
      setIsAddingSubject(false);
      setNewSubject({
        qualification: "GCSE",
        subject: "",
        board: "",
      });
      setSelectedTopics([]);

      toast({
        title: "Success",
        description: "Subject added successfully",
      });
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTopics = async () => {
    if (!editingSubject || !user) return;

    try {
      const { error } = await supabase
        .from("subjects")
        .update({ selected_topics: selectedTopics })
        .eq("id", editingSubject.id);

      if (error) throw error;

      // Update the local subjects state
      setSubjects(
        subjects.map((s) =>
          s.id === editingSubject.id
            ? { ...s, selected_topics: selectedTopics }
            : s
        )
      );

      // Reset editing state
      setEditingSubject(null);
      setSelectedTopics([]);

      toast({
        title: "Success",
        description: "Topics updated successfully",
      });
    } catch (err) {
      console.error("Error updating topics:", err);
      toast({
        title: "Error",
        description: "Failed to update topics",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubject = async () => {
    if (!subjectToDelete || !user) return;

    try {
      // Delete subject (cascade will handle related records)
      const { error } = await supabase
        .from("subjects")
        .delete()
        .eq("id", subjectToDelete.id);

      if (error) throw error;

      // Update local state
      setSubjects(subjects.filter((s) => s.id !== subjectToDelete.id));
      setSubjectToDelete(null);

      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting subject:", err);
      toast({
        title: "Error",
        description: "Failed to delete subject",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 pt-20 pb-8 md:pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold">My Subjects</h1>
          <Dialog open={isAddingSubject} onOpenChange={setIsAddingSubject}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogDescription>
                  Choose your qualification level, subject, exam board, and
                  topics.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Qualification</Label>
                  <Select
                    value={newSubject.qualification}
                    onValueChange={(value) =>
                      setNewSubject({
                        ...newSubject,
                        qualification: value as QualificationType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GCSE">GCSE</SelectItem>
                      <SelectItem value="A-Level">A-Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Subject</Label>
                  <Select
                    value={newSubject.subject}
                    onValueChange={(value) =>
                      setNewSubject({ ...newSubject, subject: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_SUBJECTS.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Exam Board</Label>
                  <Select
                    value={newSubject.board}
                    onValueChange={(value) =>
                      setNewSubject({ ...newSubject, board: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam board" />
                    </SelectTrigger>
                    <SelectContent>
                      {newSubject.qualification &&
                        EXAM_BOARDS[newSubject.qualification].map((board) => (
                          <SelectItem key={board} value={board}>
                            {board}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {newSubject.subject && newSubject.board && (
                  <div className="grid gap-2">
                    <Label>Topics</Label>
                    <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                      {availableTopics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={topic}
                            checked={selectedTopics.includes(topic)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTopics([...selectedTopics, topic]);
                              } else {
                                setSelectedTopics(
                                  selectedTopics.filter((t) => t !== topic)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={topic}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button onClick={handleAddSubject}>Add Subject</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
          {subjects.length === 0 ? (
            <Card className="col-span-full p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You haven&apos;t added any subjects yet.
              </p>
              <Button
                variant="secondary"
                onClick={() => setIsAddingSubject(true)}
              >
                Add your first subject
              </Button>
            </Card>
          ) : (
            subjects.map((subject) => (
              <Card key={subject.id} className="flex flex-col h-full">
                <CardHeader className="flex-none">
                  <CardTitle className="flex items-center justify-between">
                    {subject.subject}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                      onClick={() => setSubjectToDelete(subject)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="grid gap-2">
                    <div className="text-sm">
                      <span className="font-medium">Qualification:</span>{" "}
                      {subject.qualification}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Exam Board:</span>{" "}
                      {subject.board}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Topics:</span>
                      <div className="mt-1 space-y-1">
                        {subject.selected_topics?.map((topic) => (
                          <div
                            key={topic}
                            className="text-xs px-2 py-1 bg-secondary rounded-md"
                          >
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingSubject(subject);
                        setSelectedTopics(subject.selected_topics || []);
                      }}
                    >
                      Manage Topics
                    </Button>
                    <Button variant="secondary">Start Studying</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Dialog
          open={editingSubject !== null}
          onOpenChange={() => setEditingSubject(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Topics</DialogTitle>
              <DialogDescription>
                Select the topics you want to study for{" "}
                {editingSubject?.subject}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Topics</Label>
                <div className="grid gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                  {editingSubject &&
                    questionsData[editingSubject.subject]?.[
                      editingSubject.board
                    ]?.topics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-${topic}`}
                          checked={selectedTopics.includes(topic)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTopics([...selectedTopics, topic]);
                            } else {
                              setSelectedTopics(
                                selectedTopics.filter((t) => t !== topic)
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`edit-${topic}`}
                          className="text-sm font-medium leading-none"
                        >
                          {topic}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <Button onClick={handleUpdateTopics}>Update Topics</Button>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={subjectToDelete !== null}
          onOpenChange={() => setSubjectToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Subject</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {subjectToDelete?.subject}? This
                will remove all progress and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSubject}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}

export default withAuth(SubjectsPage);
