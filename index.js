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

function run (program) {
  for (let position = 0; program[position] !== 99; position += 4) {
    const operation = [
      (x, y) => x + y,
      (x, y) => x * y
    ]

    switch (program[position]) {
      case 1:
      case 2:
        program[program[position + 3]] = operation[program[position] - 1](
          program[program[position + 1]], program[program[position + 2]])
        break
      default:
        console.error(`Unknown opcode ${program[position]} at position ${position}`)
        process.exit(1)
    }
  }

  return program
}

const program = fs.readFileSync('puzzle-input2.dat')
  .toString()
  .split(',')
  .map(opcode => parseInt(opcode))

program[1] = 12
program[2] = 2

console.log(run(program)[0])
