let walletBalance = 10000;
let cryptoBalance = 0;
let borrowedAmount = 0;
let interestRate = 0.05; // 5% interest rate for simplicity
let cryptoPrice = 500; // Starting price of CC

const walletBalanceEl = document.getElementById('walletBalance');
const cryptoBalanceEl = document.getElementById('cryptoBalance');
const borrowedAmountEl = document.getElementById('borrowedAmount');
const cryptoChartEl = document.getElementById('cryptoChart').getContext('2d');

let chart = new Chart(cryptoChartEl, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CryptoCoin Price',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
});

function updateUI() {
    walletBalanceEl.textContent = walletBalance.toFixed(2);
    cryptoBalanceEl.textContent = cryptoBalance;
    borrowedAmountEl.textContent = borrowedAmount.toFixed(2);
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(cryptoPrice);
    });
    chart.update();
}

function changeCryptoPrice() {
    // Simulate price change
    cryptoPrice += (Math.random() - 0.5) * 100;
    updateUI();
}

function buyCrypto() {
    if (walletBalance >= cryptoPrice) {
        walletBalance -= cryptoPrice;
        cryptoBalance += 1;
        updateUI();
    } else {
        alert("Not enough money to buy CryptoCoin.");
    }
}

function sellCrypto() {
    if (cryptoBalance > 0) {
        walletBalance += cryptoPrice;
        cryptoBalance -= 1;
        updateUI();
    } else {
        alert("You don't have any CryptoCoin to sell.");
    }
}

function borrowMoney() {
    let amount = prompt("Enter amount to borrow: ");
    amount = parseFloat(amount);
    if (amount > 0 && borrowedAmount === 0) { // Simplify to one-time borrow
        borrowedAmount += amount;
        walletBalance += amount;
        updateUI();
    } else {
        alert("You can only borrow once until you repay.");
    }
}

function repayLoan() {
    let repaymentAmount = borrowedAmount * (1 + interestRate);
    if (walletBalance >= repaymentAmount) {
        walletBalance -= repaymentAmount;
        borrowedAmount = 0;
        updateUI();
    } else {
        alert("Not enough money to repay the loan.");
    }
}

updateUI();
setInterval(changeCryptoPrice, 5000); // Change CryptoCoin price every 5 seconds
