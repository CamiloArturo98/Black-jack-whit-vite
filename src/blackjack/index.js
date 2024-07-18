    import _ from 'underscore';
    import {  createDeck,askForLetter,letterValue} from './usecases/index';

    // Patron modulo.

        const myModule = (() => {

        'Use strict'

        let   deck            = []; 
        const types           = ['C', 'D', 'H', 'S'],
              especialLetters = ['A', 'J', 'Q', 'K'];


        let playerPoints = [];

        // Referencias al html.

        const btn1 = document.querySelector('#btn1'),
            btn2 = document.querySelector('#btn2'),
            btn3 = document.querySelector('#btn3'),
            divLettersGamers = document.querySelectorAll('.divLetters'),
            pointsHtml = document.querySelectorAll('small');


            deck = createDeck( types, especialLetters );
            
            if( !types || types.length === 0 ) throw new Error( 'letter types are necesary and it has string' );
            if( !especialLetters || especialLetters.length === 0 ) throw new Error( 'Especial letters types are necesary and it has string' );

        // Esta funcion inicializa el juego.

        btn2.disabled = true;
        btn3.disabled = true;

        const gameStar = ( numPlayeres = 2 ) => {
            //   deck = createDeck();
            playerPoints = []; 

            for ( let i = 0; i < numPlayeres; i++ ) {
                playerPoints.push(0); 
            };
            
            divLettersGamers.forEach( element => element.innerHTML = '<img></img>' );
            pointsHtml.forEach( elemet => elemet.innerText = '0');

            // Habilitando botones
            btn2.disabled = false;
            btn3.disabled = false;
        }

    // Funcion para acumular puntos , 0 = a el primer jugador , y el ultimo siempre va a ser la pc. 

        const accumulatePoints = ( letter, shift ) => {

        playerPoints[shift] = playerPoints[shift] + letterValue( letter );
        pointsHtml[shift].innerText = playerPoints[shift];

        return playerPoints[shift];

    }
    //Funcion para crear carta

        const createLetter = ( letter, shift ) => {

            const imgLetter = document.createElement( 'img' );
            imgLetter.src = `assets/cartas/${ letter }.png`;
            imgLetter.classList.add( 'letter' );
            divLettersGamers[ shift ].append( imgLetter );
        };

        const whoIsTheWinner = (  ) => {  
            const [ minPoints, pcPoints  ] = playerPoints;
            setTimeout(() => {

                if (pcPoints === minPoints) {
                    alert('Nothing win');
                } else if (minPoints > 21) {
                    alert('pc win');
                } else if (pcPoints > 21) {
                    alert('You win 👍');
                }else{  
                    alert( 'pc win' );
                }

            }, 100);

        }

        // Turno de la pc 

        const pcShift = ( minPoints ) => {
            
            let pcPoints  = 0;
        
            do {

                const letter = askForLetter();
                pcPoints = accumulatePoints(letter, playerPoints.length -1);
                createLetter(letter, playerPoints.length -1);

            } while ((pcPoints < minPoints) && (minPoints <= 21));

            
            whoIsTheWinner();
        }



        // EVENTOS.

        // 1.Escoger una carta (turno de el jugador).

        let evento = btn2.addEventListener('click', () => {


            const letter      = askForLetter(),
                gamerPoints = accumulatePoints( letter, 0 );

            createLetter( letter, 0 );

            if (gamerPoints > 21) {
                console.warn('You loose');
                btn2.disabled = true;
                btn3.disabled = true;
                pcShift(gamerPoints);
            } else if (gamerPoints === 21) {
                console.warn('You win')
                btn2.disabled = true;
                btn3.disabled = true;
                pcShift(gamerPoints);
            }


        });

        // Evento detener.

        let stopEvent = btn3.addEventListener('click', () => {

            btn2.disabled = true;
            btn3.disabled = true;

            pcShift( playerPoints );

        });

        // Evento nuevo juego.

        btn1.addEventListener('click', () => {
            gameStar();
        });
        
        return { 
            newGame: gameStar
        };
        
    })();
