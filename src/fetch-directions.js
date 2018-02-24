import request from 'request-promise-native';

export default async (origin, destination) => {
  const key = process.env.DIRECTIONS_API_KEY;
  const uri = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  try {
    const body = await request({ uri, json: true });
    const distance = body.routes[0].legs[0].distance.text;
    const duration = body.routes[0].legs[0].duration.text;
    return { distance, duration };
  } catch (e) {
    console.log(`google directions api error: ${e}`);
    return null;
  }
};
