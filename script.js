const calculateButton  = document.getElementById('button');

const initialDeposit = document.getElementById('initial-deposit');
const monthlyContribution = document.getElementById('monthly-contribution');
const estimatedAnnualReturn = document.getElementById('estimated-annual-return');
const investmentHorizon = document.getElementById('investment-horizon');

let myChart;
calculateButton.addEventListener('click', getValues)

function getValues() {
    const depositAmount = Number(initialDeposit.value);
    const contribution = Number(monthlyContribution.value);
    const annualReturn = Number(estimatedAnnualReturn.value);
    const time = Number(investmentHorizon.value);
    

    let totalAmount = depositAmount

    let yearlyTotals = []
    let yearlyLabels = []

    for (let i = 1; i <= time; i++) {
        totalAmount = 12 * contribution + totalAmount 

        totalAmount = totalAmount * ((annualReturn/100) + 1) 

        yearlyTotals.push(totalAmount)
        yearlyLabels.push(i)

    }
    console.log(totalAmount); // testing if formula works
    console.log(yearlyLabels); // testing if year label works
    console.log(yearlyTotals); // testing if yearly total works

    createChart(yearlyLabels, yearlyTotals);
}

function createChart(labels, data) {
    const ctx = document.getElementById('interest-chart').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // Our array with year [1, 2, 3...]
            datasets: [{
                label: 'Total Value ($)',
                data: data, // Our array with money
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1
            }]
        }
    });
}