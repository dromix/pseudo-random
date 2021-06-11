"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticGenerator = void 0;
const perf_hooks_1 = require("perf_hooks");
class StatisticGenerator {
    constructor(probability, value, iterations) {
        this.initialValue = this.stringToBoolean(value);
        this.initialProbability = Number(probability);
        this.initialIterations = Number(iterations) || 1000;
    }
    /**
     *
     * @returns statistic of pseudo probability, count of true \ false values, time of function execution
     * or title of error if something went wrong
     */
    generateProbabilityStat() {
        const error = this.validateInitialProps();
        if (error)
            return error;
        const begin = perf_hooks_1.performance.now();
        const predefinedProbabilities = this.createPredefinedProbabilities();
        const id = this.getRandomId();
        const stats = this.getStats(predefinedProbabilities);
        const end = perf_hooks_1.performance.now();
        return {
            result: predefinedProbabilities[id],
            stats,
            duration: end - begin,
        };
    }
    createPredefinedProbabilities() {
        const filled = this.initialProbability * this.initialIterations;
        const result = [];
        let counter = 0;
        for (let i = 0; i < this.initialIterations; i++) {
            if (counter <= filled) {
                result[i] = this.initialValue;
            }
            else {
                result[i] = !this.initialValue;
            }
            counter++;
        }
        return result;
    }
    getStats(predefinedArray) {
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
    getRandomId() {
        return Math.floor(Math.random() * this.initialIterations);
    }
    stringToBoolean(str) {
        return str === 'false' ||
            str === 'undefined' ||
            str === 'null' ||
            str === '0'
            ? false
            : !!str;
    }
    validateInitialProps() {
        if (isNaN(this.initialProbability) ||
            this.initialProbability < 0 ||
            this.initialProbability > 1) {
            return 'Not correct probability, should be number between 0..1';
        }
        if (isNaN(this.initialIterations) || this.initialIterations < 1) {
            return 'Not correct iterations, should be number between bigger then 1';
        }
        return undefined;
    }
}
exports.StatisticGenerator = StatisticGenerator;
