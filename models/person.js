const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log(result)
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2}-\d{6}\d*$/.test(v) || /^\d{3}-\d{5}\d*$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number. It must contain 8 numbers, with a dash between the second and third or third and fourth number`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
