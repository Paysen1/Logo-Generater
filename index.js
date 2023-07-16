const fs = require('fs');
const inquirer = require('inquirer');

class Circle {
  constructor() {
    this.color = '';
    this.text = '';
    this.textColor = '';
  }

  setColor(color) {
    this.color = color;
  }

  setText(text) {
    this.text = text;
  }

  setTextColor(color) {
    this.textColor = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <circle cx="100" cy="100" r="80" fill="${this.color}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
    </svg>`;
  }
}

class Triangle {
  constructor() {
    this.color = '';
    this.text = '';
    this.textColor = '';
  }

  setColor(color) {
    this.color = color;
  }

  setText(text) {
    this.text = text;
  }

  setTextColor(color) {
    this.textColor = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <polygon points="100,30 170,170 30,170" fill="${this.color}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
    </svg>`;
  }
}

class Square {
  constructor() {
    this.color = '';
    this.text = '';
    this.textColor = '';
  }

  setColor(color) {
    this.color = color;
  }

  setText(text) {
    this.text = text;
  }

  setTextColor(color) {
    this.textColor = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="160" height="160" x="20" y="20" fill="${this.color}" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
    </svg>`;
  }
}

async function promptUser() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters: ',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color: ',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color: ',
    },
  ]);

  return userInput;
}

async function runApplication() {
  try {
    const userInput = await promptUser();

    let shape;
    if (userInput.shape === 'circle') {
      shape = new Circle();
    } else if (userInput.shape === 'triangle') {
      shape = new Triangle();
    } else if (userInput.shape === 'square') {
      shape = new Square();
    }

    shape.setColor(userInput.shapeColor);
    shape.setText(userInput.text);
    shape.setTextColor(userInput.textColor);

    const svgContent = shape.render();
    await writeFile(svgContent);

    console.log('Generated logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
runApplication();

function writeFile(svgContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
