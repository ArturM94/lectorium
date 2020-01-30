export const authConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'SeCrEtJwT',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
};
