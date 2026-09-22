const container = document.querySelector('.container');
const display = container.querySelector('.display');
const buttons = container.querySelectorAll('button');

let firstValue = 0;
let secondValue = 0;
let operator = null;
let subValue = false;

function sum(value1, value2) {
  return value1 + value2;
}

function subtract(value1, value2) {
  return value1 - value2;
}

function multiply(value1, value2) {
  return value1 * value2;
}

function divide(value1, value2) {
  if (value2 === 0) {
    return 'Erro!';
  }
  return value1 / value2;
}

function operate(operator, value1, value2) {
  let result;
  if (operator === '+') {
    result = sum(value1, value2);
  } else if (operator === '-') {
    result = subtract(value1, value2);
  } else if (operator === '×') {
    result = multiply(value1, value2);
  } else if (operator === '÷') {
    result = divide(value1, value2);
  } else {
    return 'Operador inválido';
  }

  if (typeof result === 'number') {
    return Math.round(result * 100000) / 100000;
  }
  return result;
}

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.textContent.trim();

    if (!isNaN(Number(value)) && value !== '') {
      if (subValue || display.textContent === '0') {
        display.textContent = value;
        subValue = false;
      } else {
        if (display.textContent.length < 12) {
          display.textContent += value;
        }
      }
    }

    if (['+', '-', '×', '÷'].includes(value)) {
      if (operator !== null && !subValue) {
        secondValue = Number(display.textContent);
        const result = operate(operator, firstValue, secondValue);
        display.textContent = result;
        firstValue = typeof result === 'number' ? result : 0;
      } else {
        firstValue = Number(display.textContent);
      }
      operator = value;
      subValue = true;
    }
    
    if (value === '=') {
      if (operator !== null) {
        secondValue = Number(display.textContent);
        const result = operate(operator, firstValue, secondValue);
        display.textContent = result;
        firstValue = typeof result === 'number' ? result : 0;
        operator = null;
        subValue = true;
      }
    }

    if (value === 'C') {
      display.textContent = '0';
      firstValue = 0;
      secondValue = 0;
      operator = null;
      subValue = false;
    }

    if (value === '.') {
      if (subValue) {
        display.textContent = '0.';
        subValue = false;
      } else if (!display.textContent.includes('.')) {
        display.textContent += '.';
      }
    }

    if (value === '%') {
      const currentValue = Number(display.textContent);
      display.textContent = currentValue / 100;
    }

    if (value === 'x' || value === 'X') {
      if (subValue || display.textContent.length === 1 || display.textContent === '0') {
        display.textContent = '0';
      } else {
        display.textContent = display.textContent
          .slice(0, -1);
      }
    }
  });
});
