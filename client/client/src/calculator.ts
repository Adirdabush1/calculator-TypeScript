export type Investment = {
  amount: number;
  yearlyContribution: number;
  expectedReturn: number;
  duration: number;
};

export type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

export type CalculationResult = InvestmentResult[] | string;

export function calculateInvestment(data: Investment): CalculationResult {
  const { amount, yearlyContribution, expectedReturn, duration } = data;

  if (amount < 0) return 'Initial investment amount must be at least zero';
  if (duration <= 0) return 'No valid amount of years provided';
  if (expectedReturn < 0) return 'Expected return must be at least zero';

  let total = amount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const yearlyResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total *= 1 + expectedReturn;
    total += yearlyContribution;
    totalContributions += yearlyContribution;
    totalInterestEarned = total - totalContributions - amount;

    yearlyResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalContributions,
      totalInterestEarned,
    });
  }

  return yearlyResults;
}
