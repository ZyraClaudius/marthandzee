export function screenInput(input: string) {
    if (input.includes(';')){
        throw new Error('UNSAFE! NOT A NAME!')
    }
    if (input.includes('(')) {
        throw new Error('UNSAFE! NOT A NAME!')
    }
    if (input.includes(')')) {
        throw new Error('UNSAFE! NOT A NAME!')
    }
    if (input.includes(',')) {
        throw new Error('UNSAFE! NOT A NAME!')
    }
}