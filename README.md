# DLMM/DAMM Wallet Screener Pro - Production Setup Guide

## 🚀 Features

### Core Functionality
- **Wallet Discovery**: Automatically scan and discover profitable DLMM/DAMM wallets
- **Advanced Filtering**: Filter by profit, ROI, volume, win rate, strategy type, and active days
- **Wallet Tracking**: Add wallets to a watchlist and monitor their performance over time
- **Clipboard Support**: One-click copy wallet addresses for manual verification
- **LP Agent Integration**: Direct links to LP Agent for detailed wallet analysis
- **Real-time Data**: Fetches live data from multiple blockchain APIs
- **Persistent Storage**: Tracked wallets saved locally in browser storage
- **Performance Metrics**: Comprehensive analytics including profit, ROI, win rate, and more

### Production-Ready Features
- Multiple API integrations (Helius, Meteora, Birdeye)
- Error handling and fallback mechanisms
- API status monitoring
- Responsive design optimized for all devices
- Real-time wallet analysis
- Historical tracking of wallet performance

---

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- React 18+
- API keys from the following services:
  - Helius (RPC access)
  - Birdeye (wallet analytics)
  - Meteora (DLMM pool data)

---

## 🔑 Getting API Keys

### 1. Helius RPC API
Helius provides high-performance Solana RPC access.

**Steps:**
1. Visit [https://helius.dev](https://helius.dev)
2. Sign up for a free account
3. Create a new project
4. Copy your API key from the dashboard
5. Your RPC URL will be: `https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY`

**Free Tier:** 100,000 requests/day

**Cost:** 
- Free: $0/month (100k requests)
- Developer: $29/month (1M requests)
- Pro: $149/month (10M requests)

### 2. Birdeye API
Birdeye provides comprehensive Solana wallet analytics and token data.

**Steps:**
1. Visit [https://birdeye.so](https://birdeye.so)
2. Navigate to the API section
3. Sign up for an API key
4. Copy your API key from the dashboard

**Free Tier:** 500 requests/day

**Cost:**
- Free: $0/month (500 requests/day)
- Basic: $49/month (10k requests/day)
- Pro: $199/month (100k requests/day)

### 3. Meteora API
Meteora provides DLMM/DAMM pool and position data.

**Steps:**
1. Check Meteora's official documentation at [https://docs.meteora.ag](https://docs.meteora.ag)
2. Most endpoints are public, but rate-limited
3. For higher limits, contact Meteora team for API access

**Note:** As of now, Meteora's API is mostly public. Check their docs for latest info.

---

## 🛠️ Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

**Required packages:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  }
}
```

### Step 2: Configure API Keys

Open the React component and locate the `API_CONFIG` object (around line 30):

```javascript
const API_CONFIG = {
  HELIUS_API_KEY: 'YOUR_HELIUS_API_KEY', // Replace with your key
  HELIUS_RPC_URL: 'https://mainnet.helius-rpc.com/?api-key=YOUR_HELIUS_API_KEY',
  METEORA_API: 'https://app.meteora.ag/api',
  BIRDEYE_API: 'https://public-api.birdeye.so',
  BIRDEYE_API_KEY: 'YOUR_BIRDEYE_API_KEY' // Replace with your key
};
```

**Replace the placeholder values:**
- `YOUR_HELIUS_API_KEY` → Your actual Helius API key
- `YOUR_BIRDEYE_API_KEY` → Your actual Birdeye API key

### Step 3: Environment Variables (Recommended)

For better security, use environment variables:

Create a `.env` file:
```env
REACT_APP_HELIUS_API_KEY=your_helius_key_here
REACT_APP_BIRDEYE_API_KEY=your_birdeye_key_here
```

Update the code to use environment variables:
```javascript
const API_CONFIG = {
  HELIUS_API_KEY: process.env.REACT_APP_HELIUS_API_KEY,
  HELIUS_RPC_URL: `https://mainnet.helius-rpc.com/?api-key=${process.env.REACT_APP_HELIUS_API_KEY}`,
  METEORA_API: 'https://app.meteora.ag/api',
  BIRDEYE_API: 'https://public-api.birdeye.so',
  BIRDEYE_API_KEY: process.env.REACT_APP_BIRDEYE_API_KEY
};
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

### Production Build

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build/` directory.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `REACT_APP_HELIUS_API_KEY`
   - `REACT_APP_BIRDEYE_API_KEY`
5. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag and drop the `build/` folder
4. Add environment variables in Netlify dashboard

### Deploy to AWS S3 + CloudFront

```bash
npm run build
aws s3 sync build/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## 📊 API Integration Details

### Helius RPC API

**Purpose:** Fetch wallet balances and transaction data

**Endpoints Used:**
```javascript
// Get wallet balance
POST https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
{
  "jsonrpc": "2.0",
  "id": "wallet-balance",
  "method": "getBalance",
  "params": ["WALLET_ADDRESS"]
}

// Get transaction history
POST https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
{
  "jsonrpc": "2.0",
  "id": "get-transactions",
  "method": "getSignaturesForAddress",
  "params": ["WALLET_ADDRESS", { "limit": 100 }]
}
```

**Rate Limits:** 
- Free: 100k requests/day
- Paid: Up to 10M requests/day

### Birdeye API

**Purpose:** Wallet portfolio analytics and token data

**Endpoints Used:**
```javascript
// Get wallet portfolio
GET https://public-api.birdeye.so/v1/wallet/token_list?wallet=WALLET_ADDRESS
Headers: { 'X-API-KEY': 'YOUR_KEY' }

// Get transaction history
GET https://public-api.birdeye.so/v1/wallet/tx_list?wallet=WALLET_ADDRESS&limit=100
Headers: { 'X-API-KEY': 'YOUR_KEY' }
```

**Rate Limits:**
- Free: 500 requests/day
- Basic: 10k requests/day
- Pro: 100k requests/day

### Meteora API

**Purpose:** DLMM/DAMM pool and position data

**Endpoints Used:**
```javascript
// Get all pools
GET https://app.meteora.ag/api/pools

// Get positions for a pool
GET https://app.meteora.ag/api/pools/POOL_ADDRESS/positions

// Get user positions
GET https://app.meteora.ag/api/positions/WALLET_ADDRESS
```

**Rate Limits:** Public endpoints with standard rate limiting (check docs)

---

## 🎯 How to Use

### 1. Discover Wallets Tab

**Purpose:** Find profitable DLMM/DAMM wallets based on your criteria

**Steps:**
1. Set your filter criteria:
   - Minimum profit threshold (USD)
   - Minimum ROI percentage
   - Minimum trading volume
   - Minimum win rate
   - Active days (how long the wallet has been active)
   - Strategy type (DLMM, DAMM, or Hybrid)

2. Click "Rescan" to fetch latest data

3. Browse results sorted by profitability

4. For each wallet you can:
   - **Copy Address**: Click the copy icon to copy full wallet address
   - **Add to Tracking**: Click the star icon to add to your watchlist
   - **View on LP Agent**: Click button to open detailed analysis on lpagent.io

### 2. Tracked Wallets Tab

**Purpose:** Monitor performance of wallets you're interested in

**Features:**
- View all tracked wallets in one place
- See historical performance data
- Add custom wallets by address
- Remove wallets from tracking
- Refresh data for all tracked wallets

**Adding a Wallet:**
1. Click "Add Wallet" button
2. Enter the Solana wallet address (44 characters)
3. Click "Add Wallet" to analyze and add to tracking
4. The wallet will be analyzed and added with current performance metrics

**Monitoring:**
- Tracked wallets are stored locally in your browser
- Click "Refresh" to update all tracked wallet data
- Historical data is saved showing profit/ROI changes over time

---

## 🔧 Customization

### Adjusting Scan Parameters

Modify the `scanProfitableWallets` function to customize scanning:

```javascript
// Change number of pools to scan
for (const pool of pools.slice(0, 10)) { // Change 10 to scan more/fewer pools
  
// Change number of wallets to analyze
const walletPromises = Array.from(walletAddresses).slice(0, 50).map(...) // Change 50
```

### Adding More Filters

Add new filter in the `filters` state:

```javascript
const [filters, setFilters] = useState({
  // ... existing filters
  minPositions: 5, // New filter
});

// Add filter logic
const meetsPositions = wallet.positions >= filters.minPositions;
```

### Custom Metrics

Add custom metrics to the wallet analysis:

```javascript
const calculateWalletMetrics = (heliusData, meteoraData, birdeyeData) => {
  // ... existing calculations
  
  // Add your custom metric
  const customMetric = calculateYourMetric(data);
  
  return {
    // ... existing metrics
    customMetric
  };
};
```

---

## 🐛 Troubleshooting

### Issue: API Status shows "disconnected"

**Solution:**
- Check that API keys are correctly configured
- Verify API keys are valid and not expired
- Check network connection
- Verify API endpoints are correct

### Issue: No wallets found during scan

**Solution:**
- Check Meteora API is accessible
- Verify pool data is being fetched correctly
- Lower filter thresholds
- Check browser console for error messages

### Issue: "Failed to analyze wallet"

**Solution:**
- Verify wallet address is valid (44 characters, base58)
- Check API rate limits haven't been exceeded
- Ensure all API services are operational
- Check browser console for specific error

### Issue: Tracked wallets not persisting

**Solution:**
- Check localStorage is enabled in browser
- Clear browser cache and try again
- Verify browser supports localStorage
- Check for browser extensions blocking storage

---

## 💡 Best Practices

### API Usage
1. **Cache responses** when possible to reduce API calls
2. **Implement retry logic** with exponential backoff
3. **Monitor rate limits** and implement throttling
4. **Use batch requests** when APIs support it

### Security
1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Implement CORS** if deploying to production
4. **Validate user inputs** before making API calls

### Performance
1. **Implement pagination** for large result sets
2. **Use lazy loading** for wallet lists
3. **Debounce filter changes** to reduce re-renders
4. **Cache wallet analysis results** locally

### User Experience
1. **Show loading states** during API calls
2. **Display error messages** clearly
3. **Provide tooltips** for complex metrics
4. **Save user preferences** in localStorage

---

## 📈 Future Enhancements

- [ ] Historical performance charts using Chart.js or Recharts
- [ ] Email/Discord notifications for tracked wallets
- [ ] CSV export of wallet data
- [ ] Advanced analytics dashboard
- [ ] Copy trading integration
- [ ] Mobile app version
- [ ] Multi-wallet comparison
- [ ] Automated strategy backtesting
- [ ] Social features (share watchlists)
- [ ] Integration with other DEX protocols

---

## 🔐 Security Considerations

### API Key Protection
- Never expose API keys in client-side code in production
- Use a backend proxy server to make API calls
- Implement authentication for your application
- Rotate API keys regularly

### Recommended Architecture
```
User → Frontend → Backend API (Your Server) → External APIs
```

**Benefits:**
- API keys hidden from users
- Rate limiting per user
- Additional validation layer
- Caching opportunities

---

## 📞 Support & Resources

### API Documentation
- [Helius Docs](https://docs.helius.dev)
- [Birdeye Docs](https://docs.birdeye.so)
- [Meteora Docs](https://docs.meteora.ag)
- [Solana Docs](https://docs.solana.com)

### Community
- Meteora Discord: [Join](https://discord.gg/meteora)
- Solana Discord: [Join](https://discord.gg/solana)

### Additional Tools
- [LP Agent](https://lpagent.io) - Detailed wallet analysis
- [Solscan](https://solscan.io) - Blockchain explorer
- [Birdeye](https://birdeye.so) - Token analytics

---

## 📄 License

This project is provided as-is for educational and personal use.

---

## ⚠️ Disclaimer

This tool is for informational purposes only. Always conduct your own research before making investment decisions. Past performance does not guarantee future results. The creators are not responsible for any financial losses incurred from using this tool.

**Remember:** 
- DYOR (Do Your Own Research)
- Never invest more than you can afford to lose
- Verify wallet addresses manually before copying strategies
- Check LP Agent for detailed analysis before making decisions

---

## 🎉 Happy Hunting!

Start discovering profitable DLMM/DAMM strategies and build your watchlist. Good luck with your liquidity provision journey!