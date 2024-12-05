import * as fs from 'fs'

interface Rule {
    numberBefore: number,
    numberAfter: number,
}

interface Update {
    numbers: number[]
}

function isRuleRespected(rule: Rule, update: Update): boolean {
    let res = false
    if (!update.numbers.includes(rule.numberBefore) || !update.numbers.includes(rule.numberAfter)) {
        return true
    }
    for (let i = 0; i < update.numbers.length; i++) {
        if (update.numbers[i] === rule.numberAfter) {
            for (let j = 0; j < i; j++) {
                if (update.numbers[j] === rule.numberBefore) {
                    res = true
                }
            }
        }
    }
    return res
}

function isUpdateValid(rules: Rule[], update: Update): boolean {
    for (let rule of rules) {
        if (!isRuleRespected(rule, update)) {
            console.log('rule not respected', rule, update)
            return false
        }
    }
    return true
}

function sortAccordingToRules(rules: Rule[], number1: number, number2: number): number {
    for (let rule of rules) {
        if (rule.numberBefore === number1 && rule.numberAfter === number2) {
            return -1
        }
        if (rule.numberBefore === number2 && rule.numberAfter === number1) {
            return 1
        }
    }
    return 0
}

function sortUpdate(rules: Rule[], update: Update): number[] {
    return update.numbers.sort((a, b) => {
        return sortAccordingToRules(rules, a, b)
    })
}

const input: string = fs.readFileSync('input.txt','utf8')

const lines: string[] = input.split('\n')

const rules: Rule[] = []
const updates: Update[] = []
var i: number = 0
while (lines[i] != '') {
    rules.push({numberBefore: parseInt(lines[i].slice(0, 2)), numberAfter: parseInt(lines[i].slice(3,5))})
    i++
}
i++
while (i < lines.length) {
    updates.push({numbers: lines[i].split(',').map((s) => { return parseInt(s) })})
    i++
}

let validUpdates: Update[] = []
let invalidUpdates: Update[] = []
for (let update of updates) {
    if (isUpdateValid(rules, update)) {
        validUpdates.push(update)
    }
    else
        invalidUpdates.push(update)
}

let sum = 0
for (let update of invalidUpdates) {
    sum+= sortUpdate(rules, update)[Math.round(update.numbers.length / 2) - 1]
}
console.log(sum)