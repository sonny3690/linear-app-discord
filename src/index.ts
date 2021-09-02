import 'dotenv/config';
import express, { Request } from 'express';
import { Issue } from './services/issue';
import { IncomingLinearWebhookPayload } from './types';


const app = express();

const port: number = parseInt(process.env.PORT ?? '3000');

app.use(express.json());

app.post<Request['params'], unknown, IncomingLinearWebhookPayload>('/linear', async (req, res) => {
  const payload = req.body;

  if (payload.action === 'create' && payload.type === 'Issue') {
    await Issue.newIssue(payload);
  }

  res.sendStatus(200);
});

app.listen(port, () => console.log(`Webhook consumer listening on port ${port}!`));


