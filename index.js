const fs = require('fs')

const moduleMasses = fs.readFileSync('puzzle-input.dat')
  .toString()
  .split('\n')
  .slice(0, -1)

const sumOfFuelRequirements = moduleMasses.map(mass => Math.floor(mass / 3) - 2)
  .reduce((cumulativeSumOfFuelRequirements, fuelRequirement) =>
    cumulativeSumOfFuelRequirements + fuelRequirement)

console.log(sumOfFuelRequirements)
