// Function to update crypto prices
function updateCryptoPrices() {
    bitcoinPrice += getRandomChange();
    ethereumPrice += getRandomChange();

    document.getElementById('bitcoin-price').innerText = `$${bitcoinPrice.toFixed(2)}`;
    document.getElementById('ethereum-price').innerText = `$${ethereumPrice.toFixed(2)}`;
}

// Function to get random change
function getRandomChange() {
    return (Math.random() - 0.5) * 10; // Change between -5 and 5
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

// Initial crypto prices
let bitcoinPrice = 50000;
let ethereumPrice = 3000;
updateCryptoPrices();

// Update prices every second
setInterval(updateCryptoPrices, 1000);
