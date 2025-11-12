# Environment Variables Configuration

This application requires API keys to fetch real-time blockchain data. Follow these steps to configure your environment variables.

## Required API Keys

### 1. Helius RPC API Key
- **Purpose**: Access Solana blockchain data and wallet information
- **Get it at**: [https://helius.dev](https://helius.dev)
- **Free tier**: Available
- **Environment variable**: `REACT_APP_HELIUS_API_KEY`

### 2. Birdeye API Key
- **Purpose**: Wallet analytics, token prices, and transaction history
- **Get it at**: [https://birdeye.so](https://birdeye.so)
- **Free tier**: Available with rate limits
- **Environment variable**: `REACT_APP_BIRDEYE_API_KEY`

## Setting Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `REACT_APP_HELIUS_API_KEY` | Your Helius API key | Production, Preview, Development |
   | `REACT_APP_BIRDEYE_API_KEY` | Your Birdeye API key | Production, Preview, Development |

4. Click **Save** for each variable
5. **Redeploy** your application for the changes to take effect

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your actual API keys:
   ```env
   REACT_APP_HELIUS_API_KEY=your_actual_helius_key_here
   REACT_APP_BIRDEYE_API_KEY=your_actual_birdeye_key_here
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Status Indicator

The application includes an API status indicator in the header that shows:
- 🟢 **Green**: API key is configured
- 🔴 **Red**: API key is missing

If all indicators show red after deployment, verify that:
1. Environment variables are set in Vercel
2. Variable names are correct (including the `REACT_APP_` prefix)
3. You've redeployed after adding the variables

## Optional Configuration

### Meteora API
- **Default**: `https://app.meteora.ag/api`
- **Environment variable**: `REACT_APP_METEORA_API`
- Only set this if you need to use a different Meteora API endpoint

### Birdeye API Base URL
- **Default**: `https://public-api.birdeye.so`
- **Environment variable**: `REACT_APP_BIRDEYE_API`
- Only set this if you need to use a different Birdeye API endpoint

## Troubleshooting

### "API keys not configured" message
- Ensure environment variables are set in Vercel
- Redeploy after adding variables
- Check variable names (they are case-sensitive)

### API calls failing
- Verify your API keys are valid
- Check API rate limits
- Review browser console for detailed error messages

## Security Notes

- ⚠️ **Never commit `.env.local` to version control**
- API keys are embedded in the client-side build (this is normal for Create React App)
- For production apps handling sensitive data, consider implementing a backend proxy
- Rotate your API keys regularly
- Monitor your API usage to detect unauthorized access
