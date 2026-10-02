// ==============================
// CurrencyX - JavaScript
// ==============================


// Get HTML elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");


// ==============================
// Convert Currency
// ==============================

async function convertCurrency() {

    const amount = Number(amountInput.value);

    const from = fromCurrency.value;

    const to = toCurrency.value;


    // Check amount
    if (!amount || amount <= 0) {

        result.textContent = "Please enter a valid amount.";

        return;
    }


    // Same currency
    if (from === to) {

        result.textContent =
            `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`;

        return;
    }


    // Show loading
    result.textContent = "Converting...";


    try {

        // API request
        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );


        // Check response
        if (!response.ok) {

            throw new Error("Unable to get exchange rate.");
        }


        // Convert response to JSON
        const data = await response.json();


        // Get exchange rate
        const rate = data.rate;


        // Calculate conversion
        const convertedAmount = amount * rate;


        // Display result
        result.textContent =
            `${amount.toFixed(2)} ${from} = ${convertedAmount.toFixed(2)} ${to}`;


    } catch (error) {

        console.error(error);

        result.textContent =
            "Unable to get exchange rate. Please try again.";

    }
}


// ==============================
// Swap Currencies
// ==============================

function swapCurrencies() {

    const oldFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = oldFrom;


    // Automatically convert after swapping
    if (amountInput.value) {

        convertCurrency();
    }
}


// ==============================
// Button Events
// ==============================

convertBtn.addEventListener(
    "click",
    convertCurrency
);


swapBtn.addEventListener(
    "click",
    swapCurrencies
);