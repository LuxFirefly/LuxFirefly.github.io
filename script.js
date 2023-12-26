let player1Display = document.getElementById('player1');
let player2Display = document.getElementById('player2');
let player1NameInput = document.getElementById('player1Name');
let player2NameInput = document.getElementById('player2Name');
let resultDisplay = document.getElementById('result');
let historyDisplay = document.getElementById('history');

function adjustLifePoints(player, sign) {
    const currentPlayerDisplay = (player === 1) ? player1Display : player2Display;
    const adjustmentInput = document.getElementById(`adjustment${player}`);
    const adjustmentValue = parseInt(adjustmentInput.value) * sign;

    if (!isNaN(adjustmentValue)) {
        let currentValue = parseInt(currentPlayerDisplay.value);

        // Apply the adjustment
        currentValue += adjustmentValue;

        // Ensure life points are not negative
        currentValue = Math.max(currentValue, 0);

        // Update the display
        currentPlayerDisplay.value = currentValue;

        // Log the adjustment
        logAdjustment(getPlayerName(player), adjustmentValue, sign);

        // Check if the game is finished
        if (currentValue === 0) {
            resultDisplay.textContent = `${getPlayerName(player)} lost! Game Over.`;
            logWinner((player === 1) ? player2NameInput.value : player1NameInput.value);
        } else {
            resultDisplay.textContent = '';
        }
    }
}

function divideByTwo(player) {
    const currentPlayerDisplay = (player === 1) ? player1Display : player2Display;
    let currentValue = parseInt(currentPlayerDisplay.value);

    // Divide life points by 2 and round up to the nearest whole number
    const dividedValue = Math.ceil(currentValue / 2);

    // Update the display
    currentPlayerDisplay.value = dividedValue;

    // Log the division
    logAdjustment(getPlayerName(player), '/2', -1);

    // Check if the game is finished
    if (dividedValue === 0) {
        resultDisplay.textContent = `${getPlayerName(player)} lost! Game Over.`;
        logWinner((player === 1) ? player2NameInput.value : player1NameInput.value);
    } else {
        resultDisplay.textContent = '';
    }
}

function restartGame() {
    player1NameInput.value = '';
    player2NameInput.value = '';
    player1Display.value = 8000;
    player2Display.value = 8000;
    resultDisplay.textContent = '';
    historyDisplay.textContent = ''; // Clear the history
}

function getPlayerName(player) {
    return (player === 1) ? player1NameInput.value || "Player 1" : player2NameInput.value || "Player 2";
}

function logAdjustment(player, adjustment, sign) {
    if (sign === -1 && adjustment === '/2') {
        historyDisplay.innerHTML += `<p>${player} LP divided by 2</p>`;
    } else {
        const action = (sign === 1) ? '+' : '-';
        historyDisplay.innerHTML += `<p>${player} ${action} ${Math.abs(adjustment)}</p>`;
    }
}

function logWinner() {
    const player1Life = parseInt(player1Display.value);
    const player2Life = parseInt(player2Display.value);

    if (player1Life === 0 && player2Life === 0) {
        resultDisplay.innerHTML = `<p class="draw">It's a draw! Game Over.</p>`;
    } else if (player1Life === 0) {
        resultDisplay.innerHTML = `<p class="losing">${player1NameInput.value} lost! Game Over.</p><p class="winning">${player2NameInput.value} won!</p>`;
    } else if (player2Life === 0) {
        resultDisplay.innerHTML = `<p class="losing">${player2NameInput.value} lost! Game Over.</p><p class="winning">${player1NameInput.value} won!</p>`;
    } else {
        resultDisplay.textContent = ''; // No winner or loser yet
    }
}
