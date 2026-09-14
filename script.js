(function () {
  "use strict";

  const displayCurrent = document.getElementById("displayCurrent");
  const displayHistory = document.getElementById("displayHistory");
  const keysEl = document.getElementById("keys");
  const themeToggle = document.getElementById("themeToggle");
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const MAX_LEN = 12;

  let current = "0";
  let first = null;
  let operator = null;
  let waiting = false;
  let evaluated = false;

  function formatNumber(n) {
    if (typeof n === "string") return n;
    if (!isFinite(n)) return "Error";
    const rounded = parseFloat(n.toPrecision(12));
    const s = String(rounded);
    if (s.length <= 13) return s;
    return rounded.toExponential(6);
  }

  function compute(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  }

  function render(historyText) {
    displayCurrent.textContent = current;

    if (historyText !== undefined) {
      displayHistory.textContent = historyText;
    } else if (operator !== null && first !== null) {
      displayHistory.textContent = formatNumber(first) + " " + operator;
    } else {
      displayHistory.textContent = "";
    }
  }

  function inputDigit(d) {
    if (current === "Error" || evaluated) {
      current = d;
      first = null;
      operator = null;
      waiting = false;
      evaluated = false;
      render("");
      return;
    }
    if (waiting) {
      current = d;
      waiting = false;
    } else if (current === "0") {
      current = d;
    } else if (current.replace(/[-.]/g, "").length < MAX_LEN) {
      current += d;
    }
    render();
  }

  function inputDecimal() {
    if (current === "Error" || evaluated) {
      current = "0.";
      first = null;
      operator = null;
      waiting = false;
      evaluated = false;
      render("");
      return;
    }
    if (waiting) {
      current = "0.";
      waiting = false;
    } else if (!current.includes(".")) {
      current += ".";
    }
    render();
  }

  function chooseOperator(op) {
    if (operator !== null && !waiting) {
      const result = compute(first, parseFloat(current), operator);
      if (!isFinite(result)) {
        showError();
        return;
      }
      first = result;
      current = formatNumber(result);
    } else if (first === null) {
      first = parseFloat(current);
    }
    operator = op;
    waiting = true;
    evaluated = false;
    render();
  }

  function equals() {
    if (operator === null || first === null) return;

    const second = waiting ? first : parseFloat(current);
    const result = compute(first, second, operator);

    if (!isFinite(result)) {
      showError();
      return;
    }

    const historyText =
      formatNumber(first) + " " + operator + " " + formatNumber(second) + " =";

    current = formatNumber(result);
    first = null;
    operator = null;
    waiting = false;
    evaluated = true;

    render(historyText);
  }

  function clearAll() {
    current = "0";
    first = null;
    operator = null;
    waiting = false;
    evaluated = false;
    render("");
  }

  function deleteLast() {
    if (evaluated) {
      clearAll();
      return;
    }
    if (waiting || current === "Error") return;
    current = current.length > 1 ? current.slice(0, -1) : "0";
    if (current === "-" || current === "") current = "0";
    render();
  }

  function percent() {
    if (waiting || current === "Error") return;
    const val = parseFloat(current) / 100;
    current = formatNumber(val);
    render();
  }

  function toggleSign() {
    if (waiting || current === "Error" || current === "0") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
    render();
  }

  function showError() {
    current = "Error";
    first = null;
    operator = null;
    waiting = false;
    evaluated = false;
    render("");
  }

  function handleAction(action, value) {
    switch (action) {
      case "digit":
        inputDigit(value);
        break;
      case "decimal":
        inputDecimal();
        break;
      case "operator":
        chooseOperator(value);
        break;
      case "equals":
        equals();
        break;
      case "clear":
        clearAll();
        break;
      case "delete":
        deleteLast();
        break;
      case "percent":
        percent();
        break;
      case "sign":
        toggleSign();
        break;
    }
  }

  keysEl.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    handleAction(btn.dataset.action, btn.dataset.value);
  });

  function flash(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.classList.add("pressed");
    setTimeout(function () {
      el.classList.remove("pressed");
    }, 110);
  }

  document.addEventListener("keydown", function (e) {
    const k = e.key;

    if (/^[0-9]$/.test(k)) {
      inputDigit(k);
      flash('[data-action="digit"][data-value="' + k + '"]');
      return;
    }

    switch (k) {
      case ".":
      case ",":
        e.preventDefault();
        inputDecimal();
        flash('[data-action="decimal"]');
        break;

      case "+":
        chooseOperator("+");
        flash('[data-action="operator"][data-value="+"]');
        break;

      case "-":
        chooseOperator("−");
        flash('[data-action="operator"][data-value="−"]');
        break;

      case "*":
      case "x":
        chooseOperator("×");
        flash('[data-action="operator"][data-value="×"]');
        break;

      case "/":
        e.preventDefault();
        chooseOperator("÷");
        flash('[data-action="operator"][data-value="÷"]');
        break;

      case "Enter":
      case "=":
        e.preventDefault();
        equals();
        flash('[data-action="equals"]');
        break;

      case "Backspace":
        deleteLast();
        flash('[data-action="delete"]');
        break;

      case "Escape":
      case "Delete":
        clearAll();
        flash('[data-action="clear"]');
        break;

      case "%":
        percent();
        flash('[data-action="percent"]');
        break;
    }
  });

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
    if (metaThemeColor)
      metaThemeColor.setAttribute("content", isDark ? "#262a33" : "#e8ebf0");
    try {
      localStorage.setItem("calc-theme", theme);
    } catch (_) {}
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem("calc-theme");
    } catch (_) {}

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  themeToggle.addEventListener("click", function () {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    setTheme(next);
  });

  initTheme();
  render("");
})();
