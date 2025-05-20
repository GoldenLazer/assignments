function toggleCalculator() {
  const calc = document.getElementById("calculatorContainer");
  calc.style.display = calc.style.display === "none" || calc.style.display === "" ? "block" : "none";
}

const display = document.getElementById("display");
let currentInput = "0";
let operator = null;
let firstOperand = null;

function updateDisplay() {
  display.textContent = currentInput;
}

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () => {
    if (currentInput === "0" && button.dataset.number !== ".") {
      currentInput = button.dataset.number;
    } else {
      if (button.dataset.number === "." && currentInput.includes(".")) return;
      currentInput += button.dataset.number;
    }
    updateDisplay();
  });
});

document.querySelectorAll("[data-operator]").forEach(button => {
  button.addEventListener("click", () => {
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
    } else {
      firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
      updateDisplay();
    }
    operator = button.dataset.operator;
    currentInput = "0";
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (operator && firstOperand !== null) {
    currentInput = operate(firstOperand, parseFloat(currentInput), operator).toString();
    updateDisplay();
    firstOperand = null;
    operator = null;
  }
});

document.getElementById("clear").addEventListener("click", () => {
  currentInput = "0";
  operator = null;
  firstOperand = null;
  updateDisplay();
});

document.getElementById("plus-minus").addEventListener("click", () => {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
});

document.getElementById("percent").addEventListener("click", () => {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
});

function operate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}
