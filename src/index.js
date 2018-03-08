import handleEvent from './handle-event';

export default async (req, res) => {
  console.log('start line bot function');
  const { body } = req;
  const event = body.events[0];
  try {
    await handleEvent(event);
  } catch (e) {
    console.log('error: %o', e);
  }
  res.send(200);
};
