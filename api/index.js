import { upsert, findBy } from 'mongofn';

const connectionString = process.env.API_MONGO_URL;
const databaseName = 'react-notepad';

export const findInMainDbBy = findBy(connectionString, databaseName);

export const upsertInMainDb = upsert(connectionString, databaseName);

const USERS = 'users';
const NOTES = 'notes';

export const findUsersBy = findInMainDbBy(USERS);
export const upsertUser = upsertInMainDb(USERS);

export const findNotesBy = findInMainDbBy(USERS);
export const upsertNote = upsertInMainDb(NOTES);
