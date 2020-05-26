interface MapTransducer<T> {
  (item: T): T;
}

interface FilterTransducer<T> {
  (item: T): boolean;
}

interface SortTransducer<T> {
  (itemA: T, itemB: T): number;
}

type Transducer<T> = MapTransducer<T> | FilterTransducer<T> | SortTransducer<T>;

interface TransducerContainer<T> {
  type: string;
  transducer: Transducer<T>;
}

type Producer<T> = Generator<T, T, { value: T; done: boolean }>;

interface Pipeline<T> {
  producer: Producer<T>;
  transducers: TransducerContainer<T>[];
  reducers: any[];
}

const binarySearch = <T>(array: T[], element: T, comparator: (a: T, b: T) => number): number => {
  let start = 0;
  let end = array.length - 1;

  // Iterate while start not meets end
  while (start <= end) {
    // Find the mid index
    const mid = Math.floor((start + end) / 2);

    // If element is present at mid, return True
    if (comparator(array[mid], element) === 0) return mid;

    // Else look in left or right half accordingly
    if (comparator(array[mid], element) === -1) start = mid + 1;
    else end = mid - 1;
  }

  return start;
};

// const a = [1, 2, 2, 2, 4, 5];
// const index = binarySearch(a, 3, (a, b) => a > b ? 1 : a < b ? -1 : 0);
// a.splice(index, null, 3);
// console.log(a); // [1, 2, 2, 2, 3, 4, 5]

class ArrayStream<G> {
  public static* fromArray<T>(arr: T[]): Producer<T> {
    for (let i = 0; i < arr.length; i += 1) yield arr[i];
    return null;
  }

  private _pipeline: Pipeline<G> = {
    producer: null,
    transducers: [],
    reducers: [],
  }
  constructor(producer: Producer<G>) {
    this._pipeline.producer = producer;
  }

  map(transducer: MapTransducer<G>): this {
    this._pipeline.transducers.push({ type: 'MAP', transducer });
    return this;
  }

  filter(transducer: FilterTransducer<G>): this {
    this._pipeline.transducers.push({ type: 'FILTER', transducer });
    return this;
  }

  sort(transducer: SortTransducer<G>): this {
    this._pipeline.transducers.push({ type: 'SORT', transducer });
    return this;
  }

  exec(): G[] {
    const result = [];

    for (let item of this._pipeline.producer) {
      let needAddToResult = true;
      for (let i = 0; i < this._pipeline.transducers.length; i += 1) {
        const { type, transducer } = this._pipeline.transducers[i];
        if (type === 'MAP') item = (transducer as MapTransducer<G>)(item);
        if (type === 'FILTER') {
          needAddToResult = (transducer as FilterTransducer<G>)(item);
          if (!needAddToResult) break;
        }
      }
      if (needAddToResult) result.push(item);
    }
    return result;
  }
}

const of = <T>(arr: T[]): ArrayStream<T> => {
  const arrayStream = new ArrayStream(ArrayStream.fromArray(arr));
  return arrayStream;
};

const lazyArr = of([-1, 0, 1, 2, -2, 3])
  .map((item: number) => item * 2)
  .filter((item: number) => item > 0)
  .map((item: number) => item + Math.trunc(Math.random() * 10))
  .sort((a: number, b: number) => Number(a > b) || -Number(a < b) || 0);

console.log(lazyArr.exec());
