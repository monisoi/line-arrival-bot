import { Client, middleware } from '@line/bot-sdk';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

export const lineBotMiddleware = middleware(config);

export const lineBotClient = new Client(config);
