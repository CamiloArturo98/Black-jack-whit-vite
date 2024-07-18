import { createDeck } from "./create-deck";
/**
 * 
 * @returns  { String }
 */

export const askForLetter = ( ) => {
    let types           = ['C', 'D', 'H', 'S'],
        especialLetters = ['A', 'J', 'Q', 'K'],
        deck = createDeck( types, especialLetters ); 
    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck';
    }
    return deck.pop();
};
