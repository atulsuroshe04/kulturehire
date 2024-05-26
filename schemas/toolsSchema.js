const mongoose = require('mongoose');

const toolsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required !'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});
// toolsSchema.plugin(validator,{message:'Email address already exists !'})
module.exports = toolsSchema;
