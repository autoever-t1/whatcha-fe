export function calculateEMI(
  originAmount: number,
  interestRate: number,
  period: number
) {
  const monthlyRate = interestRate / 12 / 100; // 월 이자율 계산
  const emi =
    (originAmount * monthlyRate * Math.pow(1 + monthlyRate, period)) /
    (Math.pow(1 + monthlyRate, period) - 1);
  return parseInt((emi * 100).toFixed(0)) * 100;
}
