const express = require('express');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connect = require('./configs/db');

const PORT = 5000; // ✅ Updated port from 8080 to 5000

// Import Route Files
const { 
    userRoute, 
    conversationRoute, 
    gigRoute, 
    messageRoute, 
    orderRoute, 
    reviewRoute, 
    authRoute 
} = require('./routes');

// Initialize Express App
const app = express();

// ✅ Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// ✅ CORS Configuration (Allow Frontend Access)
app.use(cors({
    origin: [
        'http://localhost:5173/',  // ✅ Added React Frontend URL
        'http://localhost:5173',
        'http://localhost:4173',
        'https://workhive-one.vercel.app'
    ],
    credentials: true
}));

// ✅ API Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/orders', orderRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);

// ✅ Root Route
app.get('/', (req, res) => {
    res.send('Hello, Topper! Backend is running successfully.');
});

// ✅ Get IP Route
app.get('/ip', (req, res) => {
    const list = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ips = list.split(',');

    return res.send({ ip: ips[0] });
});

// ✅ Start Server
app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`🚀 Server running at: http://localhost:${PORT}`);
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
});
