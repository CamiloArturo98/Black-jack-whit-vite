
/**
 * 
 * @param { number } letter 
 * @returns 
 */
export const letterValue = (letter) => {

    const value = letter.substring(0, letter.length - 1);

    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10 : value * 1;
}