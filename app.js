class Bubbles {
  constructor(count, delay = 1000) {
    this.count = count;
    this.delay = delay;
    this.arr = [];
    this.index = 0;

    let sum = 0;
    for(let i=0; i<count; i++)
    {
      this.arr.push(Math.random());
      sum += this.arr[this.arr.length-1];
    }
    console.log(sum)
    for(let i=0; i<count; i++)
    {
      this.arr[i] = (this.arr[i]/sum)*100;
      // z += this.arr[i];
    }
  }

  getRandomRadius() {
    return this.arr[this.index++]
  }

  getBubble() {
    const radius = this.getRandomRadius();
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.width = `${radius}%`;
    bubble.style.height = `${radius}%`;
    // bubble.style.lineHeight = `${radius}px`;
    bubble.textContent = String(Math.round(radius));
    return bubble;
  }

  getDelay(delay = this.delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  generateBubbles(selector) {
    const container = document.querySelector(selector);
    container.innerHTML = "";
    for (let i = 0; i < this.count; i++) {
      const bubble = this.getBubble();
      bubble.style.top = '0px';
      container.appendChild(bubble);
    }
  }

  getBubbleValue(node) {
    return parseInt(node.textContent);
  }

  async bubbleSort(selector) {
    const nodes = document.querySelector(selector).children;
    const container = document.querySelector(selector);
    let isSwapped = false;

    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count - i - 1; j++) {
        // make bubbles active
        nodes[j].classList.add("active");
        nodes[j + 1].classList.add("active");
        await this.getDelay(500);

        // bubble sort condition
        if (this.getBubbleValue(nodes[j]) < this.getBubbleValue(nodes[j + 1])) {
          isSwapped = true;
          // swap the bubbles
          const temp = nodes[j].style.top;
          nodes[j].style.top = nodes[j + 1].style.top;
          nodes[j + 1].style.top = temp;
          await this.getDelay(1000);
          container.insertBefore(nodes[j + 1], nodes[j]);
        }

        // make bubbles normal
        nodes[j].classList.remove("active");
        nodes[j + 1].classList.remove("active");
        await this.getDelay(500);
      }
      if (isSwapped === false) {
        break;
      }
      isSwapped = false;
    }
  }
}

var bubbles = new Bubbles(5);
bubbles.generateBubbles(".bubble-container");
// get buttons
const refreshButtton = document.querySelector(".refresh");
const playButton = document.querySelector(".play");
let isPlayButtonDisabled = false;

refreshButtton.addEventListener("click", () => {

  document.getElementsByClassName("bubble-container")[0].innerHTML = "";
  bubbles = new Bubbles(5);
  bubbles.generateBubbles(".bubble-container");

  isPlayButtonDisabled = false;
});

playButton.addEventListener("click", () => {
  if (isPlayButtonDisabled === false) {
    bubbles.bubbleSort(".bubble-container");
    isPlayButtonDisabled = true;
  }
});
