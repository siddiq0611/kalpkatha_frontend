// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import { StoryRequest, StoryResponse } from '../../types';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const { prompt } = req.body as StoryRequest;
    
//     if (!prompt) {
//       return res.status(400).json({ message: 'Prompt is required' });
//     }

//     const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
    
//     const response = await axios.post<StoryResponse>(
//       `${backendUrl}/api/generate-story`, 
//       { prompt }
//     );
    
//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.error('API proxy error:', error);
//     return res.status(500).json({ 
//       message: 'Failed to generate story',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const {
    prompt,
    chapters,
    chapterLength,
    simpleLanguage,
    continueFlag,
    sessionId,
  } = req.body;

  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
  let payload;
  let endpoint = '/api/generate-story';

  if (continueFlag) {
    endpoint = '/api/continue-story';
    payload = { session_id: sessionId, next_chapters: chapters, chapter_length: chapterLength };
  } else {
    payload = { prompt, chapters, chapter_length: chapterLength, simple_language: simpleLanguage };
  }

  try {
    const response = await axios.post(
      `${backendUrl}${endpoint}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ message: 'Backend request failed' });
  }
}