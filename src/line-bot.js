import { Client } from '@line/bot-sdk';
import { createHmac } from 'crypto';
import { CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET } from './config';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
};

const lineBotClient = new Client(config);

export const isValidEvent = (signature, body) =>
  signature ===
  createHmac('SHA256', CHANNEL_SECRET)
    .update(Buffer.from(JSON.stringify(body)))
    .digest('base64');

export const isTextMessage = event => event.message.type === 'text';
export const isLocationMessage = event => event.message.type === 'location';

export const replyTextMessage = (replyToken, text) =>
  lineBotClient.replyMessage(replyToken, { type: 'text', text });
