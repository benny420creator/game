// Mock crypto prices
let bitcoinPrice = 50000;
let ethereumPrice = 3000;

// Function to update crypto prices
function updateCryptoPrices() {
    document.getElementById('bitcoin-price').innerText = `$${bitcoinPrice}`;
    document.getElementById('ethereum-price').innerText = `$${ethereumPrice}`;
    // Add more crypto price updates here if needed
}

// Function to update portfolio
function updatePortfolio(cashBalance, bitcoinHoldings, ethereumHoldings) {
    document.getElementById('cash-balance').innerText = `$${cashBalance}`;
    document.getElementById('bitcoin-holdings').innerText = bitcoinHoldings;
    document.getElementById('ethereum-holdings').innerText = ethereumHoldings;
    // Add more portfolio updates here if needed
}

// Buy function
document.getElementById('buy-btn').addEventListener('click', function() {
    let cryptoSelect = document.getElementById('crypto-select').value;
    let tradeAmount = parseInt(document.getElementById('trade-amount').value);

    if (cryptoSelect === 'bitcoin') {
        // Deduct cash and add bitcoin holdings
        cashBalance -= bitcoinPrice * tradeAmount;
        bitcoinHoldings += tradeAmount;
    } else if (cryptoSelect === 'ethereum') {
        // Deduct cash and add ethereum holdings
        cashBalance -= ethereumPrice * tradeAmount;
        ethereumHoldings += tradeAmount;
    }
    updatePortfolio(cashBalance, bitcoinHoldings, ethereumHoldings);
});

// Sell function
document.getElementById('sell-btn').addEventListener('click', function() {
    let cryptoSelect = document.getElementById('crypto-select').value;
    let tradeAmount = parseInt(document.getElementById('trade-amount').value);

    if (cryptoSelect === 'bitcoin' && bitcoinHoldings >= tradeAmount) {
        // Add cash and deduct bitcoin holdings
        cashBalance += bitcoinPrice * tradeAmount;
        bitcoinHoldings -= tradeAmount;
    } else if (cryptoSelect === 'ethereum' && ethereumHoldings >= tradeAmount) {
        // Add cash and deduct ethereum holdings
        cashBalance += ethereumPrice * tradeAmount;
        ethereumHoldings -= tradeAmount;
    }
    updatePortfolio(cashBalance, bitcoinHoldings, ethereumHoldings);
});

// Initial portfolio setup
let cashBalance = 10000;
let bitcoinHoldings = 0;
let ethereumHoldings = 0;
updatePortfolio(cashBalance, bitcoinHoldings, ethereumHoldings);

// Initial crypto prices update
updateCryptoPrices();
