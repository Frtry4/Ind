// Загружаем данные из localStorage при загрузке страницы
let participants = localStorage.getItem('participants') ? parseFloat(localStorage.getItem('participants')) : 1322;
let totalBTC = localStorage.getItem('totalBTC') ? parseFloat(localStorage.getItem('totalBTC')) : 50;
let currentETH = localStorage.getItem('currentETH') ? parseFloat(localStorage.getItem('currentETH')) : 300;

// Функция для обновления данных в localStorage
function updateLocalStorage() {
    localStorage.setItem('participants', participants);
    localStorage.setItem('totalBTC', totalBTC);
    localStorage.setItem('currentETH', currentETH);
}

// Функция для случайного изменения участников и BTC
function changeParticipantsAndBTC() {
    const changePercent = 0.005; // 0.5% шаг
    const direction = Math.random() < 0.5 ? -1 : 1; // Рандомно выбираем, вверх или вниз изменять участников
    const maxPercentChange = 0.15; // Максимальное изменение в 15%
    const minPercentChange = 0.01; // Минимальное изменение в 1%
    
    // Изменение участников
    const currentChange = participants * changePercent * direction;
    participants += currentChange;
    participants = Math.max(1322 * (1 - maxPercentChange), Math.min(participants, 1322 * (1 + maxPercentChange)));
    document.getElementById('participants').textContent = Math.round(participants);

    // Изменение депозита BTC
    const btcChange = totalBTC * changePercent * direction;
    totalBTC += btcChange;
    totalBTC = Math.max(50 * (1 - maxPercentChange), Math.min(totalBTC, 50 * (1 + maxPercentChange)));
    document.getElementById('btc').textContent = totalBTC.toFixed(2) + " BTC";
}

// Функция для увеличения ETH
function generateETHIncrement() {
    const minPercent = 0.002; // 0.2%
    const maxPercent = 0.01; // 1%
    const percent = Math.random() * (maxPercent - minPercent) + minPercent;
    return totalBTC * percent;
}

// Функция для обновления заработанного ETH
function updateStats() {
    const ethElement = document.getElementById('eth');
    const ethIncrement = generateETHIncrement();
    
    // Увеличиваем текущий ETH на процент от BTC
    currentETH += ethIncrement;
    ethElement.textContent = currentETH.toFixed(2) + " ETH";

    // Сохраняем обновленные данные в localStorage
    updateLocalStorage();
}

// Функция для расчета прибыли в ETH на основе введенного пользователем BTC за 14 дней
function calculateEarnings() {
    const userBTCValue = parseFloat(document.getElementById('userBTC').value); // Получаем количество BTC от пользователя
    const userEarningsElement = document.getElementById('userEarnings');
    const dailyIncrease = 0.005; // Допустим, ежедневное увеличение ETH 0.5% на 14 дней
    
    if (userBTCValue && userBTCValue > 0) {
        const userEarnings = (userBTCValue / totalBTC) * currentETH * Math.pow(1 + dailyIncrease, 14); // Учитываем увеличение за 14 дней
        userEarningsElement.textContent = userEarnings.toFixed(4) + " ETH"; // Отображаем результат
    } else {
        userEarningsElement.textContent = "0 ETH"; // Если введено некорректное значение
    }
}

// Связываем кнопку с функцией расчета
document.getElementById('calculateButton').addEventListener('click', function() {
    calculateEarnings(); // При нажатии на кнопку запускаем расчет
});

// Плавное отображение и скрытие описания
document.getElementById('toggleHowItWorks').addEventListener('click', function() {
    const howItWorks = document.getElementById('howItWorks');
    if (howItWorks.classList.contains('hidden')) {
        howItWorks.classList.remove('hidden');
    } else {
        howItWorks.classList.add('hidden');
    }
});

// Обновляем данные каждые 2 секунды для изменения участников и депозита BTC
setInterval(changeParticipantsAndBTC, 2000); // Изменение участников и депозита BTC каждые 2 секунды
setInterval(updateStats, 5000); // Обновление ETH каждые 5 секунд

// Первая загрузка данных
window.onload = function() {
    document.getElementById('participants').textContent = Math.round(participants);
    document.getElementById('btc').textContent = totalBTC.toFixed(2) + " BTC";
    document.getElementById('eth').textContent = currentETH.toFixed(2) + " ETH";
};
