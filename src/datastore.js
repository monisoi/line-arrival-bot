import Datastore from '@google-cloud/datastore';
import { GCP_PROJECT_ID } from './config';

const projectId = GCP_PROJECT_ID;

export default Datastore({
  projectId,
});
