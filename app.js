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

  // biggest mistack here is i am changing top position of the array.
  // but not the actual elements so this is bug basically.
  bubbleSort(nodes) {
    // This is creating a copy man!!
    // const nodes = [...document.querySelector(selector).children];
    let isSwapped = false;

    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.count - i - 1; j++) {
        if (this.getBubbleValue(nodes[j]) > this.getBubbleValue(nodes[j + 1])) {
          isSwapped = true;
          // swap elements | swap top property of bubble

          const temp2 = nodes[j];
          nodes[j] = nodes[j + 1];
          nodes[j + 1] = temp2;

          const temp = nodes[j].style.top;
          nodes[j].style.top = nodes[j + 1].style.top;
          nodes[j + 1].style.top = temp;
        }
      }
      if (isSwapped == false) {
        break;
      }
      isSwapped = false;
    }

    for (let i = 0; i < this.count; i++) {
      console.log(
        `nodes[${i}] : ${nodes[i].textContent}, nodes[i].top : ${nodes[i].style.top}`
      );
    }
  }
}

const bubbles = new Bubbles(5);
bubbles.generateBubbles(".bubble-container");

const nodes = document.querySelector(".bubble-container").childNodes;
console.log("-------------------------------------------");

bubbles.bubbleSort(nodes);

for (let i = 0; i < nodes.length; i++) {
  console.log(
    `nodes[${i}] : ${nodes[i].textContent}, nodes[i].top : ${nodes[i].style.top}`
  );
}
