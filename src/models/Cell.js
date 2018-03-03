import { random } from 'lodash/fp';
// Immutable

class Cell {
  constructor(brand) {
    this.brand = brand;
    this.open = false;
    this.score = null;
    this.answerIndex = random(0, 1);
  }

  clone() {
    const clone = new Cell(this.brand);
    clone.open = this.open;
    clone.score = this.score;
    clone.answerIndex = this.answerIndex;
    return clone;
  }

  setOpen(open) {
    const clone = this.clone();
    clone.open = open;
    return clone;
  }

  setScore(score) {
    const clone = this.clone();
    clone.score = score;
    return clone;
  }
}

export default Cell;
