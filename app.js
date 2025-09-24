require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const partnerRequest = require('./routes/partnerRequest');
const partner = require('./routes/partner');
const adminRoutes = require('./routes/admin');
const inquiry = require('./routes/inquiry');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/partnerRequest', partnerRequest);
app.use('/api/partner', partner);
app.use('/api/admin', adminRoutes);
app.use('/api/inquiry', inquiry);

app.get('/', (req, res) => res.send('Pixisphere Backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
