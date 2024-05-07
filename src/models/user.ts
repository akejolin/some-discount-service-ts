import bcrypt from 'bcryptjs';

import { User, Model } from '../types/dataTypes'

export default {
  name: 'users',
  model: {
    id: 0,
    username: 'testy',
    email: 'testy@testy.com',
    password: bcrypt.hashSync('abc123', 8),
  } as User
};