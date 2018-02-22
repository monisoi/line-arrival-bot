import { Client as LineBotClient, middleware } from '@line/bot-sdk';
import express from 'express';
import fetchDirections from './fetch-directions';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new LineBotClient(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// event handler
const handleEvent = async event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };
  // const origin = '%E6%9D%B1%E4%BA%AC%E9%A7%85';
  // const destination = '%E6%89%80%E6%B2%A2%E9%A7%85';
  // const { distance, duration } = await fetchDirections(origin, destination);
  // const message = `道のり：${distance}, 時間：${duration}`;

  // use reply API
  return client.replyMessage(event.replyToken, echo);
  // return client.replyMessage(event.replyToken, { type: 'text', text: message });
};

// register a webhook handler with middleware
// about the middleware, please refer to doc
// app.post('/webhook', line.middleware(config), (req, res) => {
app.post('/webhook', middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result));
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
