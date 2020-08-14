export function stringPlus(num1: string = '0', num2: string = '0', ...rest: string[]): string {
  if (num1 === '0' && num2 === '0') return '0'
  if (rest.length) return stringPlus(stringPlus(num1, num2), rest.pop(), ...rest)
  const len1: number = num1.length
    , len2: number = num2.length
  let succeeding: boolean = false
    , candidate1: string
    , candidate2: string
    , tempResult: number
    , result: string = ''
  for (let i = 1, len = Math.max(len1, len2); i <= len; i++) {
    candidate1 = num1.charAt(len1 - i) || '0'
    candidate2 = num2.charAt(len2 - i) || '0'
    tempResult = Number(candidate1) + Number(candidate2) + (succeeding ? 1 : 0)

    succeeding = tempResult > 9
    tempResult = tempResult % 10
    result = tempResult + result
  }
  if (succeeding) result = '1' + result
  return result
}
