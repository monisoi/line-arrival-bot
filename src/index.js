import express from 'express';
import { lineBotMiddleware } from './line-bot';
import handleEvent from './handle-event';

const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', lineBotMiddleware, (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result));
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
