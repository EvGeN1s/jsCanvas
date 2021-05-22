class Tube2 extends Figure{
  constructor(x1, y1, x2 =) {
    this.tube = new Figure(x1, y1, x1, y1 +50,
      x1  - 50, y1 + 50 , x1 + 50, y1 + 50);
  }
}