import { createInterface } from 'readline';

async function askQuestion(question) {
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
            console.log('⚠️ Risposta non valida. Riprova con "y" o "n".')
        }
    }

    return answer;
}