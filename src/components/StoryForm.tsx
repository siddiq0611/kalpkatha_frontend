// import React, { useState } from 'react';
// import axios from 'axios';
// import { StoryResponse, FormState } from '../types';
// import LoadingSpinner from './LoadingSpinner';

// const StoryForm: React.FC = () => {
//   const [prompt, setPrompt] = useState('');
//   const [formState, setFormState] = useState<FormState>({
//     isLoading: false,
//     error: null,
//     story: null,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!prompt.trim()) {
//       setFormState({
//         ...formState,
//         error: 'Please enter a story prompt.',
//       });
//       return;
//     }

//     setFormState({
//       isLoading: true,
//       error: null,
//       story: null,
//     });

//     try {
//       const response = await axios.post<StoryResponse>('/api/proxy', {
//         prompt: prompt.trim(),
//       });

//       setFormState({
//         isLoading: false,
//         error: null,
//         story: response.data.story,
//       });
//     } catch (error) {
//       console.error('Error generating story:', error);
//       setFormState({
//         isLoading: false,
//         error: 'Failed to generate story. Please try again.',
//         story: null,
//       });
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="mb-4">
//           <label htmlFor="prompt" className="block text-gray-300 mb-2 text-lg">
//             Enter your story prompt:
//           </label>
//           <textarea
//             id="prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Once upon a time in a cyberpunk future..."
//             className="input-field h-32"
//             disabled={formState.isLoading}
//           />
//         </div>
        
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={formState.isLoading}
//           >
//             {formState.isLoading ? 'Generating...' : 'Generate Story'}
//           </button>
//         </div>
//       </form>

//       {formState.isLoading && <LoadingSpinner />}

//       {formState.error && (
//         <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-lg mb-6">
//           {formState.error}
//         </div>
//       )}

//       {formState.story && (
//         <div className="card story-container">
//           <h2 className="text-2xl mb-4 text-purple-300">Your Generated Story</h2>
//           <div className="prose prose-invert max-w-none">
//             {formState.story.split('\n\n').map((paragraph, index) => (
//               <p key={index} className="mb-4">
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoryForm;


import React, { useState } from 'react';
import axios from 'axios';
import { StoryResponse, FormState } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ReactMarkdown from 'react-markdown';
import ChapterRenderer from './ChapterRenderer';


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
    } catch (error) {
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

  const formatMarkdown = (raw: string) => {
    return raw
      .replace(/\*\*\s*\n\s*(.*?)\*\*/g, '**$1**') // Join separated bold markers
      .replace(/(?<!\n)\*\*(.*?)\*\*(?!\n)/g, '\n\n**$1**\n\n'); // Add newlines around bold
  };


  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Once upon a time..."
          className="input-field h-32"
          disabled={formState.isLoading}
        />

        <div className="flex space-x-4">
          <label className="w-1/2">
            Chapters:
            <input
              type="number"
              min={1}
              value={chaptersCount}
              onChange={e => setChaptersCount(+e.target.value)}
              className="ml-2 input-field w-full"
            />
          </label>

          <label className="w-1/2">
            Words per chapter:
            <input
              type="number"
              min={50}
              value={chapterLength}
              onChange={e => setChapterLength(+e.target.value)}
              className="ml-2 input-field w-full"
            />
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
          <ChapterRenderer chapterText={formState.story} />
          
          <button className="btn btn-primary mt-4" onClick={handleContinue} disabled={formState.isLoading}>
            Continue Story
          </button>
        </div>
      )}
    </div>
  );
};



export default StoryForm;