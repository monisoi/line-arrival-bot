import { isTextMessage, replyTextMessage } from './line-bot';
import fetchDirections from './fetch-directions';

const createMessage = async () => {
  const origin = '池袋';
  const destination = '東京駅';
  const originEncode = encodeURIComponent(origin);
  const destinationEncode = encodeURIComponent(destination);
  const { distance, duration } = (await fetchDirections(originEncode, destinationEncode)) || {};
  if (!distance || !duration) return '経路を特定できませんでした。';
  const message = `道のり：${distance}, 時間：${duration}`;
  console.log(`message ${message}`);
  return message;
};

export default async event => {
  if (isTextMessage) {
    const message = await createMessage();
    return replyTextMessage(event.replyToken, message);
  }
  return Promise.resolve(null);
};
