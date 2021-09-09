class Bubbles {
  constructor(count, max_radius = 100) {
    this.count = count;
    this.max_radius = max_radius;
  }

  getRandomRadius() {
    let radius = Math.floor(Math.random() * this.max_radius + 1);
    if (radius <= 20) {
      radius += 10;
    }
    if (radius >= this.max_radius - 20) {
      radius -= 20;
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
      container.appendChild(bubble);
    }
  }

  getBubbleValue(node) {
    return parseInt(node.textContent);
  }

  bubbleSort(selector) {
    const nodes = document.querySelector(selector).children;
    let isSwapped = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i; j <= nodes.length - i - 1; j++) {
        if (this.getBubbleValue(nodes[j]) > this.getBubbleValue(nodes[i])) {
          isSwapped = true;
          const array = [...nodes];
          console.log(array);

          // swap elements
          const temp = array[j];
          array[j] = array[i];
          array[i] = temp;
        }
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
bubbles.bubbleSort(".bubble-container");
