// Get elements
const inputNum = document.getElementById('inputNum');
const result = document.getElementById('result');
const buttons = document.querySelectorAll('td');

let currentInput = '';
let calculated = false;

// Live calculate result and handle special cases
function liveCalculate() {
    try {
        let exp = currentInput.replace(/➗/g, '/')
                              .replace(/✖️/g, '*')
                              .replace(/−/g, '-')
                              .replace(/–/g, '-')
                              .replace(/%/g, '/100*')
                              .replace(/÷/g, '/')
                              .replace(/×/g, '*');
        let res = eval(exp);
        if (res === Infinity || res === -Infinity) {
            result.innerText = 'Cannot divide by zero';
            result.classList.remove('blur');
        } else if (isNaN(res)) {
            result.innerText = '';
            result.classList.remove('blur');
        } else {
            result.innerText = res;
            result.classList.add('blur');
        }
    } catch {
        result.innerText = '';
        result.classList.remove('blur');
    }
}

// Helper function: inputNum-এ অপারেটর symbol রিপ্লেস করে দেখানো
function displayInput(str) {
    inputNum.innerText = str
        .replace(/➗/g, '/')
        .replace(/✖️/g, '*');
    liveCalculate();
}

// Button click handler
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        const val = this.innerText.trim();

        if (this.id === 'AC') {
            currentInput = '';
            displayInput('');
            result.innerText = '';
            result.classList.remove('blur');
            calculated = false;
        } else if (val === '🔙' || val === 'BACK') {
            currentInput = currentInput.slice(0, -1);
            displayInput(currentInput);
        } else if (val === '=') {
            try {
                let exp = currentInput.replace(/➗/g, '/')
                                      .replace(/✖️/g, '*')
                                      .replace(/−/g, '-')
                                      .replace(/–/g, '-')
                                      .replace(/%/g, '/100*')
                                      .replace(/÷/g, '/')
                                      .replace(/×/g, '*');
                let res = eval(exp);
                if (res === Infinity || res === -Infinity) {
                    result.innerText = 'Cannot divide by zero';
                } else if (isNaN(res)) {
                    result.innerText = 'Invalid input';
                } else {
                    result.innerText = res;
                }
                result.classList.remove('blur');
                calculated = true;
            } catch {
                result.innerText = 'Invalid input';
                result.classList.remove('blur');
            }
        } else if (['+', '-', '✖️', '➗', '%'].includes(val)) {
            if (currentInput && !/[+\-✖️➗%]$/.test(currentInput)) {
                currentInput += val;
                displayInput(currentInput);
            }
        } else {
            if (calculated) {
                currentInput = '';
                result.innerText = '';
                calculated = false;
            }
            currentInput += val;
            displayInput(currentInput);
        }
    });
});

// Keyboard support & bracket support
document.addEventListener('keydown', function (e) {
    const allowed = /[0-9+\-*/().%]/;
    if (allowed.test(e.key)) {
        if (calculated) {
            currentInput = '';
            result.innerText = '';
            calculated = false;
        }
        if (e.key === '*') {
            currentInput += '✖️';
        } else if (e.key === '/') {
            currentInput += '➗';
        } else {
            currentInput += e.key;
        }
        displayInput(currentInput);
    } else if (e.key === 'Enter' || e.key === '=') {
        try {
            let exp = currentInput.replace(/➗/g, '/')
                                  .replace(/✖️/g, '*')
                                  .replace(/−/g, '-')
                                  .replace(/–/g, '-')
                                  .replace(/%/g, '/100*')
                                  .replace(/÷/g, '/')
                                  .replace(/×/g, '*');
            let res = eval(exp);
            if (res === Infinity || res === -Infinity) {
                result.innerText = 'Cannot divide by zero';
            } else if (isNaN(res)) {
                result.innerText = 'Invalid input';
            } else {
                result.innerText = res;
            }
            result.classList.remove('blur');
            calculated = true;
        } catch {
            result.innerText = 'Invalid input';
            result.classList.remove('blur');
        }
    } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        displayInput(currentInput);
    } else if (e.key === 'Escape') {
        currentInput = '';
        displayInput('');
        result.innerText = '';
        result.classList.remove('blur');
        calculated = false;
    }
});