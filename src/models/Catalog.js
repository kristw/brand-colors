import { random, shuffle } from 'lodash/fp';

class Catalog {
  constructor(brands, pageSize = 9) {
    this.brands = shuffle(brands);
    this.pageSize = pageSize;

    const len = this.brands.length;
    this.brands.forEach((b, i) => {
      let index = random(len);
      while (index === i) {
        index = random(len);
      }
      b.distraction = this.brands[index];
    })
  }

  getPage(page) {
    return this.brands.slice(page * this.pageSize, this.pageSize);
  }

  hasNextPage(page) {
    return page * this.pageSize < this.brands.length;
  }
}

export default Catalog;
