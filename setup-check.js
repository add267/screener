#!/usr/bin/env node

/**
 * DLMM Wallet Screener - Configuration Checker
 * 
 * Run this script to verify your API keys and setup before using the app
 * 
 * Usage:
 *   node setup-check.js
 * 
 * Or add to package.json scripts:
 *   "check": "node setup-check.js"
 * Then run:
 *   npm run check
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bold}${msg}${colors.reset}\n`)
};

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    log.warning('.env file not found');
    return null;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      if (key && value) {
        envVars[key] = value;
      }
    }
  });
  
  return envVars;
}

// Test API endpoint
function testApiEndpoint(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, status: res.statusCode, data });
        } else {
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test Helius API
async function testHelius(apiKey) {
  if (!apiKey || apiKey === 'YOUR_HELIUS_API_KEY' || apiKey === 'your_helius_api_key_here') {
    return { success: false, message: 'API key not configured' };
  }
  
  try {
    const response = await testApiEndpoint(
      `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
      { 'Content-Type': 'application/json' }
    );
    
    if (response.success) {
      return { success: true, message: 'Connected successfully' };
    } else {
      return { success: false, message: `HTTP ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Test Birdeye API
async function testBirdeye(apiKey) {
  if (!apiKey || apiKey === 'YOUR_BIRDEYE_API_KEY' || apiKey === 'your_birdeye_api_key_here') {
    return { success: false, message: 'API key not configured' };
  }
  
  try {
    // Test with a simple token list endpoint
    const response = await testApiEndpoint(
      'https://public-api.birdeye.so/public/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=0&limit=1',
      { 'X-API-KEY': apiKey }
    );
    
    if (response.success) {
      return { success: true, message: 'Connected successfully' };
    } else if (response.status === 401) {
      return { success: false, message: 'Invalid API key' };
    } else if (response.status === 429) {
      return { success: false, message: 'Rate limit exceeded' };
    } else {
      return { success: false, message: `HTTP ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Test Meteora API
async function testMeteora() {
  try {
    const response = await testApiEndpoint('https://app.meteora.ag/api/pools');
    
    if (response.success) {
      return { success: true, message: 'Connected successfully' };
    } else {
      return { success: false, message: `HTTP ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// Check package.json dependencies
function checkDependencies() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    return { success: false, message: 'package.json not found' };
  }
  
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const required = ['react', 'react-dom', 'lucide-react'];
  const missing = required.filter(dep => !pkg.dependencies || !pkg.dependencies[dep]);
  
  if (missing.length > 0) {
    return { 
      success: false, 
      message: `Missing: ${missing.join(', ')}. Run: npm install` 
    };
  }
  
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    return { 
      success: false, 
      message: 'node_modules not found. Run: npm install' 
    };
  }
  
  return { success: true, message: 'All dependencies installed' };
}

// Main check function
async function runChecks() {
  console.log(`
${colors.bold}╔═══════════════════════════════════════════════════════╗
║   DLMM Wallet Screener - Configuration Checker       ║
╚═══════════════════════════════════════════════════════╝${colors.reset}
  `);
  
  // Check 1: Environment Variables
  log.header('1. Checking Environment Variables');
  const env = loadEnvFile();
  
  if (!env) {
    log.error('.env file not found');
    log.info('Create .env file: cp .env.example .env');
    log.info('Then add your API keys to the .env file\n');
  } else {
    log.success('.env file found');
    
    if (env.REACT_APP_HELIUS_API_KEY) {
      log.success('Helius API key configured');
    } else {
      log.error('Helius API key missing');
    }
    
    if (env.REACT_APP_BIRDEYE_API_KEY) {
      log.success('Birdeye API key configured');
    } else {
      log.error('Birdeye API key missing');
    }
  }
  
  // Check 2: Dependencies
  log.header('2. Checking Dependencies');
  const depsCheck = checkDependencies();
  
  if (depsCheck.success) {
    log.success(depsCheck.message);
  } else {
    log.error(depsCheck.message);
  }
  
  // Check 3: API Connectivity
  log.header('3. Testing API Connections');
  
  if (env) {
    // Test Helius
    process.stdout.write('Testing Helius API... ');
    const heliusResult = await testHelius(env.REACT_APP_HELIUS_API_KEY);
    if (heliusResult.success) {
      log.success(heliusResult.message);
    } else {
      log.error(heliusResult.message);
      log.info('Get API key: https://helius.dev');
    }
    
    // Test Birdeye
    process.stdout.write('Testing Birdeye API... ');
    const birdeyeResult = await testBirdeye(env.REACT_APP_BIRDEYE_API_KEY);
    if (birdeyeResult.success) {
      log.success(birdeyeResult.message);
    } else {
      log.error(birdeyeResult.message);
      log.info('Get API key: https://birdeye.so');
    }
  } else {
    log.warning('Skipping API tests - no .env file');
  }
  
  // Test Meteora (no auth needed)
  process.stdout.write('Testing Meteora API... ');
  const meteoraResult = await testMeteora();
  if (meteoraResult.success) {
    log.success(meteoraResult.message);
  } else {
    log.error(meteoraResult.message);
    log.info('Meteora API might be down or unreachable');
  }
  
  // Check 4: Files
  log.header('4. Checking Project Files');
  
  const requiredFiles = [
    'dlmm-wallet-screener-pro.jsx',
    'package.json',
    'README.md',
    'api-helpers.js'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      log.success(`${file} found`);
    } else {
      log.error(`${file} not found`);
    }
  });
  
  // Summary
  log.header('Summary');
  
  const allGood = 
    env && 
    env.REACT_APP_HELIUS_API_KEY && 
    env.REACT_APP_BIRDEYE_API_KEY &&
    depsCheck.success;
  
  if (allGood) {
    console.log(`${colors.green}${colors.bold}
┌─────────────────────────────────────────────┐
│  ✓ All checks passed!                       │
│                                             │
│  You're ready to start the app:            │
│  $ npm start                                │
│                                             │
│  Or read the Quick Start guide:            │
│  $ cat QUICKSTART.md                        │
└─────────────────────────────────────────────┘
${colors.reset}`);
  } else {
    console.log(`${colors.yellow}${colors.bold}
┌─────────────────────────────────────────────┐
│  ⚠ Some checks failed                       │
│                                             │
│  Fix the issues above, then run:           │
│  $ npm run check                            │
│                                             │
│  Need help? Read:                           │
│  $ cat QUICKSTART.md                        │
└─────────────────────────────────────────────┘
${colors.reset}`);
  }
  
  console.log('\n');
}

// Run the checks
runChecks().catch(error => {
  log.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});
