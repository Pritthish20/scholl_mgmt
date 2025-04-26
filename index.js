import express from 'express';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended:true }));

app.get('/',(req,res)=>{
    res.send("Server is up and running");
})

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
