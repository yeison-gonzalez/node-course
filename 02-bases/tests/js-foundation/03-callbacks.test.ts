import { getUserById } from '../../src/js-foundation/03-callbacks'

describe('js-foundation/03-callbacks.ts', () => {
  it('get user by id should return an error if user does not exist', () => {
    const id = 3
    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`)
      expect(user).toBeUndefined()
    })
  })

  it('getUserById should return John Doe', () => {
    const id = 1
    getUserById(id, (err, user) => {
      expect(err).toBeUndefined()
      expect(user).toEqual({
        id: 1,
        name: 'John Doe'
      })
    })
  })
})
