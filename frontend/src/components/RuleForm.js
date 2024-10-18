import React, { useState } from 'react';
import { createRule } from '../services/ruleService';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRule = await createRule(ruleString);
    console.log('Rule created:', newRule);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule"
      />
      <button type="submit">Create Rule</button>
    </form>
  );
};

export default RuleForm;
