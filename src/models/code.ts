import { Code, Model } from '../types/dataTypes'

export default {
  name: 'codes',
  model: {
    id: 0,
    code: 'abc123',
    desc: '20% off',
    rate: 0.2,
    target: ['*'],
    isUsed: false,
  } as Code
} as Model;