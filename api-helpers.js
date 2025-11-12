// API Integration Examples and Helper Functions
// This file contains production-ready examples for integrating with various APIs

// ============================================
// HELIUS API INTEGRATION
// ============================================

/**
 * Fetch wallet balance from Helius RPC
 * @param {string} walletAddress - Solana wallet address
 * @param {string} apiKey - Helius API key
 * @returns {Promise<number>} - Balance in lamports
 */
export async function getWalletBalance(walletAddress, apiKey) {
  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'wallet-balance',
        method: 'getBalance',
        params: [walletAddress]
      })
    });
    
    const data = await response.json();
    return data.result?.value || 0;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return null;
  }
}

/**
 * Fetch transaction signatures for a wallet
 * @param {string} walletAddress - Solana wallet address
 * @param {string} apiKey - Helius API key
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise<Array>} - Array of transaction signatures
 */
export async function getWalletTransactions(walletAddress, apiKey, limit = 100) {
  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'get-transactions',
        method: 'getSignaturesForAddress',
        params: [walletAddress, { limit }]
      })
    });
    
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

/**
 * Fetch parsed transaction details
 * @param {string} signature - Transaction signature
 * @param {string} apiKey - Helius API key
 * @returns {Promise<Object>} - Parsed transaction data
 */
export async function getParsedTransaction(signature, apiKey) {
  try {
    const response = await fetch(`https://api.helius.xyz/v0/transactions?api-key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transactions: [signature]
      })
    });
    
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching parsed transaction:', error);
    return null;
  }
}

// ============================================
// BIRDEYE API INTEGRATION
// ============================================

/**
 * Fetch wallet portfolio from Birdeye
 * @param {string} walletAddress - Solana wallet address
 * @param {string} apiKey - Birdeye API key
 * @returns {Promise<Object>} - Portfolio data
 */
export async function getBirdeyePortfolio(walletAddress, apiKey) {
  try {
    const response = await fetch(
      `https://public-api.birdeye.so/v1/wallet/token_list?wallet=${walletAddress}`,
      {
        headers: {
          'X-API-KEY': apiKey,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching Birdeye portfolio:', error);
    return null;
  }
}

/**
 * Fetch wallet transaction history from Birdeye
 * @param {string} walletAddress - Solana wallet address
 * @param {string} apiKey - Birdeye API key
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise<Array>} - Transaction history
 */
export async function getBirdeyeTransactions(walletAddress, apiKey, limit = 100) {
  try {
    const response = await fetch(
      `https://public-api.birdeye.so/v1/wallet/tx_list?wallet=${walletAddress}&limit=${limit}`,
      {
        headers: {
          'X-API-KEY': apiKey,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data?.items || [];
  } catch (error) {
    console.error('Error fetching Birdeye transactions:', error);
    return [];
  }
}

/**
 * Calculate wallet PnL from Birdeye data
 * @param {string} walletAddress - Solana wallet address
 * @param {string} apiKey - Birdeye API key
 * @returns {Promise<Object>} - PnL data
 */
export async function calculateWalletPnL(walletAddress, apiKey) {
  try {
    const portfolio = await getBirdeyePortfolio(walletAddress, apiKey);
    
    if (!portfolio) return null;
    
    let totalValue = 0;
    let totalCost = 0;
    
    portfolio.forEach(token => {
      totalValue += token.valueUsd || 0;
      // Note: You'll need transaction history to calculate accurate cost basis
      // This is a simplified calculation
    });
    
    const unrealizedPnL = totalValue - totalCost;
    const roi = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
    
    return {
      totalValue,
      totalCost,
      unrealizedPnL,
      roi: roi.toFixed(2)
    };
  } catch (error) {
    console.error('Error calculating PnL:', error);
    return null;
  }
}

// ============================================
// METEORA API INTEGRATION
// ============================================

/**
 * Fetch all DLMM pools from Meteora
 * @returns {Promise<Array>} - Array of pool data
 */
export async function getMeteoraPoolS() {
  try {
    const response = await fetch('https://app.meteora.ag/api/pools');
    
    if (!response.ok) {
      throw new Error(`Meteora API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching Meteora pools:', error);
    return [];
  }
}

/**
 * Fetch positions for a specific pool
 * @param {string} poolAddress - Pool address
 * @returns {Promise<Array>} - Array of positions
 */
export async function getPoolPositions(poolAddress) {
  try {
    const response = await fetch(
      `https://app.meteora.ag/api/pools/${poolAddress}/positions`
    );
    
    if (!response.ok) {
      throw new Error(`Meteora API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching pool positions:', error);
    return [];
  }
}

/**
 * Fetch positions for a specific wallet
 * @param {string} walletAddress - Wallet address
 * @returns {Promise<Array>} - Array of wallet positions
 */
export async function getWalletPositions(walletAddress) {
  try {
    const response = await fetch(
      `https://app.meteora.ag/api/positions/${walletAddress}`
    );
    
    if (!response.ok) {
      throw new Error(`Meteora API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching wallet positions:', error);
    return [];
  }
}

/**
 * Calculate position metrics
 * @param {Object} position - Position data from Meteora
 * @returns {Object} - Calculated metrics
 */
export function calculatePositionMetrics(position) {
  const deposited = position.totalDeposited || 0;
  const current = position.currentValue || 0;
  const fees = position.feesEarned || 0;
  
  const pnl = current + fees - deposited;
  const roi = deposited > 0 ? (pnl / deposited) * 100 : 0;
  
  return {
    deposited,
    currentValue: current,
    feesEarned: fees,
    pnl,
    roi: roi.toFixed(2),
    isProfit: pnl > 0
  };
}

// ============================================
// COMPREHENSIVE WALLET ANALYSIS
// ============================================

/**
 * Complete wallet analysis combining all data sources
 * @param {string} walletAddress - Solana wallet address
 * @param {Object} apiKeys - Object containing all API keys
 * @returns {Promise<Object>} - Complete wallet analysis
 */
export async function analyzeWalletComplete(walletAddress, apiKeys) {
  try {
    // Fetch data from all sources in parallel
    const [
      balance,
      transactions,
      birdeyePortfolio,
      meteoraPositions
    ] = await Promise.all([
      getWalletBalance(walletAddress, apiKeys.helius),
      getWalletTransactions(walletAddress, apiKeys.helius, 1000),
      getBirdeyePortfolio(walletAddress, apiKeys.birdeye),
      getWalletPositions(walletAddress)
    ]);
    
    // Calculate metrics from Meteora positions
    const positionMetrics = meteoraPositions.map(calculatePositionMetrics);
    const totalProfit = positionMetrics.reduce((sum, p) => sum + p.pnl, 0);
    const totalDeposited = positionMetrics.reduce((sum, p) => sum + p.deposited, 0);
    const totalFees = positionMetrics.reduce((sum, p) => sum + p.feesEarned, 0);
    
    const overallROI = totalDeposited > 0 ? (totalProfit / totalDeposited) * 100 : 0;
    
    // Calculate win rate
    const winningPositions = positionMetrics.filter(p => p.isProfit).length;
    const winRate = positionMetrics.length > 0 
      ? (winningPositions / positionMetrics.length) * 100 
      : 0;
    
    // Determine strategy
    const dlmmPositions = meteoraPositions.filter(p => p.type === 'DLMM').length;
    const dammPositions = meteoraPositions.filter(p => p.type === 'DAMM').length;
    let strategy = 'Hybrid';
    if (dlmmPositions > dammPositions * 2) strategy = 'DLMM';
    else if (dammPositions > dlmmPositions * 2) strategy = 'DAMM';
    
    // Calculate activity metrics
    const oldestTx = transactions[transactions.length - 1];
    const activeDays = oldestTx 
      ? Math.floor((Date.now() - oldestTx.blockTime * 1000) / (1000 * 60 * 60 * 24))
      : 0;
    
    const lastTx = transactions[0];
    const hoursSinceLastActivity = lastTx
      ? Math.floor((Date.now() - lastTx.blockTime * 1000) / (1000 * 60 * 60))
      : 0;
    
    return {
      address: walletAddress,
      balance: balance / 1e9, // Convert lamports to SOL
      totalProfit,
      totalDeposited,
      totalFees,
      roi: overallROI.toFixed(2),
      winRate: winRate.toFixed(1),
      strategy,
      positions: meteoraPositions.length,
      activeDays,
      lastActive: hoursSinceLastActivity < 24 
        ? `${hoursSinceLastActivity}h ago`
        : `${Math.floor(hoursSinceLastActivity / 24)}d ago`,
      topPool: meteoraPositions[0]?.pool || 'N/A',
      volume: totalDeposited * 2, // Simplified volume calculation
      portfolioValue: birdeyePortfolio?.reduce((sum, t) => sum + (t.valueUsd || 0), 0) || 0,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in complete wallet analysis:', error);
    return null;
  }
}

// ============================================
// RATE LIMITING & CACHING
// ============================================

class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  async throttle() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.throttle();
    }
    
    this.requests.push(now);
  }
}

class Cache {
  constructor(ttl = 300000) { // Default 5 minutes
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  clear() {
    this.cache.clear();
  }
}

// Usage example:
// const heliusLimiter = new RateLimiter(100, 60000); // 100 requests per minute
// const walletCache = new Cache(300000); // 5 minute cache

export const rateLimiters = {
  helius: new RateLimiter(100, 60000),
  birdeye: new RateLimiter(10, 60000),
  meteora: new RateLimiter(50, 60000)
};

export const cache = new Cache();

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Analyze multiple wallets in batches
 * @param {Array<string>} walletAddresses - Array of wallet addresses
 * @param {Object} apiKeys - API keys object
 * @param {number} batchSize - Number of wallets to process simultaneously
 * @returns {Promise<Array>} - Array of analysis results
 */
export async function analyzeBatch(walletAddresses, apiKeys, batchSize = 5) {
  const results = [];
  
  for (let i = 0; i < walletAddresses.length; i += batchSize) {
    const batch = walletAddresses.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(address => analyzeWalletComplete(address, apiKeys))
    );
    
    results.push(...batchResults.filter(r => r !== null));
    
    // Small delay between batches to respect rate limits
    if (i + batchSize < walletAddresses.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

// ============================================
// ERROR HANDLING WRAPPER
// ============================================

/**
 * Wrap API calls with retry logic and error handling
 * @param {Function} apiCall - The API function to call
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} - Result of API call
 */
export async function withRetry(apiCall, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      console.log(`Retry ${i + 1}/${maxRetries} after error:`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

// Usage example:
// const result = await withRetry(() => getWalletBalance(address, apiKey));

export default {
  getWalletBalance,
  getWalletTransactions,
  getParsedTransaction,
  getBirdeyePortfolio,
  getBirdeyeTransactions,
  calculateWalletPnL,
  getMeteoraPoolS,
  getPoolPositions,
  getWalletPositions,
  calculatePositionMetrics,
  analyzeWalletComplete,
  analyzeBatch,
  withRetry,
  rateLimiters,
  cache
};