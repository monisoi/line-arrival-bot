import { lineBotClient } from './line-bot';
import fetchDirections from './fetch-directions';

const createMessage = async () => {
  const origin = '%E6%9D%B1%E4%BA%AC%E9%A7%85';
  const destination = '%E6%89%80%E6%B2%A2%E9%A7%85';
  const { distance, duration } = await fetchDirections(origin, destination);
  const message = `道のり：${distance}, 時間：${duration}`;
  return message;
};

export default async event => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  const message = await createMessage();
  // use reply API
  return lineBotClient.replyMessage(event.replyToken, { type: 'text', text: message });
};
