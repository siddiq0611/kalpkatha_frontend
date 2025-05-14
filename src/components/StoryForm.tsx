import React, { useState } from 'react';
import axios from 'axios';
import { StoryResponse, FormState } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ReactMarkdown from 'react-markdown';

const chapterLimits: Record<number, number> = {
  1: 2000,
  2: 1250,
  3: 850,
  4: 625,
  5: 500,
  6: 400,
  7: 350,
  8: 300,
  9: 250,
  10: 200,
};

function getChapterLimit(chapter: number): number {
  return chapterLimits[chapter] || 200;
}

function generateChapterLengthOptions(chapter: number): React.ReactElement[] {
  const max = getChapterLimit(chapter);
  const options = [];
  for (let i = 50; i <= max; i += 50) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
}


const StoryForm: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [chaptersCount, setChaptersCount] = useState<number>(3);
  const [chapterLength, setChapterLength] = useState<number>(500);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null,
    story: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      return setFormState({ ...formState, error: 'Please enter a story prompt.' });
    }
    setFormState({ isLoading: true, error: null, story: null });

    try {
      const response = await axios.post<StoryResponse>('/api/proxy', {
        prompt: prompt.trim(),
        chapters: chaptersCount,
        chapterLength,
      });

      setSessionId(response.data.session_id);
      setFormState({ isLoading: false, error: null, story: response.data.chapters.join('\n\n') });
    } catch {
      setFormState({ isLoading: false, error: 'Failed to generate story.', story: null });
    }
  };

  const handleContinue = async () => {
    if (!sessionId) return;
    setFormState({ ...formState, isLoading: true });

    try {
      const response = await axios.post<StoryResponse>('/api/proxy', {
        continueFlag: true,
        sessionId,
        chapters: chaptersCount,
        chapterLength,
      });
      setFormState(state => ({
        isLoading: false,
        error: null,
        story: state.story + '\n\n' + response.data.chapters.join('\n\n'),
      }));
    } catch {
      setFormState({ isLoading: false, error: 'Failed to continue story.', story: formState.story });
    }
  };





  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Once upon a time, there was a girl named Miku who loved cars...."
          className="input-field h-32"
          disabled={formState.isLoading}
        />

<div className="flex space-x-4">
  <label className="w-1/2">
    Chapter (1–10):
    <select
      value={chaptersCount}
      onChange={e => {
        const chapter = +e.target.value;
        setChaptersCount(chapter);

        // Auto-adjust chapterLength if current exceeds max for selected chapter
        const max = getChapterLimit(chapter);
        if (chapterLength > max) setChapterLength(max);
      }}
      className="ml-2 input-field w-full"
      disabled={formState.isLoading}
    >
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  </label>

  <label className="w-1/2">
    Words per chapter:
    <select
      value={chapterLength}
      onChange={e => setChapterLength(+e.target.value)}
      className="ml-2 input-field w-full"
      disabled={formState.isLoading}
    >
      {generateChapterLengthOptions(chaptersCount)}
    </select>
  </label>
</div>


        <button type="submit" className="btn btn-primary" disabled={formState.isLoading}>
          {formState.isLoading ? 'Generating...' : 'Generate Story'}
        </button>
      </form>

      {formState.isLoading && <LoadingSpinner />}
      {formState.error && <div className="alert-error">{formState.error}</div>}

      {formState.story && (
        <div>
          <h2 className="text-2xl">Your Story</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{formState.story}</ReactMarkdown>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleContinue} disabled={formState.isLoading}>
            Continue Story
          </button>
        </div>
      )}
    </div>
  );
};



export default StoryForm;