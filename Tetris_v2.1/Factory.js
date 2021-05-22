class Factory {
  createFigure(figureName , x1, y1)
  {
    switch (figureName) {
      case 'tube1': return new Tube1(x1, y1);
      case 'tube2': return new Tube2(x1, y1);
      case 'tube3': return new Tube3(x1, y1);
      case 'tube4': return new Tube4(x1, y1);
      case 'square': return new Square(x1, y1);
      case 'line1': return new Line1(x1, y1);
      case 'line2': return new Line2(x1, y1);
    }
  }
}
