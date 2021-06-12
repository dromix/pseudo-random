import { performance } from 'perf_hooks';
import { IProbabilityStatResponse, IStats } from '../interface';

export class StatisticGenerator {
  private initialValue: boolean;
  private initialProbability: number;
  private initialIterations: number;

  constructor(probability: string, value: string, iterations?: string) {
    this.initialValue = this.stringToBoolean(value);
    this.initialProbability = Number(probability);
    this.initialIterations = Number(iterations) || 1000;
  }

  /**
   *
   * @returns statistic of pseudo probability, count of true \ false values, time of function execution
   * or title of error if something went wrong
   */
  generateProbabilityStat(): IProbabilityStatResponse | string {
    const error = this.validateInitialProps();
    if (error) return error;

    const begin = performance.now();

    const predefinedProbabilities = this.createPredefinedProbabilities();
    const id = this.getRandomId();
    const stats = this.getStats(predefinedProbabilities);

    const end = performance.now();

    return {
      result: predefinedProbabilities[id],
      stats,
      duration: end - begin,
    };
  }

  private createPredefinedProbabilities(): boolean[] {
    const filled = this.initialProbability * this.initialIterations;
    const result = [];

    let counter = 0;

    for (let i = 0; i < this.initialIterations; i++) {
      if (counter <= filled) {
        result[i] = this.initialValue;
      } else {
        result[i] = !this.initialValue;
      }

      counter++;
    }

    return result;
  }

  private getStats(predefinedArray: boolean[]): IStats {
    let trueCount = 0;
    let falseCount = 0;

    for (let i = 0; i < this.initialIterations; i++) {
      const isTrue = predefinedArray[this.getRandomId()];

      isTrue ? trueCount++ : falseCount++;
    }

    return {
      number_of_true: trueCount,
      number_of_false: falseCount,
      number_of_iterations: this.initialIterations,
    };
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * this.initialIterations);
  }

  private stringToBoolean(str: string) {
    return str === 'false' ||
      str === 'undefined' ||
      str === 'null' ||
      str === '0'
      ? false
      : !!str;
  }

  private validateInitialProps(): string | undefined {
    if (
      isNaN(this.initialProbability) ||
      this.initialProbability < 0 ||
      this.initialProbability > 1
    ) {
      return 'Not correct probability, should be number between 0..1';
    }

    if (isNaN(this.initialIterations) || this.initialIterations < 1) {
      return 'Not correct iterations, should be number between bigger then 1';
    }

    return undefined;
  }
}
