const Rule = require('../models/Rule');
const { parseRule, evaluateAST, combineASTs } = require('../utils/ruleParser');

// Create a rule
exports.createRule = async (req, res) => {
  try {
    const { name, ruleString } = req.body;
    const ast = parseRule(ruleString);
    const rule = new Rule({
      name,
      ruleString,
      ast,
    });
    await rule.save();
    res.status(201).json({ message: 'Rule created successfully' });
  } catch (error) {
    console.error('Error creating rule:', error);
    res.status(400).json({ message: 'Error creating rule', error: error.message });
  }
};

// Evaluate a rule
exports.evaluateRule = async (req, res) => {
  try {
    const { ruleIds, data } = req.body;

    const rules = await Rule.find({ _id: { $in: ruleIds } });

    if (rules.length === 0) {
      return res.status(404).json({ message: 'No rules found to evaluate' });
    }

    // Combine ASTs if more than one rule is selected
    let combinedAST = rules.length > 1 ? combineASTs(rules.map(rule => rule.ast)) : rules[0].ast;

    const result = evaluateAST(combinedAST, data);
    res.json({
      message: 'Rule evaluated successfully',
      result,
    });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(400).json({ message: 'Error evaluating rule', error: error.message });
  }
};

// Get all rules
exports.getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(400).json({ message: 'Error fetching rules', error: error.message });
  }
};

// Combine rules
exports.combineRules = async (req, res) => {
  try {
    const { ruleIds } = req.body;
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    if (rules.length === 0) {
      return res.status(404).json({ message: 'No rules found to combine' });
    }

    const combinedAST = combineASTs(rules.map(rule => rule.ast));
    res.json({
      message: 'Rules combined successfully',
      combinedAST,
    });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(400).json({ message: 'Error combining rules', error: error.message });
  }
};
