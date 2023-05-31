var check = true;

/* PreCalc object that takes a number to
 * set size of empty array used to create
 * a stack of calculated expresions.
 */
class PreCalc {
  constructor(number) {
    // set this.calcStack to array of size number
    this.calcStack = new Array();
    // set this.count to number
    this.count = number;
    // initialize the first element to 0
    this.calcStack[this.count] = number;
    // set this.top = 0 to use for calculations
    this.top = 0;
    // use popped to hold popped value
    this.popped;
    // use isPopped to check if a pop exists
    this.isPopped;
    //use isPrint to check if print exists in expression
    this.isPrint;

    // this.calc contains all calculations made from entered expressions
    this.calc = function (str) {
      this.popped = 0; // no pop exists yet if any
      this.isPopped = false; // a pop has not been made
      this.isPrint = false; // no print exists yet if any

      // obj is set to parsed JSON object
      var obj = JSON.parse(str);

      // create empty array
      var array = [];

      // check if nested expressions exist
      while (check) {
        // add obj to the array
        array.push(obj);

        // set obj to the returned object of checkExpr
        obj = checkExpr(obj);
      }

      // parse JSON obj
      obj = JSON.parse(obj);

      // loop backwards through array to call nested (if any) expressions in order
      for (var i = array.length - 1; i >= 0; i--) {
        // if key is expr
        if (array[i].expr) {
          // delete expr key and value
          delete array[i].expr;
          // add number key and set this.top to it's value
          array[i].number = this.top;
        }

        // if op is push
        if (array[i].op === "push") {
          // sets count to top element
          this.count++;

          // add number value to top of stack
          push(this.calcStack, this.count, array[i].number);

          // current this.top equals number value
          this.top = array[i].number;
          // else if op is pop
        } else if (array[i].op === "pop") {
          // pop now exists, set isPopped to true
          this.isPopped = true;
          // set popped variable to current top value
          this.popped = this.calcStack[this.count];
          // pop top value from stack
          pop(this.calcStack, this.count);
          // set count to new stack index (decrement array index)
          this.count--;
          // set this.top to new top value
          this.top = this.calcStack[this.count];
          // else if op is add
        } else if (array[i].op === "add") {
          // add current top value to new number value and popped value (if any)
          this.top += array[i].number + this.popped;
          // else if op is subtract
        } else if (array[i].op == "subtract") {
          // subtract current top value to new number value and popped value (if any)
          this.top -= array[i].number + this.popped;
          // else if op is print
        } else if (array[i].op === "print") {
          // set this.isPrint to true
          this.isPrint = true;
        }
      }
      // set check to true to ready next expression
      check = true;

      // if this.isPopped is true
      if (this.isPopped === true) {
        if (this.popped === undefined) {
          return "The stack is empty!";
        } else {
          // return the popped value and print current stack
          return "return: " + this.popped + "\nstack: " + print(this.calcStack);
        }
        // if this.isPrint is true
      } else if (this.isPrint === true) {
        // print the current stack only, no return value since expression was not evaluated
        return print(this.calcStack);
        // else
      } else {
        // return this.top value and print the current stack
        return "return: " + this.top + "\nstack: " + print(this.calcStack);
      }
    };

    // Use push function to add (push) value to array (stack)
    var push = function (arr, count, number) {
      arr[count] = number;
    };

    // use pop function to take out (pop) value from array (stack)
    var pop = function (arr, count) {
      arr[count] = undefined;
      return arr;
    };

    // use print function to look through array and print the current stack
    var print = function (arr) {
      var text = "[ ";
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== undefined) {
          text += arr[i] + " ";
        }
      }
      text += "]";
      return text;
    };
  }
}

/* Check if nested expressions exist.
 */
function checkExpr(str) {
  // set obj to JSON object
  var obj = JSON.stringify(str);

  // if nested expression exist
  if (str.expr) {
    // parse out the expr and set to obj
    obj = JSON.parse(obj).expr;
  } else {
    // else set check to false to indicate no nested expression exists
    check = false;
  }

  // return obj
  return obj;
}

/* Take an array of JSON objects that goes
 * through the calc function to return a value
 * and check if the expected result is returned.
 */
this.exec = function (expA) {
  // Create Calc object
  var c = new PreCalc(0);

  // loop through expressions in expA array
  for (let i = 0; i < expA.length; i++) {
    console.log("Expression being tested: " + JSON.stringify(expA[i].exp));

    // call c.calc() to verify that the return value is equal to the expected value
    console.log(
      "expected: " +
        expA[i].expected +
        "\n" +
        c.calc(JSON.stringify(expA[i].exp)) +
        "\n"
    );
  }
};

/* Parse JSON objects to add or subtract
 * a current value initialized at 0 depending
 * on the op key value.
 */
class Calc {
  constructor() {
    // this.total initialized at 0
    this.total = 0;

    // this.calc will parse JSON objects to calculate regular and nested expressions
    this.calc = function (str) {
      // obj holds the parsed JSON object
      var obj = JSON.parse(str);
      // create empty array
      var array = [];

      // check if nested expressions exist
      while (check) {
        // add obj to the array
        array.push(obj);

        // set obj to the returned object of checkExpr
        obj = checkExpr(obj);
      }

      // parse obj
      obj = JSON.parse(obj);

      // loop backwards through array
      for (var i = array.length - 1; i >= 0; i--) {
        // if current key is expr
        if (array[i].expr) {
          // delete expr key and value
          delete array[i].expr;
          // add number key and set value to this.total (current total)
          array[i].number = this.total;
        }

        // find the op value to add or subtract from current this.total
        if (array[i].op === "add") {
          this.total += array[i].number;
        } else if (array[i].op == "subtract") {
          this.total -= array[i].number;
        }
      }

      // set check to true to ready next expression
      check = true;

      // return this.total
      return this.total;
    };
  }
}
