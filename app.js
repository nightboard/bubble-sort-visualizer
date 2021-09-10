class Bubbles {
  constructor(count, max_radius = 100, delay = 1000) {
    this.count = count;
    this.max_radius = max_radius;
    this.delay = delay;
  }

  getRandomRadius() {
    let radius = Math.floor(Math.random() * this.max_radius + 1);
    if (radius <= 20) {
      radius += 20;
    }
    if (radius >= this.max_radius - 10) {
      radius -= 20;
    }
    if (radius >= this.max_radius - 20) {
      radius -= 10;
    }
    if (radius >= this.max_radius - 30) {
      radius -= 10;
    }
    return radius;
  }

  getBubble() {
    const radius = this.getRandomRadius();
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.width = `${radius * 2.5}px`;
    bubble.style.height = `${radius * 2.5}px`;
    bubble.style.lineHeight = `${radius * 2.5}px`;
    bubble.textContent = radius;
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
      const bubble = this.getBubble(this.max_radius);
      bubble.style.top = `${i * 50}px`;
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
      if (isSwapped == false) {
        break;
      }
      isSwapped = false;
    }
  }
}

const bubbles = new Bubbles(5);
bubbles.generateBubbles(".bubble-container");
// get buttons
const refreshButtton = document.querySelector(".refresh");
const playButton = document.querySelector(".play");
let isPlayButtonDisabled = false;

refreshButtton.addEventListener("click", () => {
  bubbles.generateBubbles(".bubble-container");
  isPlayButtonDisabled = false;
});

playButton.addEventListener("click", () => {
  if (isPlayButtonDisabled == false) {
    bubbles.bubbleSort(".bubble-container");
    isPlayButtonDisabled = true;
  }
});
