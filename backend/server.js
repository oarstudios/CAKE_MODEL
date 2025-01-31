require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const ctwRoutes = require('./routes/ctwRoutes')
const billingRoutes = require('./routes/billingRoutes')
const reviewRoutes = require('./routes/reviewsRoutes')
const bodyParser = require('body-parser')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('581379327416-6t7bsonglpbktsnbvsq0jq1fskctfgb3.apps.googleusercontent.com');
const User = require('./models/UserModel')
const Razorpay = require('razorpay')
const crypto = require('crypto')

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/media', express.static('media'));
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/ctw', ctwRoutes)
app.use('/billing', billingRoutes)
app.use('/reviews', reviewRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT;

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });

  app.post('/order', async(req, res)=>{
    try{
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
    
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if(!order)
      {
        return res.status(500).json({error: 'Failed to create order'});
      }
  
      res.status(200).json({order});
  
    }catch(error)
    {
       console.log(error);
      res.status(500).json({error: 'Failed to process order'});
    }
  })
  
  
  app.post('/order/validate', async (req, res) =>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
  
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
  
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = sha.digest("hex");
    if(digest !== razorpay_signature)
    {
      return res.status(400).json({error: 'Invalid signature'});
    }
    res.status(200).json({message: 'Signature verified', orderId: razorpay_order_id, paymentId: razorpay_payment_id});
  })

  
  app.post('/users/google-login', async (req, res) => {
    try {
      const { token } = req.body;
  
      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '581379327416-6t7bsonglpbktsnbvsq0jq1fskctfgb3.apps.googleusercontent.com', // Replace with your actual client ID
      });
  
      const payload = ticket.getPayload();
  
      // Check if the user already exists in the database
      let user = await User.findOne({ email: payload.email });
      
      if (!user) {
        // If the user doesn't exist, create a new user
        user = await User.create({
          email: payload.email,
          username: payload.given_name, // First name from Google payload
          userType: 'User', // Default user type
        });
      }
  
      // Optionally, generate a JWT token for your application
      const jwtToken = generateJwtToken(user);
      // Send response with user data and token
      res.status(200).json({
        message: 'Google login successful',
        user: user,
        token: jwtToken,
      });
    } catch (err) {
      console.error('Error during Google login:', err.message);
      res.status(401).json({ error: 'Invalid Google token' });
    }
  });
  
  // Helper function to generate a JWT token (example)
  const generateJwtToken = (user) => {
    const jwt = require('jsonwebtoken');
    const secretKey = process.env.SECRET; // Replace with your actual secret key
    return jwt.sign(
      {
        id: user._id
      },
      secretKey,
      { expiresIn: '1h' } // Token validity
    );
  };
  

app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});
