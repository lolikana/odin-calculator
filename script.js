const para = document.createElement('p');
const displaybottom = document.getElementById('display-bottom');
const displayTop = document.getElementById('display-top');
const selectNumberBtn = document.getElementsByClassName('number');
const selectDotBtn = document.getElementById('dot');
const selectNegativeBtn = document.getElementsByClassName('control__negative');
const selectClearBtn = document.getElementsByClassName('control__clear');
const selectDeleteBtn = document.getElementsByClassName('control__delete');
const selectOperatorBtn = document.getElementsByClassName('operator');

let textTopArray = [0];
let textBottomArray = [];

displayTop.textContent = textTopArray;

function displayText() {
  displayTop.textContent = textTopArray.join('');
}

for (let i = 0; i < selectNumberBtn.length; i++) {
  selectNumberBtn[i].addEventListener(
    'click',
    (btnValue = () => {
      const value = selectNumberBtn[i].innerHTML;
      if (textTopArray[0] === 0 && value !== '.' && textTopArray.length === 1) {
        textTopArray.splice(0, 1, value);
        checkDotBtn();
        displayText();
      } else {
        textTopArray.push(value);
        checkDotBtn();
        displayText();
      }
      console.log(textTopArray);
    })
  );
}

selectNegativeBtn[0].addEventListener('click', () => {
  if (textTopArray[0] !== '-') {
    textTopArray.unshift('-');
  } else if (textTopArray[0] === '-') {
    textTopArray.shift();
  }
  console.log(textTopArray);
  return displayText();
});

function clearDisplay() {
  textTopArray = [0];
  displayText();
  checkDotBtn();
}
selectClearBtn[0].addEventListener('click', clearDisplay);

function deleteLastNumber() {
  textTopArray.pop();
  displayText();
  checkDotBtn();
  if (textTopArray.length === 0) {
    textTopArray = [0];
    displayText();
  }
}
selectDeleteBtn[0].addEventListener('click', deleteLastNumber);

function checkDotBtn() {
  if (textTopArray.includes('.')) {
    selectDotBtn.classList.add('disabled');
    selectDotBtn.setAttribute('disabled', '');
  } else {
    selectDotBtn.classList.remove('disabled');
    selectDotBtn.removeAttribute('disabled');
  }
}
