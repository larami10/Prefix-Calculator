// Testing calc() using non-nested expressions
console.log("TESTING calc() non-nested expresions");
var c = new Calc();

// Expressions used to call c.calc() function
console.log('Expresion passed to Prefix Calculator: {"op":"add", "number": 5}');
console.log("return: " + c.calc('{"op":"add", "number": 5}')); // returns 5 (assumes a starting init value of 0)

console.log(
  '\nExpresion passed to Prefix Calculator: {"op":"subtract", "number": 2}'
);
console.log("return: " + c.calc('{"op":"subtract", "number": 2}')); // returns 3 (5-2)

console.log(
  '\nExpresion passed to Prefix Calculator: {"op":"add", "number": 19}'
);
console.log("return: " + c.calc('{"op":"add", "number": 19}')); // returns 22 (19+3)

console.log("\n\n\n");

// Testing exec() function using non-nested expressions
console.log("TESTING exec() using non-nested expressions");

// expA is array of expressions used for testing the calc function
var expA = [
  { exp: { op: "add", number: 0 }, expected: 0 },
  { exp: { op: "add", number: -1 }, expected: -1 },
  { exp: { op: "subtract", number: -1 }, expected: 0 },
  { exp: { op: "add", number: 5 }, expected: 5 },
  { exp: { op: "subtract", number: 10 }, expected: -5 },
  { exp: { op: "add", number: 15 }, expected: 10 },
];

// call exec(expA)
exec(expA);

console.log("\n\n\n");

// Testing calc() function with nested expressions
console.log("TESTING calc using nested expressions (expr)");

console.log(
  'Expresion passed to Prefix Calculator: {"op": "subtract", "expr" : {"op" : "add", "number" : 15}}'
);
console.log(
  "return: " +
    c.calc('{"op": "subtract", "expr" : {"op" : "add", "number" : 15}}')
); // returns 0 (22+15 = 37, then 37-37=0)

console.log(
  '\nExpresion passed to Prefix Calculator: {"op": "add", "expr" : {"op" : "add", "expr" : {"op" : "subtract", "number" : 3}}}'
);
console.log(
  "return: " +
    c.calc(
      '{"op": "add", "expr" : {"op" : "add", "expr" : {"op" : "subtract", "number" : 3}}}'
    )
); // returns -12 (0-3=-3, -3+-3=-6, -6+-6=-12)

console.log("\n\n\n");

// Testing exec() function with nested expressions
console.log("TESTING exec() using nested expresions");

// expA is array of nested expressions used for testing the calc function
var expB = [
  { exp: { op: "subtract", expr: { op: "add", number: 15 } }, expected: 0 },
  {
    exp: {
      op: "add",
      expr: { op: "add", expr: { op: "subtract", number: 3 } },
    },
    expected: -12,
  },
];

// call exec(expA) for nested expressions (expr)
exec(expB);

console.log("\n\n\n");

// Testing PreCalc() function
console.log("TESTING stack. Printed stack is only for reference.");

var p = new PreCalc(0);

console.log(
  'Expresion passed to Prefix Calculator: {"op" : "add", "number" : 5}'
);
console.log(p.calc('{"op" : "add", "number" : 5}')); // returns 5 (5+0) but does not store the 5 on the stack. The stack remains [0])

console.log(
  '\nExpresion passed to Prefix Calculator: {"op" : "push", "number" : 5}'
);
console.log(p.calc('{"op" : "push", "number" : 5}')); // returns 5 and puts 5 on the stack [5 0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "pop"}');
console.log(p.calc('{"op" : "pop"}')); // returns 5 [0]

console.log(
  '\nExpresion passed to Prefix Calculator: {"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}'
);
console.log(
  p.calc('{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}}')
); // returns -2 and pushes -2 on top of the stack [-2 0]

console.log(
  '\nExpresion passed to Prefix Calculator: {"op" : "push", "expr" : {"op" : "add", "number" : 19}}'
);
console.log(p.calc('{"op" : "push", "expr" : {"op" : "add", "number" : 19}}')); // returns 17 (-2+19) and pushes 17 to the top of the stack [17 -2 0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "pop"}');
console.log(p.calc('{"op" : "pop"}')); // returns 17 and removes it from the stack [-2 0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "print"}');
console.log("print: " + p.calc('{"op" : "print"}')); // prints [-2 0]

console.log(
  '\nExpresion passed to Prefix Calculator: {"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}'
);
console.log(
  p.calc('{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}}}')
); // returns -2 (-2 + 0) [-2 0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "print"}');
console.log("print: " + p.calc('{"op" : "print"}')); // prints [-2 0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "pop"}');
console.log(p.calc('{"op" : "pop"}')); // returns -2 [0]

console.log('\nExpresion passed to Prefix Calculator: {"op" : "pop"}');
console.log(p.calc('{"op" : "pop"}')); // returns 0 []

console.log('\nExpresion passed to Prefix Calculator: {"op" : "pop"}');
console.log(p.calc('{"op" : "pop"}')); // returns (what? You have an empty stack now)

console.log("\n\n\n");

// Testing exec() function
console.log(
  "TESTING exec() using stack. expected is the return value, stack is only for reference"
);

var expC = [
  { exp: { op: "add", number: 5 }, expected: 5 },
  { exp: { op: "push", number: 5 }, expected: 5 },
  { exp: { op: "pop" }, expected: 5 },
  { exp: { op: "push", expr: { op: "subtract", number: 2 } }, expected: -2 },
  { exp: { op: "push", expr: { op: "add", number: 19 } }, expected: 17 },
  { exp: { op: "pop" }, expected: 17 },
  { exp: { op: "print" }, expected: "[ -2 0 ]" },
  {
    exp: { op: "push", expr: { op: "add", expr: { op: "pop" } } },
    expected: -2,
  },
  { exp: { op: "print" }, expected: "[ - 2 0 ]" },
  { exp: { op: "pop" }, expected: -2 },
  { exp: { op: "pop" }, expected: 0 },
  { exp: { op: "pop" }, expected: "The stack is empty!" },
];
exec(expC);
