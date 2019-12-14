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

function run (memory) {
  for (let instructionPointer = 0; memory[instructionPointer] !== 99;) {
    const operations = [
      (x, y) => x + y,
      (x, y) => x * y
    ]

    const opcode = memory[instructionPointer]
    const parameters = memory.slice(instructionPointer + 1,
      instructionPointer + 4)

    switch (opcode) {
      case 1:
      case 2:
        memory[parameters[2]] = operations[opcode - /* offset */ 1](
          memory[parameters[0]], memory[parameters[1]])
        instructionPointer += 4
        break
      default:
        console.error(
          `Unknown opcode ${opcode} at address ${instructionPointer}`)
        process.exit(1)
    }
  }

  return memory
}

const TARGET_OUTPUT = 19690720

const memory = fs.readFileSync('puzzle-input2.dat')
  .toString()
  .split(',')
  .map(opcode => parseInt(opcode))

for (let noun = 0; noun < 100; ++noun) {
  for (let verb = 0; verb < 100; ++verb) {
    const mem = [...memory]

    mem[1] = noun
    mem[2] = verb

    if (run(mem)[0] === TARGET_OUTPUT) {
      console.log('' + noun + verb)
      break
    }
  }
}
