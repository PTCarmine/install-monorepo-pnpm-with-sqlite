import path from 'path';
import { execSync } from 'child_process';

export async function installPayloadProject(destination, monorepoFolderName) {
    const monorepoBackendPath = path.join(destination, monorepoFolderName);
    const backendPath = path.join(monorepoBackendPath, 'backend');

    return new Promise(async (resolve, reject) => {
        try {
            console.log('📦 Inizializzazione di Payload in corso...');

            // Inizializzazione di Payload
            execSync('pnpm create payload-app -n payload-backend -t blank -d sqlite', {
                cwd: backendPath,
                stdio: 'inherit'
            });

            // Aggiornamento workspace
            try {
                execSync('pnpm install', {
                    cwd: path.join(destination, monorepoFolderName),
                    stdio: 'inherit'
                });
            } catch (error) {
                console.log(`❌ Errore durante l'installazione delle dipendenze: ${error.message}`);
            }

            resolve();
        } catch (error) {
            reject(new Error(`❌ Errore durante l'inizializzazione di Payload in ${backendPath}`));
        }
    });
}