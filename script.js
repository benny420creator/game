document.addEventListener("DOMContentLoaded", function() {
    const balanceDisplay = document.getElementById("balanceAmount");
    const portfolioDisplay = document.getElementById("portfolioValue");
    const priceDisplay = document.getElementById("currentPrice");
    const quantityInput = document.getElementById("quantity");
    const buyButton = document.getElementById("buyButton");
    const sellButton = document.getElementById("sellButton");
    const messageDisplay = document.getElementById("message");

    let balance = 10000;
    let portfolioValue = 0;
    let currentPrice = 0;

    // Simulated price update
    function updatePrice() {
        currentPrice = (Math.random() * 1000).toFixed(2);
        priceDisplay.textContent = currentPrice;
    }
    updatePrice();
    setInterval(updatePrice, 5000);

    // Buy action
    buyButton.addEventListener("click", function() {
        const quantity = parseInt(quantityInput.value);
        const totalCost = quantity * currentPrice;
        if (balance >= totalCost && quantity > 0) {
            balance -= totalCost;
            portfolioValue += totalCost;
            balanceDisplay.textContent = balance.toFixed(2);
            portfolioDisplay.textContent = portfolioValue.toFixed(2);
            messageDisplay.textContent = `Bought ${quantity} units at $${currentPrice.toFixed(2)} each`;
            messageDisplay.style.color = "green";
        } else {
            messageDisplay.textContent = "Invalid transaction";
            messageDisplay.style.color = "red";
        }
        quantityInput.value = "";
    });

    // Sell action
    sellButton.addEventListener("click", function() {
        const quantity = parseInt(quantityInput.value);
        const totalSale = quantity * currentPrice;
        if (quantity <= portfolioValue && quantity > 0) {
            balance += totalSale;
            portfolioValue -= totalSale;
            balanceDisplay.textContent = balance.toFixed(2);
            portfolioDisplay.textContent = portfolioValue.toFixed(2);
            messageDisplay.textContent = `Sold ${quantity} units at $${currentPrice.toFixed(2)} each`;
            messageDisplay.style.color = "green";
        } else {
            messageDisplay.textContent = "Invalid transaction";
            messageDisplay.style.color = "red";
        }
        quantityInput.value = "";
    });
});
