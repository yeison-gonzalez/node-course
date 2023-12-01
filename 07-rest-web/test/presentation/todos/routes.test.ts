import request from 'supertest';
import { testServer } from '../../test-sever';

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  })

  afterAll(() => {
    testServer.close();
  })
  
  test('should return TODOs api/todos', async () => {
    const resposne = await request(testServer.app)
      .get('/api/todos')
      .expect(200); 
  });
});
