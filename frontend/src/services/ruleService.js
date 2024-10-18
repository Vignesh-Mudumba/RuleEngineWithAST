import axios from 'axios';

export const createRule = async (ruleString) => {
  const response = await axios.post('/api/rules/create', { ruleString });
  return response.data;
};

export const evaluateRule = async (ruleId, data) => {
  const response = await axios.post('/api/rules/evaluate', { ruleId, data });
  return response.data;
};
