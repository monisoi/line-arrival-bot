import request from 'request-promise-native';

export default async () => {
  const key = process.env.GEOLOCATION_API_KEY;
  // const uri = `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`;
  const options = {
    method: 'POST',
    uri: `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
    json: true,
    headers: {
      Authorization: 'application/json',
    },
  };
  try {
    const body = await request(options);
    const { location } = body;
    return location;
  } catch (e) {
    console.log(`google maps geolocation api error: ${e}`);
    return null;
  }
};
