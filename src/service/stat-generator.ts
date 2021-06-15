import { performance } from 'perf_hooks';
import { IProbabilityStatResponse, IStats } from '../interface';

class StatGeneratorService {
  /**
   *
   * @returns statistics of pseudo probability, count of true \ false values,
   *  time of function execution
   */
  generateProbabilityStat(
    probability: number,
    value: boolean,
    iterations = 1000
  ): IProbabilityStatResponse {
    const begin = performance.now();

    const predefinedProbabilities = this.createPredefinedProbabilities(
      probability,
      value,
      iterations
    );

    const id = this.getRandomId(iterations);
    const stats = this.getStats(predefinedProbabilities, iterations);

    const end = performance.now();

    return {
      result: predefinedProbabilities[id],
      stats,
      duration: end - begin,
    };
  }

  private createPredefinedProbabilities(
    probability: number,
    value: boolean,
    iterations: number
  ): boolean[] {
    const filled = probability * iterations;
    const result = [];

    let counter = 0;

    for (let i = 0; i < iterations; i++) {
      if (counter <= filled) {
        result[i] = value;
      } else {
        result[i] = !value;
      }

      counter++;
    }

    return result;
  }

  private getStats(predefinedArray: boolean[], iterations: number): IStats {
    let trueCount = 0;
    let falseCount = 0;

    for (let i = 0; i < iterations; i++) {
      const isTrue = predefinedArray[this.getRandomId(iterations)];

      isTrue ? trueCount++ : falseCount++;
    }

    return {
      number_of_true: trueCount,
      number_of_false: falseCount,
      number_of_iterations: iterations,
    };
  }

  private getRandomId(iterations: number): number {
    return Math.floor(Math.random() * iterations);
  }
}

export const statGeneratorService = new StatGeneratorService();
