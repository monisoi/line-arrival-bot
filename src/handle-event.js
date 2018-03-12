import { isTextMessage, isLocationMessage, replyTextMessage } from './line-bot';
import fetchDirections from './fetch-directions';
import fetchLocations from './fetch-locations';

const createMessage = async (lineId, currentPoint = '') => {
  const locations = await fetchLocations(lineId);
  const { origin: registeredOrigin, destination: registeredDestination } = locations[0][0] || {};
  const origin = currentPoint || encodeURIComponent(registeredOrigin);
  const destination = encodeURIComponent(registeredDestination);
  const { distance, duration } = (await fetchDirections(origin, destination)) || {};
  if (!distance || !duration) return '経路を特定できませんでした。';
  const message = `道のり：${distance}, 時間：${duration}`;
  console.log(`message ${message}`);
  return message;
};

export default async event => {
  const lineId = event.source.userId;
  console.log(`lineId: ${lineId}`);
  if (isTextMessage(event)) {
    console.log('text content: %o', event.message);
    const message = await createMessage(lineId);
    return replyTextMessage(event.replyToken, message);
  }
  if (isLocationMessage(event)) {
    console.log('location content: %o', event.message);
    const { latitude, longitude } = event.message;
    const currentPoint = `${latitude} ${longitude}`;
    const message = await createMessage(lineId, currentPoint);
    return replyTextMessage(event.replyToken, message);
  }
  return Promise.resolve(null);
};
