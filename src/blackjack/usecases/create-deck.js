import _ from "underscore";

/**
 * 
 * @param {Array<String>} typeLetter Example :  ['C', 'D', 'H', 'S'], 
 * @param {Array<String>} especialLetters Example : ['A', 'J', 'Q', 'K'];
 * @returns {Array<String>}
 */
export const createDeck = ( typeLetter, especialLetters ) => {

   let deck = []; 

    for (let i = 2; i <= 10; i++) {
        for (let type of typeLetter) {
            deck.push(i + type);
        }
    }

    for (let type of typeLetter) {
        for (let especial of especialLetters) {
            deck.push(especial + type);
        }
    }


    deck =  _.shuffle( deck );
    return deck;
}
