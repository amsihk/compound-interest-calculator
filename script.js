const initialDeposit = document.getElementById('initial-deposit');
const monthlyContribution = document.getElementById('monthly-contribution');
const estimatedAnnualReturn = document.getElementById('estimated-annual-return');
const investmentHorizon = document.getElementById('investment-horizon');

const initialDepositValue = document.getElementById('initial-deposit-value');
const monthlyContributionValue = document.getElementById('monthly-contribution-value');
const estimatedAnnualReturnValue = document.getElementById('estimated-annual-return-value');
const investmentHorizonValue = document.getElementById('investment-horizon-value');

const totalValueDisplay = document.getElementById('total-value');
const interestEarn = document.getElementById('interest-earned');

let myChart;

// Listen for SLIDER input 
initialDeposit.addEventListener('input', () => getValues('slider'));
monthlyContribution.addEventListener('input', () => getValues('slider'));
estimatedAnnualReturn.addEventListener('input', () => getValues('slider'));
investmentHorizon.addEventListener('input', () => getValues('slider'));

// Listen for TEXT input 
const inputFields = [
    { textObj: initialDepositValue, sliderObj: initialDeposit },
    { textObj: monthlyContributionValue, sliderObj: monthlyContribution },
    { textObj: estimatedAnnualReturnValue, sliderObj: estimatedAnnualReturn },
    { textObj: investmentHorizonValue, sliderObj: investmentHorizon }
];

inputFields.forEach(item => {
    // Update live while typing
    item.textObj.addEventListener('input', () => {
        getValues('typing');
    });

    // Format text nicely when clicking outside the input box
    item.textObj.addEventListener('blur', () => {
        getValues('blur');
    });
});

function getValues(source = 'slider') {
    
    let depositAmount, contribution, annualReturn, time;

    if (source === 'slider') {
        // Fetch from sliders
        depositAmount = Number(initialDeposit.value);
        contribution = Number(monthlyContribution.value);
        annualReturn = Number(estimatedAnnualReturn.value);
        time = Number(investmentHorizon.value);

        initialDepositValue.value = depositAmount.toLocaleString('sv-SE');
        monthlyContributionValue.value = contribution.toLocaleString('sv-SE');
        estimatedAnnualReturnValue.value = annualReturn;
        investmentHorizonValue.value = time;

    } else {
        // Fetch from text inputs and clean spaces
        depositAmount = Number(initialDepositValue.value.replace(/\s/g, ''));
        contribution = Number(monthlyContributionValue.value.replace(/\s/g, ''));
        annualReturn = Number(estimatedAnnualReturnValue.value.replace(/\s/g, ''));
        time = Number(investmentHorizonValue.value.replace(/\s/g, ''));

        // Sync background sliders
        initialDeposit.value = depositAmount;
        monthlyContribution.value = contribution;
        estimatedAnnualReturn.value = annualReturn;
        investmentHorizon.value = time;

        if (source === 'blur') {
            initialDepositValue.value = depositAmount.toLocaleString('sv-SE');
            monthlyContributionValue.value = contribution.toLocaleString('sv-SE');
            estimatedAnnualReturnValue.value = annualReturn;
            investmentHorizonValue.value = time;
        }
    }

    // Calculations 
    let totalAmount = depositAmount;
    let yearlyTotals = [];
    let yearlyLabels = [];

    for (let i = 1; i <= time; i++) {
        totalAmount = 12 * contribution + totalAmount; 
        totalAmount = totalAmount * ((annualReturn / 100) + 1); 
        yearlyTotals.push(totalAmount);
        yearlyLabels.push(i);
    }

    const totalInvested = depositAmount + (contribution * 12 * time);
    const interestEarned = totalAmount - totalInvested; 

    // Update final results
    totalValueDisplay.textContent = Math.round(totalAmount).toLocaleString('sv-SE');
    interestEarn.textContent = Math.round(interestEarned).toLocaleString('sv-SE');

    createChart(yearlyLabels, yearlyTotals);
}

function createChart(labels, data) {
    const ctx = document.getElementById('interest-chart').getContext('2d');
    if (myChart) myChart.destroy();
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Total Value (kr)', 
                data: data, 
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1
            }]
        }
    });
}

// Initialize the app on load
getValues('slider');