export const probBook = {
  probs: {
    add: { func: addGen, text: "덧셈" },
    sub: { func: subGen, text: "뺄셈" },
    mul: { func: mulGen, text: "곱셈" },
    div: { func: divGen, text: "나눗셈" }
  },
  Ids() {
    return Object.entries(this.probs).map(([Id, val]) => (
      { value: Id, text: val.text }
    ));
  },
  select(Id) {
    return this.probs[Id].func;
  }

};

function addGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} + ${b}`,
    answer: (a+b),
  }
}

function subGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} - ${b}`,
    answer: (a-b),
  }
}

function mulGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} × ${b}`,
    answer: (a*b),
  }
}

function divGen() {
  const [a, b] = [randomInt(1, 10), randomInt(1, 10)];
  return {
    probDisp: `${a} / ${b}`,
    answer: (a/b),
  }
}


export const checkAnsBook = {
  checkAnss: {
    exact: { func: exactCheck, text: "정확히 일치"},
    percent: { func: percentCheck, text: "퍼센트" },
    fix: { func: fixCheck, text: "소수점" },
  },
  Ids() {
    return Object.entries(this.checkAnss).map(([Id, val]) => (
      { value: Id, text: val.text }
    ));
  },
  select(Id, data) {
    return this.checkAnss[Id].func;
  }

};

function exactCheck(test, ref) {
  return test === ref;
}

function percentCheck() {}

function fixCheck() {}







function randomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}