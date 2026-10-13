import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are "Harsh's Creative Studio Assistant", an expert AI consultant for Harsh's professional Video Editing and Thumbnail Design portfolio website.

About Harsh:
- Harsh is a professional Video Editor & Thumbnail Designer.
- Official Contact:
  * Instagram: @harshig_07 (https://www.instagram.com/harshig_07?psln=MTI4Z293MTZpcGN5OA==)
  * Email: kumarharsh0720@gmail.com
  * YouTube Sample: https://youtube.com/shorts/mJdeQjk0GuU
- Core Specialties:
  * High-CTR YouTube Thumbnails: 3D bold typography, high-contrast character lighting, expressive facial framing, clean rule-of-thirds composition, custom background grading.
  * Long-Form YouTube Video Editing: Narrative storytelling, retention-driven pacing, custom sound design (whooshes, risers, impacts, sub-drops), B-roll integration, color correction.
  * Short-Form Content (Reels, TikToks, Shorts): 3-second hook retention, dynamic animated subtitles, kinetic zoom cuts, SFX timing.
- Software Arsenal: Adobe Premiere Pro, After Effects, Photoshop, DaVinci Resolve, Illustrator.
- Turnaround Time: 24 to 48 hours for thumbnails and Shorts/Reels; 3 to 5 business days for full long-form video edits.
- Revisions: 2 to 3 free revision rounds included on every project.

Your Capabilities & Role:
1. Thumbnail Ideation & Critique:
   - Provide concrete, click-worthy YouTube thumbnail concepts based on the user's video title or topic.
   - Advise on color contrast (e.g., orange/cyan, yellow/dark slate), facial expressions, background simplicity, and max 3-4 word text overlays.
2. Video Editing Consultation:
   - Suggest hook ideas, transition types, pacing tips, audio mixing levels (voiceover -3dB to -6dB, background music -18dB to -24dB).
   - Advise on export specs (4K / 1080p, 60fps, ProRes / H.264 / H.265, bitrates).
3. Client Inquiries & Booking:
   - Answer questions about Harsh's turnaround, collaboration workflow, and process.
   - Encourage clients with specific projects to connect with Harsh directly on Instagram (@harshig_07) or via email (kumarharsh0720@gmail.com).

Formatting Guidelines:
- Keep responses friendly, energetic, direct, and well-structured using clear bullet points.
- Never invent external download links.
- Format advice clearly with headings or bullet points.`;

// Multi-turn chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, modelChoice } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server.',
      });
    }

    // Select models to try in order
    const candidateModels =
      modelChoice === 'fast'
        ? ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash']
        : ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];

    // Format conversation history for @google/genai
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    let reply = '';
    let usedModel = candidateModels[0];
    let lastError: any = null;

    for (const currentModel of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: currentModel,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response.text) {
          reply = response.text;
          usedModel = currentModel;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${currentModel} error, trying next candidate:`, err.message || err);
      }
    }

    if (!reply && lastError) {
      throw lastError;
    }

    res.json({
      reply: reply || 'I am ready to help you with thumbnail design ideas and video editing advice! How can I assist you?',
      model: usedModel,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process chat message with Gemini.',
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
