import express from 'express';
import cors from 'cors';
import { connectToDB } from './client/models/db';
import investmentRoutes from './client/routes/investmentRoute'


const app = express();
const PORT = 3000;

connectToDB();

app.use(cors());
app.use(express.json());
app.use('/api/investments',investmentRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
