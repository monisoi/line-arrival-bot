import { isTextMessage, isLocationMessage, replyTextMessage } from './line-bot';
import fetchDirections from './fetch-directions';
import fetchFromDatastore from './fetch-from-datastore';
import saveToDatastore from './save-to-datastore';
import deleteFromDatastore from './delete-from-datastore';

// datastore kinds
const CURRENT_SCENARIO = 'current-scenario';
const LOCATIONS = 'locations';

const createMessage = async (lineId, currentPoint = '') => {
  const queryParams = {
    key: 'lineId',
    operator: '=',
    value: lineId,
  };
  const locations = await fetchFromDatastore(LOCATIONS, queryParams);
  const { origin: registeredOrigin, destination: registeredDestination } = locations[0] || {};
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
    const { text } = event.message || {};
    console.log('text content: %o', text);
    const queryParams = {
      key: 'lineId',
      operator: '=',
      value: lineId,
    };
    const currentScenario = await fetchFromDatastore(CURRENT_SCENARIO, queryParams);
    const { scenario = '' } = currentScenario[0] || {};
    if (scenario) {
      switch (scenario) {
        case 'register-origin': {
          const locations = (await fetchFromDatastore(LOCATIONS, queryParams)) || {};
          await saveToDatastore(LOCATIONS, { ...locations[0], lineId, origin: text });
          await deleteFromDatastore(CURRENT_SCENARIO, lineId);
          const output = '出発地点を登録しました';
          return replyTextMessage(event.replyToken, output);
        }
        case 'register-destination': {
          const locations = (await fetchFromDatastore(LOCATIONS, queryParams)) || {};
          await saveToDatastore(LOCATIONS, { ...locations[0], lineId, destination: text });
          await deleteFromDatastore(CURRENT_SCENARIO, lineId);
          const output = '目的地点を登録しました';
          return replyTextMessage(event.replyToken, output);
        }
        default: {
          await deleteFromDatastore(CURRENT_SCENARIO, lineId);
          const output = '不正なシナリオ';
          return replyTextMessage(event.replyToken, output);
        }
      }
    }
    switch (text) {
      case '出発地点登録': {
        await saveToDatastore(CURRENT_SCENARIO, { lineId, scenario: 'register-origin' });
        const output = '出発地点を入力してください';
        return replyTextMessage(event.replyToken, output);
      }
      case '目的地点登録': {
        await saveToDatastore(CURRENT_SCENARIO, { lineId, scenario: 'register-destination' });
        const output = '目的地点を入力してください';
        return replyTextMessage(event.replyToken, output);
      }
      case '帰る': {
        const output = await createMessage(lineId);
        return replyTextMessage(event.replyToken, output);
      }
      case 'ヘルプ': {
        const output = '「出発地点登録」「目的地点登録」「帰る」コマンド、および位置情報を送ることができます。';
        return replyTextMessage(event.replyToken, output);
      }
      default: {
        return Promise.resolve(null);
      }
    }
  }
  if (isLocationMessage(event)) {
    console.log('location content: %o', event.message);
    const { latitude, longitude } = event.message;
    const currentPoint = `${latitude} ${longitude}`;
    const output = await createMessage(lineId, currentPoint);
    return replyTextMessage(event.replyToken, output);
  }
  return Promise.resolve(null);
};
