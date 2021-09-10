// Credit goes to...
// https://codepen.io/Mark_Bowley/pen/mEtqj

const DUMMY_BUBBLE_COUNT = 10;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getLeftPosition() {
  return getRandomArbitrary(0, 40);
}

function getTopPosition() {
  return getRandomArbitrary(0, 100);
}

function getDummyBubble() {
  const dummyBubble = document.createElement("div");
  const verticalTime = Math.ceil(Math.random() * 30 + 10);
  const horizontalTime = Math.ceil(Math.random() * 5 + 2);
  const leftPosition = getLeftPosition();
  const topPosition = getTopPosition();
  const scale = Math.random();
  dummyBubble.classList.add("bubble-dummy");
  dummyBubble.style.animation = `animateBubble ${verticalTime}s linear infinite, sideWays ${horizontalTime}s ease-in-out infinite alternate`;
  dummyBubble.style.top = `${topPosition}%`;
  dummyBubble.style.left = `${leftPosition}%`;
  dummyBubble.style.transform = `scale(${scale})`;
  return dummyBubble;
}

function generateDummyBubbles(selector) {
  const background = document.querySelector(selector);
  for (let i = 0; i < DUMMY_BUBBLE_COUNT; i++) {
    const dummyBubble = getDummyBubble();
    background.appendChild(dummyBubble);
  }
}

generateDummyBubbles("#background-wrap");
