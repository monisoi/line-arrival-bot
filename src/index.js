import { isValidEvent } from './line-bot';
import handleEvent from './handle-event';

export default async (req, res) => {
  console.log('start line bot function');
  const signature = req.get('X-Line-Signature');
  const { body } = req;
  try {
    if (isValidEvent(signature, body)) {
      console.log('valid event');
      const event = body.events[0];
      await handleEvent(event);
    }
  } catch (e) {
    console.log('error: %o', e);
  }
  res.send(200);
};
