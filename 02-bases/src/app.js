// const { getUUID, getAge} = require('./plugins')
// const { emailTemplate } = require('./js-foundation/01-template')
// require('./js-foundation/02-destructuring')
// const { getUserById } = require('./js-foundation/03-callbacks')
// const { getUserById } = require('./js-foundation/04-arrow')
// const { buildMakePerson } = require('./js-foundation/05-factory')
const getPokemonById = require('./js-foundation/06-promises')

/*
const id = 1

getUserById(id, (error, user) => {
    if (error) throw new Error(error)

    console.log({ user })
})
*/

/*
const makePerson = buildMakePerson({ getUUID, getAge })
const obj = { name: 'John', birthdate: '2001-04-24' }
const jhon = makePerson(obj)
console.log({ jhon })
 */


getPokemonById(1)
    .then(pokemon => console.log(pokemon))
    .catch(err => console.log('Please try again'))
    .finally(() => console.log('Finally'))
