import { Client } from '@line/bot-sdk';
import { CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET } from './config';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
};

const lineBotClient = new Client(config);

export default lineBotClient;
