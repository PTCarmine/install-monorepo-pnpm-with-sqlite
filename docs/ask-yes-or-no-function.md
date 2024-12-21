# Funzioni `askQuestion` e `askYesOrNo`

Queste funzioni facilitano l'interazione con l'utente tramite il terminale, permettendo di fare domande e attendere risposte.

## `askQuestion`

La funzione `askQuestion` consente di fare una domanda personalizzata e restituisce la risposta fornita dall'utente come stringa in minuscolo.

### Utilizzo:
```javascript
import { askQuestion } from './path/to/file.js';

async function main() {
  const name = await askQuestion('Qual è il tuo nome? ');
  console.log(`Ciao, ${name}!`);
}

main();
```

## `askYesOrNo`

La funzione askYesOrNo è progettata per domande con risposte specifiche "y" (sì) o "n" (no). Se l’utente inserisce un valore non valido, viene richiesto di riprovare.

### Utilizzo:
```javascript
import { askYesOrNo } from './path/to/file.js';

async function main() {
  const answer = await askYesOrNo('Vuoi continuare? (y/n): ');
  if (answer === 'y') {
    console.log('Continuiamo!');
  } else {
    console.log('Operazione annullata.');
  }
}

main();
```
---

## Spiegazione

### askQuestion
1.	Utilizza il modulo readline di Node.js per creare un’interfaccia di input/output.
2.	Mostra la domanda specificata nel terminale.
3.	Restituisce la risposta inserita dall’utente.

### askYesOrNo
1.	Utilizza la funzione askQuestion per porre la domanda.
2.	Ripete la domanda finché l’utente non inserisce una risposta valida (y o n).
3.	Restituisce "y" o "n" come risposta finale.

---

## File Sorgente
```javascript
import { createInterface } from 'readline';

export async function askQuestion(question) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.toLowerCase());
        });
    });
}

export async function askYesOrNo(question) {
    let validAnswer = false;
    let answer;

    while (!validAnswer) {
        answer = await askQuestion(question);
        if (answer === 'y' || answer === 'n') {
            validAnswer = true
        } else {
            console.log('⚠️ Risposta non valida. Riprova con "y" o "n".');
        }
    }

    return answer;
}
```