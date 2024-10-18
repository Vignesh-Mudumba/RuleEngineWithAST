const operators = ['AND', 'OR'];  // Supported logical operators

// Helper function to evaluate a condition
function evaluateCondition(attributeValue, operator, value) {
  switch (operator) {
    case '>': return attributeValue > value;
    case '<': return attributeValue < value;
    case '=': return attributeValue === value;
    default: throw new Error('Unsupported operator');
  }
}

// Parse rule string into AST structure
function parseRule(ruleString) {
  const tokens = tokenizeRule(ruleString);
  const ast = parseExpression(tokens);
  return ast;
}

// Tokenize the input rule string into components (conditions, operators, parentheses)
function tokenizeRule(ruleString) {
  const regex = /([()])|([<>]=?|=)|(\w+)|(".*?"|'.*?')|(\s+|AND|OR)/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(ruleString)) !== null) {
    if (!match[5]) { // Ignore whitespace matches
      tokens.push(match[0].trim());
    }
  }
  return tokens;
}

// Recursive parsing function to construct the AST based on precedence
function parseExpression(tokens) {
  let currentNode = parseTerm(tokens);

  while (tokens.length > 0 && tokens[0] === 'OR') {
    tokens.shift();  // Consume 'OR'
    const rightNode = parseTerm(tokens);
    currentNode = { type: 'OR', left: currentNode, right: rightNode };
  }

  return currentNode;
}

// Parse individual terms (handles AND operations)
function parseTerm(tokens) {
  let currentNode = parseFactor(tokens);

  while (tokens.length > 0 && tokens[0] === 'AND') {
    tokens.shift();  // Consume 'AND'
    const rightNode = parseFactor(tokens);
    currentNode = { type: 'AND', left: currentNode, right: rightNode };
  }

  return currentNode;
}

// Parse factors (handles parentheses and conditions)
function parseFactor(tokens) {
  if (tokens[0] === '(') {
    tokens.shift();  // Consume '('
    const node = parseExpression(tokens);
    if (tokens[0] === ')') {
      tokens.shift();  // Consume ')'
    } else {
      throw new Error('Mismatched parentheses');
    }
    return node;
  }

  return parseCondition(tokens);
}

// Parse individual conditions like 'age > 30'
function parseCondition(tokens) {
  const attribute = tokens.shift();  // E.g., 'age'
  const operator = tokens.shift();   // E.g., '>'
  const value = tokens.shift();      // E.g., '30'
  return { type: 'condition', value: { attribute, operator, number: parseValue(value) } };
}

// Helper to parse number or string values
function parseValue(value) {
  if (value.startsWith("'") || value.startsWith('"')) {
    return value.slice(1, -1);  // Remove quotes for strings
  }
  return parseFloat(value);  // Convert to number if applicable
}

// Evaluate the parsed AST against the input data
function evaluateAST(ast, data) {
  if (ast.type === 'AND') {
    return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
  } else if (ast.type === 'OR') {
    return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
  } else if (ast.type === 'condition') {
    const { attribute, operator, number } = ast.value;
    return evaluateCondition(data[attribute], operator, number);
  } else {
    throw new Error('Unknown AST node type');
  }
}

// Combine ASTs using AND logic
function combineASTs(asts) {
  if (asts.length === 0) return null;
  if (asts.length === 1) return asts[0];

  return asts.reduce((combined, ast) => ({
    type: 'AND',
    left: combined,
    right: ast,
  }));
}

module.exports = { parseRule, evaluateAST, combineASTs };
