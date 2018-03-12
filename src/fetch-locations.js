import datastore from './datastore';

export default async lineId => {
  const query = datastore.createQuery('locations').filter('lineId', '=', lineId);
  const queryResult = await datastore.runQuery(query);
  console.log('queryResult: %o', queryResult);
  return queryResult;
};
