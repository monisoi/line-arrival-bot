import request from 'request-promise-native';
import { GEOLOCATION_API_KEY } from './config';

export default async () => {
  const key = GEOLOCATION_API_KEY;
  const options = {
    method: 'POST',
    uri: `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
    json: true,
    body: {
      homeMobileCountryCode: 440,
      radioType: 'lte',
      considerIp: 'true',
    },
  };
  try {
    const body = await request(options);
    const { location } = body;
    console.log(`location: ${JSON.stringify(location)}`);
    return location;
  } catch (e) {
    console.log(`google maps geolocation api error: ${e}`);
    return null;
  }
};
