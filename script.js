const para = document.createElement('p');
const displayTop = document.getElementById('display-top');
const displayBottom = document.getElementById('display-bottom');
const selectNumberBtn = document.getElementsByClassName('number');
const selectDotBtn = document.getElementById('dot');
const selectNegativeBtn = document.getElementsByClassName('control__negative');
const selectClearBtn = document.getElementsByClassName('control__clear');
const selectDeleteBtn = document.getElementsByClassName('control__delete');

let textTopArray = [];
let textBottomArray = [0];
displayBottom.textContent = textBottomArray;

function displayText() {
  displayBottom.textContent = textBottomArray.join('');
}

for (let i = 0; i < selectNumberBtn.length; i++) {
  selectNumberBtn[i].addEventListener(
    'click',
    (btnValue = () => {
      const value = selectNumberBtn[i].innerHTML;
      textBottomArray.push(value);
      checkDotBtn();
      displayText();
    })
  );
}

selectNegativeBtn[0].addEventListener('click', () => {
  if (textBottomArray[0] !== '-') {
    textBottomArray.unshift('-');
  } else if (textBottomArray[0] === '-') {
    textBottomArray.shift();
  }
  return displayText();
});

function clearDisplay() {
  textBottomArray = [0];
  displayBottom.textContent = 0;
  checkDotBtn();
}
selectClearBtn[0].addEventListener('click', clearDisplay);

function deleteLastNumber() {
  textBottomArray.pop();
  displayText();
  checkDotBtn();
  if (textBottomArray.length === 0) {
    displayBottom.textContent = '0';
  }
}
selectDeleteBtn[0].addEventListener('click', deleteLastNumber);

function checkDotBtn() {
  if (textBottomArray.includes('.')) {
    selectDotBtn.classList.add('disabled');
    selectDotBtn.setAttribute('disabled', '');
  } else {
    selectDotBtn.classList.remove('disabled');
    selectDotBtn.removeAttribute('disabled');
  }
}
