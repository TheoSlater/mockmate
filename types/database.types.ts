export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      subjects: {
        Row: {
          id: string;
          user_id: string;
          qualification: "GCSE" | "A-Level";
          subject: string;
          board: string;
          created_at: string;
          updated_at: string;
          selected_topics: string[]; // Added field
        };
        Insert: {
          id?: string;
          user_id: string;
          qualification: "GCSE" | "A-Level";
          subject: string;
          board: string;
          created_at?: string;
          updated_at?: string;
          selected_topics?: string[]; // Added field
        };
        Update: {
          id?: string;
          user_id?: string;
          qualification?: "GCSE" | "A-Level";
          subject?: string;
          board?: string;
          created_at?: string;
          updated_at?: string;
          selected_topics?: string[]; // Added field
        };
      };
      user_settings: {
        Row: {
          user_id: string;
          mock_exam_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          mock_exam_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          mock_exam_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      topic_progress: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          topic_name: string; // Changed from 'topic' to 'topic_name'
          completed_questions: number;
          total_questions: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          topic_name: string; // Changed from 'topic' to 'topic_name'
          completed_questions?: number;
          total_questions?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string;
          topic_name?: string; // Changed from 'topic' to 'topic_name'
          completed_questions?: number;
          total_questions?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      revision_sessions: {
        Row: {
          id: string;
          user_id: string;
          subject_id: string;
          current_question_id: string;
          progress: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject_id: string;
          current_question_id: string;
          progress: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject_id?: string;
          current_question_id?: string;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      qualification_type: "GCSE" | "A-Level";
    };
  };
}
