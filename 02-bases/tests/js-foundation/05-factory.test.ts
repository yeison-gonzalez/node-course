import { buildMakePerson } from '../../src/js-foundation/05-factory'

describe('js-foundation/05-factory.ts', () => {
  const getUUID = () => '1234';
  const getAge = () => 35;

  it('buildMakePerson should return a function', () => {
    const makePerson = buildMakePerson({ getUUID, getAge })
    expect(typeof makePerson).toBe('function')
  })

  it('makePerson should return a person', () => {
    const makePerson = buildMakePerson({ getUUID, getAge })
    const johnDoe = makePerson({ name: 'John Doe', birthdate: '1985-10-21' })

    expect(johnDoe).toEqual({
      id: '1234',
      name: 'John Doe',
      birthdate: '1985-10-21',
      age: 35
    })
  })
})
