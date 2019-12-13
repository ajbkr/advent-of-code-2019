const fs = require('fs')

const calculate = mass => Math.floor(mass / 3) - 2

function calculateFuelRequirement (cumulativeSumOfAdditionalFuel, mass) {
  const adjustedMass = calculate(mass)

  return adjustedMass > 0
    ? calculateFuelRequirement(cumulativeSumOfAdditionalFuel + adjustedMass,
      adjustedMass)
    : cumulativeSumOfAdditionalFuel
}

const moduleMasses = fs.readFileSync('puzzle-input.dat')
  .toString()
  .split('\n')
  .slice(0, -1) // remove last element (NaN)

const sumOfFuelRequirements = moduleMasses.map(mass => {
  const initialMass = calculate(mass)

  return calculateFuelRequirement(initialMass, initialMass)
})
  .reduce((cumulativeSumOfFuelRequirements, fuelRequirement) =>
    cumulativeSumOfFuelRequirements + fuelRequirement)

console.log(sumOfFuelRequirements)
