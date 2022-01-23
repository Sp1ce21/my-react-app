export type fieldValidatortype = (value: string) => string | undefined

export const required: fieldValidatortype = (value) => {
    if(value) return undefined;
    return "You didn't enter the message"
}
export const maxLength = (maxLength: number): fieldValidatortype => (value) => {
    if(value && value.length <= maxLength) return undefined;
    return `Max length is ${maxLength} symbols`
} 