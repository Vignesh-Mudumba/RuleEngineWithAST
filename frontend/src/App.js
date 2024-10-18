import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');
  const [evaluationData, setEvaluationData] = useState({ age: '', department: '', experience: '' });
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [rules, setRules] = useState([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setMessage('Error fetching rules');
    }
  };

  const createRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/create', {
        name: ruleName,
        ruleString: ruleString,
      });
      setMessage(response.data.message);
      setRuleName('');
      setRuleString('');
      fetchRules(); // Refresh the rules list
    } catch (error) {
      setMessage('Error creating rule: ' + (error.response?.data?.message || error.message));
    }
  };

  const evaluateRule = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/evaluate', {
        ruleIds: selectedRuleIds,
        data: evaluationData,
      });
      setEvaluationResult(response.data.result);
    } catch (error) {
      setMessage('Error evaluating rule: ' + error.message);
    }
  };

  const combineRules = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rules/combine', {
        ruleIds: selectedRuleIds,
      });
      console.log(response.data.combinedAST);
    } catch (error) {
      setMessage('Error combining rules: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <h2>Create Rule</h2>
      <input
        type="text"
        placeholder="Rule Name"
        value={ruleName}
        onChange={(e) => setRuleName(e.target.value)}
      />
      <textarea
        placeholder="Rule String (e.g., age > 30 AND department = 'Sales')"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
      />
      <button onClick={createRule}>Create Rule</button>

      <h2>Select Rules to Combine</h2>
      {rules.map((rule) => (
        <div key={rule._id}>
          <input
            type="checkbox"
            checked={selectedRuleIds.includes(rule._id)}
            onChange={() =>
              setSelectedRuleIds((prev) =>
                prev.includes(rule._id) ? prev.filter((id) => id !== rule._id) : [...prev, rule._id]
              )
            }
          />
          {rule.name}
        </div>
      ))}
      <button onClick={combineRules}>Combine Selected Rules</button>

      <h2>Evaluate Rules</h2>
      <input
        type="text"
        placeholder="Age"
        value={evaluationData.age}
        onChange={(e) => setEvaluationData({ ...evaluationData, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        value={evaluationData.department}
        onChange={(e) => setEvaluationData({ ...evaluationData, department: e.target.value })}
      />
      <input
        type="text"
        placeholder="Experience"
        value={evaluationData.experience}
        onChange={(e) => setEvaluationData({ ...evaluationData, experience: e.target.value })}
      />
      <button onClick={evaluateRule}>Evaluate Rules</button>

      {message && <p>{message}</p>}
      {evaluationResult !== null && <p>Evaluation Result: {evaluationResult ? 'True' : 'False'}</p>}
    </div>
  );
}

export default App;
