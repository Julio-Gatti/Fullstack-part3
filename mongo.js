const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ha5tua5.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`Added ${name} ${number} to the phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  console.log('Invalid number of arguments')
  process.exit(1)
}
