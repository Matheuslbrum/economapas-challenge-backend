import express from 'express';
import { registerUser, login } from './src/functions/users/index.js';
import { getGroups, deleteGroup, createGroup, searchGroup } from './src/functions/groups/index.js';

export const routes = express.Router();

routes.get('/:userId', getGroups);
routes.post('/', createGroup);
routes.post('/search', searchGroup);
routes.delete('/:groupId', deleteGroup);

routes.post('/register', registerUser);
routes.post('/login', login);