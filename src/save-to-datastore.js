import datastore from './datastore';

// lineId must be in data
export default async (kind, data) => {
  const { lineId = '' } = data || {};
  console.log(`lineId: ${lineId}`);
  const key = datastore.key([kind, lineId]);
  try {
    await datastore.upsert({ key, data });
  } catch (e) {
    console.log('datastore upsert error: %o', e);
  }
  return null;
};
