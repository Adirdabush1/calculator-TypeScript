import mongoose, { Document, Schema } from 'mongoose';

// הגדרת הטיפוסים של התוצאה השנתית
interface YearlyResult {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
}

// הגדרת הטיפוסים של המודל
interface Investment extends Document {
  amount: number;
  yearlyContribution: number;
  expectedReturn: number;
  duration: number;
  createdAt: Date;
  yearlyResults: YearlyResult[];
}

// יצירת סכימה עם הטיפוסים
const investmentSchema = new Schema<Investment>({
  amount: { type: Number, required: true },
  yearlyContribution: { type: Number, required: true },
  expectedReturn: { type: Number, required: true },
  duration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  yearlyResults: [
    {
      year: { type: String, required: true },
      totalAmount: { type: Number, required: true },
      totalContributions: { type: Number, required: true },
      totalInterestEarned: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<Investment>('Investment', investmentSchema);
