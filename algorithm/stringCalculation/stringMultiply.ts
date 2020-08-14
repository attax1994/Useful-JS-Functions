import { stringPlus } from './stringAdd'

export function stringMultiply(num1: string, num2: string): string {
  let result: string[] = []
  for (let i = 0, len = num2.length - 1; i <= len; i++) {
    result.push(singleMultiple(num1, num2.charAt(len - i), i))
  }
  return stringPlus(result.pop(), result.pop(), ...result)
}

function singleMultiple(num1: string, num2: string, pow: number): string {
  if (num1 === '0' || num2 === '0') return '0'
  let result: string = ''
  let succeeding: number = 0
    , candidate1: string
    , tempResult: number
  for (let i = 1, len = num1.length; i <= len; i++) {
    candidate1 = num1.charAt(len - i) || '0'
    tempResult = Number(candidate1) * Number(num2) + succeeding
    succeeding = Math.floor(tempResult / 10)
    tempResult = tempResult % 10
    result = tempResult + result
  }
  if (succeeding) result = succeeding + result
  for (let i = 0; i < pow; i++) result += '0'
  return result
}
