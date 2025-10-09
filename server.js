import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { runWorkflow } from './workflow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Run the workflow
    const result = await runWorkflow({ input_as_text: message });

    // Return the agent's response
    res.json({
      response: result.response
    });

  } catch (error) {
    console.error('Error processing chat:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to process your message',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
