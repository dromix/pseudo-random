export interface IProbabilityRequest {
  query: {
    probability: string;
    value: string;
    iterations?: string;
  };
}

export interface IProbabilityStat {
  result: boolean;
  stats: IStats;
  duration: number;
}

export interface IStats {
  number_of_true: number;
  number_of_false: number;
  number_of_iterations: number;
}
