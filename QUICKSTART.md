# 🚀 Quick Start Guide

Get your DLMM/DAMM Wallet Screener up and running in 15 minutes!

## ⚡ Fast Setup (5 Steps)

### Step 1: Get Your API Keys (10 minutes)

#### Helius API (Required)
1. Go to [https://helius.dev](https://helius.dev)
2. Click "Sign Up" (free account available)
3. Create a new project
4. Copy your API key (looks like: `abc123-def456-ghi789`)
5. ✅ Save it for Step 3

#### Birdeye API (Required)
1. Go to [https://birdeye.so](https://birdeye.so)
2. Navigate to "API" section
3. Sign up for free tier (500 requests/day)
4. Copy your API key
5. ✅ Save it for Step 3

### Step 2: Install Dependencies (2 minutes)

```bash
# Navigate to your project folder
cd dlmm-wallet-screener-pro

# Install all required packages
npm install

# Or if you use yarn
yarn install
```

**What gets installed:**
- React 18.2.0
- lucide-react (icons)
- react-scripts (build tools)

### Step 3: Configure API Keys (1 minute)

**Option A: Using .env file (Recommended)**

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your keys:
```env
REACT_APP_HELIUS_API_KEY=your_actual_helius_key_here
REACT_APP_BIRDEYE_API_KEY=your_actual_birdeye_key_here
```

**Option B: Direct code edit**

Open `dlmm-wallet-screener-pro.jsx` and find line ~30:
```javascript
const API_CONFIG = {
  HELIUS_API_KEY: 'paste_your_helius_key_here',
  HELIUS_RPC_URL: 'https://mainnet.helius-rpc.com/?api-key=paste_your_helius_key_here',
  BIRDEYE_API_KEY: 'paste_your_birdeye_key_here',
  // ... rest of config
};
```

### Step 4: Start the App (30 seconds)

```bash
npm start
```

The app will open at `http://localhost:3000` 🎉

### Step 5: Start Screening! (immediately)

1. **Discover Tab**: Click "Rescan" to find profitable wallets
2. **Filter**: Adjust criteria (min profit, ROI, etc.)
3. **Copy Address**: Click copy icon next to any wallet
4. **View on LP Agent**: Click button to see detailed analysis
5. **Track Wallets**: Star icon to add to your watchlist

---

## 📊 Your First Screening

### Finding Top Performers

1. **Set aggressive filters** to find the best:
   ```
   Min Profit: $5,000
   Min ROI: 50%
   Min Win Rate: 70%
   Strategy: All
   ```

2. **Click Rescan** and wait ~30 seconds

3. **Top 10 wallets** will appear - these are your targets!

4. **For each interesting wallet:**
   - Copy the address (click copy icon)
   - Open LP Agent link (click "View on LP Agent")
   - Verify their positions and strategy
   - If looks good → Star to add to tracking

### Building Your Watchlist

1. **Switch to "Tracked Wallets" tab**

2. **Add by address**:
   - Click "Add Wallet"
   - Paste a Solana wallet address you found
   - Click "Add Wallet" to analyze

3. **Monitor performance**:
   - Click "Refresh" to update all tracked wallets
   - See profit/ROI changes over time
   - Remove underperformers (trash icon)

---

## 🎯 Pro Tips

### Finding the Best Wallets

✅ **DO:**
- Start with high min profit ($5k+) to filter noise
- Look for high win rates (70%+) = consistency
- Check "Active Days" - avoid brand new wallets
- Verify on LP Agent before copying
- Track 10-20 wallets to compare strategies

❌ **DON'T:**
- Copy wallets blindly without verification
- Track too many wallets (gets overwhelming)
- Ignore win rate (profit alone can be lucky)
- Skip the LP Agent verification step

### Optimal Filter Settings by Goal

**Conservative (Low Risk)**
```
Min Profit: $1,000
Min ROI: 20%
Min Win Rate: 75%
Min Active Days: 90
```

**Balanced (Medium Risk)**
```
Min Profit: $3,000
Min ROI: 40%
Min Win Rate: 65%
Min Active Days: 60
```

**Aggressive (High Risk)**
```
Min Profit: $10,000
Min ROI: 100%
Min Win Rate: 60%
Min Active Days: 30
```

### Tracking Workflow

1. **Daily Check** (5 minutes)
   - Open "Tracked Wallets" tab
   - Click "Refresh"
   - Note any big changes in profit/ROI
   - Check LP Agent for significant position changes

2. **Weekly Review** (15 minutes)
   - Remove wallets with declining performance
   - Add 2-3 new high performers
   - Compare strategies across your watchlist
   - Adjust your own strategy based on findings

---

## 🔧 Common Issues & Fixes

### "API Status shows disconnected"

**Fix:**
1. Check your `.env` file has the correct keys
2. Make sure keys don't have quotes around them
3. Restart the app: `Ctrl+C` then `npm start`
4. Verify keys work by testing in browser console

### "No wallets found"

**Fix:**
1. Lower your filter thresholds
2. Try "All Strategies" in strategy filter
3. Check browser console for errors (F12)
4. Verify Meteora API is accessible

### "Failed to analyze wallet"

**Fix:**
1. Double-check wallet address is valid (44 chars)
2. Make sure you haven't hit API rate limits
3. Wait 1 minute and try again
4. Check if wallet actually has DLMM/DAMM positions

### Page won't load / White screen

**Fix:**
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Make sure you ran `npm install`
3. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

---

## 📱 Mobile Setup

The screener works on mobile! Here's how to access it:

### Local Network Access

1. **Find your computer's IP address**:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows
   ipconfig
   ```
   Look for something like `192.168.1.XXX`

2. **Start the app** with host binding:
   ```bash
   HOST=0.0.0.0 npm start
   ```

3. **Open on mobile**:
   `http://192.168.1.XXX:3000` (use your IP)

### Deploy for Always-On Access

**Easiest: Vercel (Free)**
1. Push code to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add environment variables in settings
4. Deploy!
5. Access from anywhere: `your-app.vercel.app`

---

## 🎓 Learning the Metrics

### Key Metrics Explained

**Profit ($)**
- Total USD profit from all positions
- Higher = more successful
- Look for $5k+ for serious traders

**ROI (%)**
- Return on Investment percentage
- `(Profit / Invested) × 100`
- 50%+ is excellent, 100%+ is exceptional

**Volume ($)**
- Total value of trades executed
- Shows activity level
- Higher = more experienced

**Win Rate (%)**
- Percentage of profitable positions
- `(Winning Positions / Total Positions) × 100`
- 70%+ indicates skill, not luck

**Strategy Type**
- **DLMM**: Dynamic Liquidity Market Maker
- **DAMM**: Dynamic Automated Market Maker  
- **Hybrid**: Uses both strategies

**Active Days**
- Days since first position
- Longer = more proven track record
- 90+ days = established trader

---

## 🚀 Next Steps

### After Setup

1. ✅ Run your first scan
2. ✅ Track 5-10 promising wallets
3. ✅ Verify each on LP Agent
4. ✅ Monitor for 1 week
5. ✅ Study successful strategies
6. ✅ Start implementing learnings

### Going Further

- Read the full [README.md](README.md) for advanced features
- Check [api-helpers.js](api-helpers.js) for custom integrations
- Join Meteora Discord for strategy discussions
- Share your findings with the community

---

## 💡 Remember

> **This is a research tool, not financial advice.**
>
> Always:
> - Verify wallets manually on LP Agent
> - Start small when copying strategies
> - Understand risks before investing
> - Do your own research (DYOR)

---

## 🎉 You're Ready!

You now have a powerful tool to discover and track profitable DLMM/DAMM strategies.

**Happy hunting, and may your LPs be profitable! 🌟**

---

## 📞 Need Help?

- **Issues?** Check the README troubleshooting section
- **API Questions?** See the API documentation links
- **Feature Requests?** Create an issue on GitHub

**Pro Tip:** The best way to learn is by using it daily. Set a reminder to check your tracked wallets every morning! ☕