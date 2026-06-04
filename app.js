import { probBook, checkAnsBook } from './data.js';

const INITIAL_STATE = {
  mode: null,
  probGen: null,
  currProb: null,
  checkAns: null,
  score: 0,
  countProb: 0,
  total: 0,
  countWrong: 0,
};

const state = { ...INITIAL_STATE, currPage: 'menu' };

function movePage(moveId) {
  document.getElementById(state.currPage).style.display = 'none';
  document.getElementById(moveId).style.display = 'block';
  state.currPage = moveId;
}

// menu page
const $selectMode = document.getElementById('mode');
for (const el of probBook.Ids()) {
  const option = document.createElement('option');

  option.value = el.value;
  option.textContent = el.text;

  $selectMode.appendChild(option);
}

const $selectAccuracy = document.getElementById('accuracy');
for (const el of checkAnsBook.Ids()) {
  const option = document.createElement('option');

  option.value = el.value;
  option.textContent = el.text;

  $selectAccuracy.appendChild(option);
}

const $menuForm = document.getElementById('menuForm');
$menuForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData($menuForm);

  state.mode = data.get('mode');
  state.total = Number(data.get('total'));
  const accuarcy = data.get('accuracy');
  const detail = Number(data.get('detail'));

  state.probGen = probBook.select(state.mode);
  state.checkAns = checkAnsBook.select(accuarcy, detail);

  nextProblem();
  movePage('quiz');
});

// quiz page
function nextProblem() {
  state.currProb = state.probGen();
  document.getElementById('problem').textContent = state.currProb.probDisp;
  document.getElementById('answer').value = '';

  state.countProb += 1;
  state.countWrong = 0;

  console.log(state);
}

const $keypad = document.getElementById('keypad');
$keypad.addEventListener('click', (e) => {
  const button = e.target;

  if (button.dataset.value) {
    press(button.dataset.value);
    return;
  }

  switch (button.dataset.action) {
    case 'allClear':
      allClear();
      break;

    case 'backspace':
      backspace();
      break;

    case 'submit':
      submitAnswer();
      break;

    case 'wrongNext':
      wrongNext();
      break;
  }
});

function press(num) {
  document.getElementById('answer').value += num;
}

function allClear() {
  document.getElementById('answer').value = '';
}

function backspace() {
  const input = document.getElementById('answer');
  input.value = input.value.slice(0, -1);
}

function submitAnswer() {
  const userAns = Number(document.getElementById('answer').value);
  const corrAns = Number(state.currProb.answer);

  if (state.checkAns(userAns, corrAns)) {
    state.score++;
    if (state.countProb === state.total) {
      document.getElementById('score').value =
        `${state.score} / ${state.total} = ${(state.score / state.total) * 100}%`;
      movePage('result');
    } else {
      nextProblem();
    }
  } else {
    console.log('wrong');
    state.countWrong++;
    if (state.countWrong === 3) {
      state.countWrong = 0;
      document.getElementById('answer').value = state.currProb.answer;
      setKeypadEnabled(false);
      document.getElementById('submitAns').style.display = 'none';
      document.getElementById('wrongNext').style.display = 'inline-block';
      setTimeout(() => {
        document.getElementById('wrongNext').disabled = false;
      }, 1700);
    }
  }
}

function wrongNext() {
  if (state.countProb === state.total) {
    document.getElementById('score').value =
      `${state.score} / ${state.total} = ${(state.score / state.total) * 100}%`;
    movePage('result');
  } else {
    nextProblem();
  }
  document.getElementById('wrongNext').style.display = 'none';
  document.getElementById('submitAns').style.display = 'inline-block';
  setKeypadEnabled(true);
}

const $keypadButtons = document.querySelectorAll('#keypad button');
function setKeypadEnabled(enabled) {
  $keypadButtons.forEach((button) => {
    button.disabled = !enabled;
  });
}

// result page
document.getElementById('goMenu').addEventListener('click', () => {
  Object.assign(state, INITIAL_STATE);
  movePage('menu');
});

document.getElementById('reQuiz').addEventListener('click', () => {
  state.score = 0;
  state.countProb = 0;
  nextProblem();
  movePage('quiz');
});
