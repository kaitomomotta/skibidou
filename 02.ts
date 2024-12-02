import * as fs from 'fs'

const LOGGING = true
function log(msg: any, name: string = '', forceLog = false) {
    if (LOGGING || forceLog) {
        name === '' ? console.log(`-------\n${msg}\n-------`) : console.log(`-------\n${name}:\n${msg}\n-------`)
    }
}

const input: string = fs.readFileSync('input','utf8')
log(input, 'input')

const reports: string[] = input.split('\n')
log(reports, 'reports')

function isLevelSafe(level: string[]): boolean {
    const element = parseInt(level[0])
    const element2 = parseInt(level[1])
    const goingUp = element < element2 ? true : false
    for (let i = 0; i < level.length - 1; i++) {
        const element = parseInt(level[i])
        const element2 = parseInt(level[i + 1])
        const diff = Math.abs(element - element2)
        if ((diff === 0 || diff > 3) || (goingUp && element > element2) || (!goingUp && element < element2)) {
            // report is Unsafe
            log('unsafe')
            return false
        }
    }
    return true
}

// eewwwwwwww
function buildNewLevels(level: string[]): string[][] {
    const levels: string[][] = []
    for (let index = 0; index < level.length; index++) {
        const levelCopy = structuredClone(level)
        levelCopy.splice(index, 1)
        levels.push(levelCopy)
    }
    return levels
}

let result = 0
reports.forEach((report) => {
    const level = report.split(' ')
    log(level)
    const isSafe = isLevelSafe(level)
    if (isSafe) {
        result ++
    }
    if (!isSafe) {
        const levelsNew = buildNewLevels(level)
        for (const levelNew of levelsNew) {
            if (isLevelSafe(levelNew)) {
            result++
            break
            }
        }
    }
})

log(result)