import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { analyzeVideoWithGemini } from './src/server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Clip Studio' });
});

// Video Analysis with Gemini
app.post('/api/analyze-video', async (req, res) => {
  try {
    const projectId = req.body.projectId || 'proj-' + Date.now();
    const result = await analyzeVideoWithGemini(req.body, projectId);
    res.json(result);
  } catch (err: any) {
    console.error('Error analyzing video:', err);
    res.status(500).json({ error: err.message || 'Gagal menganalisis video' });
  }
});

// Serve frontend dist
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Clip Studio server running on http://0.0.0.0:${PORT}`);
});
