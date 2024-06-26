
// populates the user's input into an array of tokens
function createTokens(userInput) {
  return userInput.split(' ').filter(token => token.length > 0);
}

/*
 
parses the tokens into a tree node structure. checks the first token in 
the array and removes it. If the token is an operator, it recursively 
calls parse on the left and right nodes. If the token is a number, it 
returns the value in the tree. If the token is neither an operator nor 
a number, it throws an error.

*/

function parse(tokens) {

  if (tokens.length === 0) {
    throw new Error('Invalid input');
  }
  
  const token = tokens.shift();
  
  if (isOperator(token)) {
    const left = parse(tokens);
    const right = parse(tokens);
    return { operator: token, left: left, right: right };
  } else if (isNumber(token)) {
    return { value: parseFloat(token) };
  } else {
    throw new Error(`Unexpected token: ${token}`);
  }
}

// define supported operators
function isOperator(token) {
  return ['+', '-', '*', '/'].includes(token);
}

// check if the token is a number
function isNumber(token) {
  return !isNaN(token);
}

// calculate the solution
function solve(node) {
  if (node.value !== undefined) {
    return node.value;
  }
  
  const left = solve(node.left);
  const right = solve(node.right);
  
  switch (node.operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
    default:
      throw new Error(`Unknown operator: ${node.operator}`);
  }
}

exports.calculate = function(userInput) {
  const tokens = createTokens(userInput);
  const tokenTree = parse(tokens);
  return solve(tokenTree);
};