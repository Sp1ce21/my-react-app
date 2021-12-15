export const required = (value) => {
    if(value) return undefined;
    return "You didn't enter the message"
}
export const maxLength = (maxLength) => (value) => {
    if(value && value.length <= maxLength) return undefined;
    return `Max length is ${maxLength} symbols`
} 