export interface StoryRequest {
  prompt: string;
}

export interface StoryResponse {
  prompt_used?: string;
  story: string;
}

export interface FormState {
  isLoading: boolean;
  error: string | null;
  story: string | null;
}