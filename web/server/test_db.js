const mongoose = require('mongoose');
const dotenv = require('dotenv');

const dns = require('dns');

// TEST: Try setting DNS to Google's 8.8.8.8
try {
    dns.setServers(['8.8.8.8']);
    console.log('Using Google DNS (8.8.8.8) for this test...');
} catch (e) {
    console.log('Could not set custom DNS servers.');
}

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');
console.log('URI:', uri.replace(/\/\/.*:.*@/, '//<user>:<password>@')); // Log URI without credentials

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Successfully connected to MongoDB Atlas!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection failed!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        console.error('Error Code:', err.code);
        
        if (err.message.includes('querySrv ECONNREFUSED')) {
            console.log('\n--- Troubleshooting Tips ---');
            console.log('1. Check your internet connection.');
            console.log('2. Ensure your IP is whitelisted in MongoDB Atlas (Network Access).');
            console.log('3. If you are on a VPN or restricted network, try disconnecting.');
            console.log('4. Try changing your DNS to 8.8.8.8 (Google DNS).');
            console.log('5. Try using the standard connection string (mongodb://) instead of the SRV one (mongodb+srv://).');
        }
        
        process.exit(1);
    });
