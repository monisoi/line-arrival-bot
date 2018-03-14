import datastore from './datastore';

// lineId must be in data
export default async (kind, lineId) => {
  console.log(`lineId: ${lineId}`);
  const key = datastore.key([kind, lineId]);
  try {
    await datastore.delete(key);
  } catch (e) {
    console.log('datastore delete error: %o', e);
  }
  return null;
};
