function getMathStatus(math) {

  const constants = ["pi", "e", "sqrt2", "In2", "In10"];
  const functions = ["sin", "cos", "tg", "ctg", "tan", "cot", "sinh", "cosh", "th", "cth"];
  const operators = ["*", "/", "-", "+"];
  const leftParenthesis = "(";
  const rightParenthesis = ")";

  let tokens = new Array();
  let i = 0;
  const len = math.length;

  //проверка на цифры и латинские буквы
  function isLetter(c) {

    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
  }
  function isDigit(c) {

    return c >= '0' && c <= '9';
  }

  //проверка на перменную
  function isVarChar(c) {

    return isLetter(c) || isDigit(c) || c === '_';
  }

  while (i < len) {

    let c = math[i];

    //пропуск пробелов
    if (c === ' ') {

      i++;
      continue;
    }

    //операторы
    if (operators.includes(c)) {

      tokens.push({ type: "operator", span: [i, i+1] });
      i++;
      continue;
    }

    //скобки ()
    if (c === leftParenthesis) {

      tokens.push({ type: "left_parenthesis", span: [i, i+1] });
      i++;
      continue;
    }
    if (c === rightParenthesis) {

      tokens.push({ type: "right_parenthesis", span: [i, i+1] });
      i++;
      continue;
    }

    //число (integer or float, без знака, с точкой)
    if (isDigit(c) || c === '.') {

      let start = i;
      let dotCount = 0;

      if (c === '.') dotCount = 1;

      i++;

      while (i < len) {

        let ch = math[i];

        if (isDigit(ch)) {

          i++;
        } 
        else if (ch === '.') {

          if (dotCount === 1) break; //больше одной точки нельзя
          dotCount++;
          i++;
        } 
        else {

          break;
        }
      }

      tokens.push({ type: "number", span: [start, i] });
      continue;
    }

    //константа или функция или переменная (начинается с буквы)
    if (isLetter(c)) {

      let start = i;
      i++;

      while (i < len && isVarChar(math[i])) {

        i++;
      }

      let word = math.slice(start, i);

      //проверим константу (чувствительна к регистру, поэтому exact)
      if (constants.includes(word)) {

        tokens.push({ type: "constant", span: [start, i] });
        continue;
      }

      //проверим функцию
      if (functions.includes(word)) {

        tokens.push({ type: "function", span: [start, i] });
        continue;
      }

      //иначе переменная
      tokens.push({ type: "variable", span: [start, i] });
      continue;
    }

    //если не попали ни в одно условие - просто сдвинем индекс, чтобы избежать зацикливания
    i++;
  }

  return tokens;
}
