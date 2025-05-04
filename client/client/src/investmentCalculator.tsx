import React, { useState } from 'react';
import {
  Investment,
  CalculationResult,
  InvestmentResult,
  calculateInvestment,
} from './calculator.ts';
import './investmentCalculator.css';


const InvestmentCalculator: React.FC = () => {
  const [formData, setFormData] = useState<Investment>({
    amount: 0,
    yearlyContribution: 0,
    expectedReturn: 0,
    duration: 0,
  });

  const [results, setResults] = useState<CalculationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateInvestment(formData);
    setResults(res);

    if (typeof res !== 'string') {
      try {
        await fetch('http://localhost:3000/api/investments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, yearlyResults: res }),
        });
      } catch (err) {
        console.error('Error saving investment:', err);
      }
    }
  };

  return (
    <div className="form">
      <div className="title">Investment</div>
      <div className="subtitle">Let's calculate your future!</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container ic1">
          <input
            id="amount"
            name="amount"
            className="input"
            type="number"
            placeholder=" "
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label htmlFor="amount" className="placeholder">Initial Amount</label>
        </div>

        <div className="input-container ic2">
          <input
            id="yearlyContribution"
            name="yearlyContribution"
            className="input"
            type="number"
            placeholder=" "
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label htmlFor="yearlyContribution" className="placeholder">Yearly Contribution</label>
        </div>

        <div className="input-container ic2">
          <input
            id="expectedReturn"
            name="expectedReturn"
            className="input"
            type="number"
            step="0.01"
            placeholder=" "
            onChange={handleChange}
          />
          <div className="cut cut-short"></div>
          <label htmlFor="expectedReturn" className="placeholder">Expected Return (%)</label>
        </div>

        <div className="input-container ic2">
          <input
            id="duration"
            name="duration"
            className="input"
            type="number"
            placeholder=" "
            onChange={handleChange}
          />
          <div className="cut cut-short"></div>
          <label htmlFor="duration" className="placeholder">Duration (years)</label>
        </div>

        <button type="submit" className="submit">Calculate</button>
      </form>

      {results && typeof results !== 'string' && (
        <div className="mt-6 text-white">
          <h3 className="font-semibold text-lg mb-2">Results:</h3>
          {results.map((res: InvestmentResult) => (
            <div key={res.year} className="border-b py-2">
              <p>Year: {res.year}</p>
              <p>Total: {res.totalAmount.toFixed(2)}</p>
              <p>Contributions: {res.totalContributions.toFixed(2)}</p>
              <p>Interest Earned: {res.totalInterestEarned.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {typeof results === 'string' && (
        <p className="text-red-600 mt-4">{results}</p>
      )}
    </div>
  );
};

export default InvestmentCalculator;
