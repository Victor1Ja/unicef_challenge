export const calculateMean = (arr: number[]): number => {
  const sum = arr.reduce((acc, value) => acc + value, 0);
  return sum / arr.length;
};

export const calculateStandardDeviation = (
  arr: number[],
  mean: number,
): number => {
  const squaredDifferences = arr.map((value) => Math.pow(value - mean, 2));
  const sumSquaredDiff = squaredDifferences.reduce(
    (acc, value) => acc + value,
    0,
  );
  const variance = sumSquaredDiff / arr.length;
  return Math.sqrt(variance);
};

export const calculateConfidenceInterval = (
  arr: number[],
  confidenceLevel: number,
): [number, number] => {
  const mean = calculateMean(arr);
  const standardDeviation = calculateStandardDeviation(arr, mean);
  const zScore = Math.abs((1 - confidenceLevel) / 2);

  const marginOfError = zScore * (standardDeviation / Math.sqrt(arr.length));
  const lowerBound = mean - marginOfError;
  const upperBound = mean + marginOfError;

  return [lowerBound, upperBound];
};
