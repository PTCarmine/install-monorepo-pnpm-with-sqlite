/**
 * Funzione `pause`
 *
 * Questa funzione crea una pausa nell'esecuzione del programma, richiedendo
 * all'utente di premere INVIO per continuare. È utile quando si vuole garantire
 * che l'utente legga un messaggio o un'operazione sia completamente visibile
 * prima di procedere con il resto del programma.
 *
 * La funzione utilizza il modulo `readline` di Node.js per ascoltare l'input
 * dell'utente dal terminale.
 *
 * Come Importarla:
 * ----------------
 * Importa la funzione nel file in cui vuoi utilizzarla:
 *
 * import { pause } from './path/to/pause.js';
 *
 * Come Usarla:
 * ------------
 * Usa `await` per attendere la risoluzione della funzione (richiede che il
 * contesto sia asincrono):
 *
 * async function main() {
 *   console.log('Operazione completata!');
 *   await pause();
 *   console.log('Continuo con l\'esecuzione...');
 * }
 *
 * main();
 *
 */

import * as readline from "node:readline";

export const pause = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('Premi INVIO per continuare...', () => {
            rl.close();
            resolve();
        });
    });
};