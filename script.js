const para = document.createElement('p');
const displaybottom = document.getElementById('display-bottom');
const displayTop = document.getElementById('display-top');
const selectNumberBtn = document.getElementsByClassName('number');
const selectDotBtn = document.getElementById('dot');
const selectNegativeBtn = document.getElementsByClassName('control__negative');
const selectClearBtn = document.getElementsByClassName('control__clear');
const selectDeleteBtn = document.getElementsByClassName('control__delete');
const selectOperatorBtn = document.getElementsByClassName('operator');
const selectEqualBtn = document.getElementById('equal');

let textTopArray = [0];
let textBottomArray;

displayTop.textContent = textTopArray.join('');

function displayText() {
  return (displayTop.textContent = textTopArray.join(''));
}

function displayTotal() {
  const totalArray = eval(textTopArray.join(''));
  displaybottom.textContent = totalArray;
  textBottomArray = totalArray;
}

function checkDotBtn() {
  if (textTopArray.includes('.')) {
    selectDotBtn.classList.add('disabled');
    selectDotBtn.setAttribute('disabled', '');
  }

  // else if (operatorList.filter(list => (list === textTopArray[textTopArray.length - 1]))) {
  //   selectDotBtn.classList.add('disabled');
  //   selectDotBtn.setAttribute('disabled', '');
  // }
  else {
    selectDotBtn.classList.remove('disabled');
    selectDotBtn.removeAttribute('disabled');
  }
}

function checkAndDisplay() {
  displayText();
  displayTotal();
  checkDotBtn();
}

for (let i = 0; i < selectNumberBtn.length; i++) {
  selectNumberBtn[i].addEventListener('click', () => {
    const value = selectNumberBtn[i].innerHTML;
    const valueNum = Number(selectNumberBtn[i].innerHTML);
    if (textTopArray[0] === 0 && value !== '.' && textTopArray.length === 1) {
      textTopArray.splice(0, 1, valueNum);
      checkAndDisplay();
    } else if (
      textTopArray.slice(0, 2).join('') === '-0' &&
      textTopArray.slice(0, 3).join('') !== '-0.' &&
      value !== '.'
    ) {
      textTopArray.splice(1, 1, valueNum);
      checkAndDisplay();
    } else if (value === '.') {
      textTopArray.push(value);
      checkAndDisplay();
    } else {
      textTopArray.push(valueNum);
      checkAndDisplay();
    }
  });
}

selectNegativeBtn[0].addEventListener('click', () => {
  if (textTopArray[0] !== '-') {
    textTopArray.unshift('-');
    checkAndDisplay();
  } else if (textTopArray[0] === '-') {
    textTopArray.shift();
    checkAndDisplay();
  }
});

function clearDisplay() {
  textTopArray = [0];
  checkAndDisplay();
}
selectClearBtn[0].addEventListener('click', clearDisplay);

function deleteLastNumber() {
  textTopArray.pop();
  checkAndDisplay();
  if (textTopArray.length === 0) {
    textTopArray = [0];
    displayText();
  }
}
selectDeleteBtn[0].addEventListener('click', deleteLastNumber);

const operatorList = ['/', '*', '-', '+'];

function isLastOperator() {
  const result =
    textTopArray[textTopArray.length - 1] ===
    operatorList
      .filter(item => item === textTopArray[textTopArray.length - 1])
      .toString();

  return result;
}

for (let i = 0; i < selectOperatorBtn.length; i++) {
  selectOperatorBtn[i].addEventListener('click', () => {
    const value = selectOperatorBtn[i].innerHTML;
    console.log('value is ' + value + ' and type of ' + typeof value);
    if (textTopArray[0] === '0') {
      return;
    } else {
      if (isLastOperator(value)) {
        textTopArray.pop();
        textTopArray.push(' ' + value + ' ');
        displayText();
      } else {
        textTopArray.push(' ' + value + ' ');
        displayText();
      }
    }
  });
}

selectEqualBtn.addEventListener('click', () => {
  textTopArray = [];
  textTopArray.push(textBottomArray);
  displayText();
});
