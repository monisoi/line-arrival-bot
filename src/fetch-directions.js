import request from 'request-promise-native';

export default async (origin, destination) => {
  console.log(`origin: ${origin}, destination: ${destination}`);
  const key = process.env.DIRECTIONS_API_KEY;
  const options = {
    method: 'GET',
    uri: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`,
    json: true,
  };
  try {
    const body = await request(options);
    if (body.status === 'ZERO_RESULTS') return {};
    const distance = body.routes[0].legs[0].distance.text;
    const duration = body.routes[0].legs[0].duration.text;
    return { distance, duration };
  } catch (e) {
    console.log(`google directions api error: ${e}`);
    return null;
  }
};
