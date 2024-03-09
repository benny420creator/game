let walletBalance = 10000;
let portfolio = {};
let cryptos = {
    'Bitcoin': { price: 10000 },
    'Ethereum': { price: 4000 },
    'Litecoin': { price: 150 }
};

function updatePrices() {
    for (let crypto in cryptos) {
        let change = Math.floor(Math.random() * 1000) - 500;
        cryptos[crypto].price = Math.max(100, cryptos[crypto].price + change);
    }
    displayCryptos();
}

function displayCryptos() {
    const cryptoList = document.getElementById('cryptos');
    cryptoList.innerHTML = '';
    for (let crypto in cryptos) {
        let li = document.createElement('li');
        li.innerHTML = `${crypto}: $${cryptos[crypto].price} <button onclick="buyCrypto('${crypto}', 1)">Buy</button>`;
        cryptoList.appendChild(li);
    }
}

function updatePortfolioDisplay() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '';
    for (let crypto in portfolio) {
        let li = document.createElement('li');
        li.textContent = `${crypto}: ${portfolio[crypto]} units`;
        portfolioList.appendChild(li);
    }
}

function buyCrypto(cryptoName, units) {
    let cost = cryptos[cryptoName].price * units;
    if (walletBalance >= cost) {
        walletBalance -= cost;
        portfolio[cryptoName] = (portfolio[cryptoName] || 0) + units;
        updateWallet();
        updatePortfolioDisplay();
    } else {
        alert("Not enough funds to buy.");
    }
}

function updateWallet() {
    document.getElementById("walletBalance").textContent = '$' + walletBalance.toFixed(2);
}

// Initialize the app
updateWallet();
displayCryptos();
updatePortfolioDisplay();
setInterval(updatePrices, 10000); // Update prices every 10 seconds
