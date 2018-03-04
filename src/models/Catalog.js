import { random, shuffle } from 'lodash/fp';

class Catalog {
  constructor(brands, pageSize = 9) {
    this.brands = shuffle(brands);
    this.pageSize = pageSize;

    const len = this.brands.length;
    this.brands.forEach((b, i) => {
      let index = random(0, len - 1);
      while (index === i) {
        index = random(0, len - 1);
      }
      b.distraction = this.brands[index];
    })
  }

  getPage(page) {
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    return this.brands.slice(start, end);
  }

  hasNextPage(currentPage) {
    return currentPage * this.pageSize < this.brands.length;
  }

  hasFinishedPage(currentPage, answered) {
    return answered === currentPage * this.pageSize;
  }

  hasEnded(answered) {
    return answered === this.brands.length;
  }
}

export default Catalog;
