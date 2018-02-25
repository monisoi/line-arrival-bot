import request from 'request-promise-native';

// export default async () => {
//   const key = process.env.GEOLOCATION_API_KEY;
//   const options = {
//     method: 'POST',
//     uri: `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
//     json: true,
//     body: {
//       homeMobileCountryCode: 310,
//       homeMobileNetworkCode: 410,
//       radioType: 'lte',
//       considerIp: 'true',
//     },
//   };
//   try {
//     const body = await request(options);
//     const { location } = body;
//     console.log(`location: ${JSON.stringify(location)}`);
//     return location;
//   } catch (e) {
//     console.log(`google maps geolocation api error: ${e}`);
//     return null;
//   }
// };

export default () => {
  if (!navigator.geolocation) {
    console.log('cannot use navigator.geolocation api on this device');
    return null;
  }

  const successFunc = position => {
    const { latitude, longitude } = position.coords;
    return { lat: latitude, lng: longitude };
  };

  return navigator.geolocation.getCurrentPosition(successFunc, e => {
    console.log(`navigator.geolocation api error: ${e}`);
    return null;
  });
};
