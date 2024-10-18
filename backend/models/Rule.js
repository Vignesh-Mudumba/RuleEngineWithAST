const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Rule name
  ruleString: { type: String, required: true },
  ast: { type: Object, required: true }, // Store AST structure
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rule', ruleSchema);
