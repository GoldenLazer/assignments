const display = document.getElementById("display");
let current = "0";
let prev = "";
let operator = null;

function updateDisplay() {
  display.textContent = current;
}

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-number");

    if (current === "0" && value !== ".") {
      current = value;
    } else if (value === "." && current.includes(".")) {
      return;
    } else {
      current += value;
    }
    updateDisplay();
  });
});

document.querySelectorAll("[data-operator]").forEach(button => {
  button.addEventListener("click", () => {
    if (current === "") return;
    prev = current;
    operator = button.getAttribute("data-operator");
    current = "";
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (!operator || current === "") return;

  const a = parseFloat(prev);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b !== 0 ? a / b : "Error";
      break;
  }

  current = result.toString();
  operator = null;
  prev = "";
  updateDisplay();
});

document.getElementById("clear").addEventListener("click", () => {
  current = "0";
  prev = "";
  operator = null;
  updateDisplay();
});

document.getElementById("plus-minus").addEventListener("click", () => {
  if (current !== "0") {
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
  }
});

document.getElementById("percent").addEventListener("click", () => {
  current = (parseFloat(current) / 100).toString();
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") {
    document.querySelector(`[data-number="${e.key}"]`)?.click();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    document.querySelector(`[data-operator="${e.key}"]`)?.click();
  } else if (e.key === "Enter") {
    document.getElementById("equals").click();
  } else if (e.key === "Escape") {
    document.getElementById("clear").click();
  }
});
