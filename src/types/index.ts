export interface StoryRequest {
  prompt: string;
  chapters?: number;
  chapterLength?: number;
  continueFlag?: boolean;
  sessionId?: string;
}

export interface StoryResponse {
  prompt_used?: string;
  story: string;
  session_id: string;
  chapters: string[];
}

export interface FormState {
  isLoading: boolean;
  error: string | null;
  story: string | null;
}