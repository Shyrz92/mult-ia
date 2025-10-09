import { runWorkflow } from '../workflow.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && req.url === '/api/health') {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // Chat endpoint
  if (req.method === 'POST' && (req.url === '/api/chat' || req.url === '/api')) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Run the workflow
      const result = await runWorkflow({ input_as_text: message });

      // Return the agent's response
      return res.status(200).json({
        response: result.response
      });

    } catch (error) {
      console.error('Error processing chat:', error);
      console.error('Error stack:', error.stack);
      return res.status(500).json({
        error: 'Failed to process your message',
        details: error.message
      });
    }
  }

  // Default 404
  return res.status(404).json({ error: 'Not found' });
}
