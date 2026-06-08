export const probBook = {
  probs: {
    add: { func: addGen, text: '덧셈' },
    sub: { func: subGen, text: '뺄셈' },
    mul: { func: mulGen, text: '곱셈' },
    div: { func: divGen, text: '나눗셈' },
    det: { func: detGen, text: '행렬식(2by2)' },
  },
  Ids() {
    return Object.entries(this.probs).map(([Id, val]) => ({
      value: Id,
      text: val.text,
    }));
  },
  select(Id) {
    return this.probs[Id].func;
  },
};

function addGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `$${a} + ${b}$`,
    answer: a + b,
  };
}

function subGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} - ${b}`,
    answer: a - b,
  };
}

function mulGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} × ${b}`,
    answer: a * b,
  };
}

function divGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} / ${b}`,
    answer: a / b,
  };
}

function detGen() {
  const [a, b, c, d] = [
    randomInt(-10, 10),
    randomInt(-10, 10),
    randomInt(-10, 10),
    randomInt(-10, 10),
  ];
  return {
    probDisp: `다음 행렬식의 값을 구하시오 $\\begin{vmatrix}${a} & ${b} \\\\ ${c} & ${d}\\end{vmatrix}$`,
    answer: a * d - b * c,
  };
}

const exactCheck = (detail) => (test, ref) => test === ref;

const percentCheck = (detail) => (test, ref) => {
  if (ref === 0) {
    return toleranceCheck(0.1)(test, ref);
  } else {
    return Math.abs(test - ref) / Math.abs(ref) <= detail / 100;
  }
};

const toleranceCheck = (detail) => (test, ref) =>
  Math.abs(test - ref) <= detail;

export const checkAnsBook = {
  checkAnss: {
    exact: { func: exactCheck, text: '정확히 일치' },
    percent: { func: percentCheck, text: '오차율%' },
    fix: { func: toleranceCheck, text: '허용오차' },
  },
  Ids() {
    return Object.entries(this.checkAnss).map(([Id, val]) => ({
      value: Id,
      text: val.text,
    }));
  },
  select(Id, detail) {
    return this.checkAnss[Id].func(detail);
  },
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
