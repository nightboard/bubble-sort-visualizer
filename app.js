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

  generateBubbles(selector) {
    const container = document.querySelector(selector);
    for (let i = 0; i < this.count; i++) {
      const bubble = this.getBubble(this.max_radius);
      bubble.style.top = `${i * 50}px`;
      container.appendChild(bubble);
    }
  }

  getBubbleValue(node) {
    return parseInt(node.textContent);
  }

  delayTime(time) {
    return new Promise((work) => {
      setTimeout(() => {
        work();
      }, time);
    });
  }

  async makeBubbleActive(bubble1, bubble2) {
    await this.delayTime(this.delay);
    bubble1.classList.add("active");
    await this.delayTime(this.delay);
    bubble2.classList.add("active");
  }

  async makeBubbleNormal(bubble1, bubble2) {
    await this.delayTime(this.delay);
    bubble1.classList.remove("active");
    await this.delayTime(this.delay);
    bubble2.classList.remove("active");
  }

  async swapBubbles(bubble1, bubble2) {
    const bubble1Top = bubble1.style.top;
    const bubble2Top = bubble2.style.top;
    await this.makeBubbleActive(bubble1, bubble2);
    await this.delayTime(this.delay);
    // swap property
    bubble1.style.top = bubble2Top;
    bubble2.style.top = bubble1Top;
    await this.makeBubbleNormal(bubble1, bubble2);
  }

  async bubbleSort(selector) {
    const nodes = document.querySelector(selector).children;
    let isSwapped = false;

    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count - i - 1; j++) {
        if (this.getBubbleValue(nodes[j]) > this.getBubbleValue(nodes[j + 1])) {
          isSwapped = true;
          // swap elements | swap top property of bubble
          this.swapBubbles(nodes[j], nodes[j + 1]);
          await this.delayTime(this.delay);
        }
      }

      console.log(nodes);

      if (isSwapped == false) {
        break;
      }
      isSwapped = false;
    }
  }
}

const bubbles = new Bubbles(5);
bubbles.generateBubbles(".bubble-container");
bubbles.bubbleSort(".bubble-container");
