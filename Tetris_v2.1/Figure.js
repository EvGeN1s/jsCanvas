class Figure {
  static blockSize = 50;
  blocks = [];
  params = [];
  constructor(x, y, figureName) {
    this.x = x;
    this.y = y;
    this.figureName = figureName;
  }

  setFigureParams() {
    switch (this.figureName) {
      case 'tube1':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x + 50, this.y + 50], [this.x, this.y + 100]);
        break;
      case 'tube2':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x - 50, this.y + 50], [this.x + 50, this.y + 50]);
        break;
      case 'tube3':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x - 50, this.y + 50], [this.x, this.y + 100]);
        break;
      case 'tube4':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x - 50, this.y], [this.x + 50, this.y]);
        break;
      case 'square':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x + 50, this.y + 50], [this.x + 50, this.y]);
        break;
      case 'line1':
        this.params.push([this.x, this.y], [this.x - 50, this.y],
          [this.x + 50, this.y], [this.x + 100, this.y]);
        break;
      case 'line2':
        this.params.push([this.x, this.y], [this.x, this.y + 50],
          [this.x, this.y + 100], [this.x, this.y + 150]);
        break;
    }

  }

  createFigure()
  {
    for (let i = 0; i < 4; i++)
    {
      this.blocks[i] = new Block(this.params[i][0], this.params[i][1]);
    }
  }

  moveLeft() {
    for (let block of this.blocks) {
      block.x -= Figure.blockSize;
    }
  }

  moveRight() {
    for (let block of this.blocks) {
      block.x += Figure.blockSize;
    }
  }

  moveDown() {
    for (let block of this.blocks) {
      block.y += Figure.blockSize;
    }
  }

}

