import datastore from './datastore';

export default async (kind, params) => {
  const { key, operator, value } = params;
  const query = datastore.createQuery(kind).filter(key, operator, value);
  try {
    const queryResult = await datastore.runQuery(query);
    console.log('queryResult: %o', queryResult);
    return queryResult[0];
  } catch (e) {
    console.log('datastore error: %o', e);
    return null;
  }
};
