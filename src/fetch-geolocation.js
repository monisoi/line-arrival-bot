import request from 'request-promise-native';

export default async () => {
  const key = process.env.GEOLOCATION_API_KEY;
  const uri = `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`;
  try {
    const body = await request({ uri, json: true });
    const { location } = body;
    return location;
  } catch (e) {
    console.log(`google maps geolocation api error: ${e}`);
    return null;
  }
};
