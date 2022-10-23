export type Predictions = {
  label: string;
  results: Results;
}[];

export type Prediction = {
  label: string;
  results: Results;
};

type Results = {
  probabilities: Float32Array;
  match: boolean;
}[];
