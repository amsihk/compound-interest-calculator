const calculateButton  = document.getElementById('button');

const initialDeposit = document.getElementById('initial-deposit');
const monthlyContribution = document.getElementById('monthly-contribution');
const estimatedAnnualReturn = document.getElementById('estimated-annual-return');
const investmentHorizon = document.getElementById('investment-horizon');

calculateButton.addEventListener('click', getValues)

function getValues() {
    const depositAmount = Number(initialDeposit.value);
    const contribution = Number(monthlyContribution.value);
    const annualReturn = Number(estimatedAnnualReturn.value);
    const time = Number(investmentHorizon.value);
    

    let totalAmount = depositAmount

    for (let i = 1; i <= time; i++) {
        totalAmount = 12 * contribution + totalAmount 

        totalAmount = totalAmount * ((annualReturn/100) + 1) 

    }
    console.log(totalAmount);
}
