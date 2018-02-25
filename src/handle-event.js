import { lineBotClient } from './line-bot';
import fetchDirections from './fetch-directions';
import fetchGeolocation from './fetch-geolocation';

const createMessage = async () => {
  const { lat, lng } = (await fetchGeolocation()) || {};
  if (!lat || !lng) return '現在地を取得できませんでした。';
  const origin = `${lat}, ${lng}`;
  const destination = '東京駅';
  const destinationEncode = encodeURIComponent(destination);
  const { distance, duration } = (await fetchDirections(origin, destinationEncode)) || {};
  if (!distance || !duration) return '経路を特定できませんでした。';
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
