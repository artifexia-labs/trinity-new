document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.getElementById('monthly-prices');
    const yearlyPrices = document.getElementById('yearly-prices');

    // По умолчанию показываем годовые
    yearlyPrices.classList.add('active');

    toggle.addEventListener('change', function () {
        if (toggle.checked) {
            // Показываем месячные
            yearlyPrices.classList.remove('active');
            monthlyPrices.classList.add('active');
        } else {
            // Показываем годовые
            monthlyPrices.classList.remove('active');
            yearlyPrices.classList.add('active');
        }
    });
});