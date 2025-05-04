"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
function calculateInvestment(data) {
    const { amount, yearlyContribution, expectedReturn, duration } = data;
    if (amount < 0)
        return 'Initial investment amount must be at least zero';
    if (duration <= 0)
        return 'No valid amount of years provided';
    if (expectedReturn < 0)
        return 'Expected return must be at least zero';
    let total = amount;
    let totalContributions = 0;
    let totalInterestEarned = 0;
    const yearlyResults = [];
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
function printResults(result) {
    if (typeof result === 'string') {
        console.log(result);
        return;
    }
    for (const year of result) {
        console.log(year.year);
        console.log(`Total: ${year.totalAmount.toFixed(0)}`);
        console.log(`Contributions: ${year.totalContributions.toFixed(0)}`);
        console.log(`Interest Earned: ${year.totalInterestEarned.toFixed(0)}`);
        console.log('--------------------');
    }
}
const investment = {
    amount: parseFloat(readline_sync_1.default.question('Initial Amount: ')),
    yearlyContribution: parseFloat(readline_sync_1.default.question('Yearly Contribution: ')),
    expectedReturn: parseFloat(readline_sync_1.default.question('Expected Return (e.g. 0.08): ')),
    duration: parseInt(readline_sync_1.default.question('Years: '), 10),
};
const result = calculateInvestment(investment);
printResults(result);
