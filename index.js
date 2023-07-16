const fs = require('fs');
const inquirer = require('inquirer');

class Circle {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="40" fill="${this.color}" />
    </svg>`;
  }
}

class Triangle {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <polygon points="50,10 90,90 10,90" fill="${this.color}" />
    </svg>`;
  }
}

class Square {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="80" height="80" x="10" y="10" fill="${this.color}" />
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
