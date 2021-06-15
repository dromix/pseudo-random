export interface IProbabilityRequest {
  body: {
    probability: number;
    value: boolean;
    iterations?: number;
  };
}

export interface IProbabilityStatResponse {
  result: boolean;
  stats: IStats;
  duration: number;
}

export interface IStats {
  number_of_true: number;
  number_of_false: number;
  number_of_iterations: number;
}
