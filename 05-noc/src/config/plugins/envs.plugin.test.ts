import { envs } from "./envs.plugin"

describe('envs.plugin.ts', () => {
  it('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'yeisondavidgonzalezloaiza@gmail.com',
      MAILER_SECRET_KEY: 'lnfsetsdeuhghzuj',
      MONGO_URL: 'mongodb://test:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'test',
      MONGO_PASS: '123456',
      POSTGRES_URL: 'postgresql://test:123456@localhost:5432/NOC-TEST',
      POSTGRES_USER: 'test',
      POSTGRES_DB: 'NOC-TEST',
      POSTGRES_PASSWORD: '123456'
    });
  })

  it('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC'

    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})
