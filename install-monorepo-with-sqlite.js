import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createMonorepoBaseStructure } from "./scripts/setup-monorepo-pnpm.js";
import { installPayloadProject } from "./scripts/install-payload-project.js";
import { installNextProject } from "./scripts/install-next-project.js";
import { installStorybookProject } from "./scripts/install-storybook-project.js";
import { askYesOrNo } from "./src/utils/askQuestion.js";

const destination = process.argv[2];
const monorepoFolderName = process.argv[3];

// Validazione argomenti iniziali
if (!destination || !monorepoFolderName) {
    console.error('❌ Devi specificare la destinazione e il nome della cartella');
    console.error('Esempio: node setup-monorepo-pnpm.js ./percorso/della/cartella nome-cartella');
    process.exit(1);
}

async function handleInstallationStep(question, action, successMessage, skipMessage, errorMessage) {
    const answer = await askYesOrNo(question);

    if (answer === 'y') {
        try {
            await action();
            console.log(successMessage);
            return true;  // Installazione completata con successo
        } catch (error) {
            console.error(`${errorMessage}`, error.message);
            return false;  // Installazione fallita
        }
    } else {
        console.log(skipMessage);
        return false;  // Installazione saltata
    }
}

try {
    // Step 1 obbligatorio: Creazione della struttura base del Monorepo
    console.log('📦 Creazione della struttura base del Monorepo in corso...');
    await createMonorepoBaseStructure(destination, monorepoFolderName);
    console.log('✅ Struttura base del Monorepo creata con successo');
} catch (error) {
    console.error('❌ Errore durante la creazione della struttura base del Monorepo:', error.message);
    process.exit(1);
}

try {
    // Step 2 - Inizializzazione di Payload
    await handleInstallationStep(
        '📦 Vuoi inizializzare Payload nel backend? (y/n): ',
        async () => await installPayloadProject(destination, monorepoFolderName),
        `
        ✅ Inizializzazione di Payload completata con successo,

        🚀 Ora puoi avviare Payload con il comando:
        👉 pnpm --filter payload-backend dev',

        🔗 Assicurati di essere nella root del monorepo!`,
        '❌ Inizializzazione di Payload annullata',
        '❌ Errore durante l\'inizializzazione di Payload: '
    );

    // Step 3 - Inizializzazione di Next.js
    await handleInstallationStep(
        '📦 Vuoi inizializzare un nuovo progetto Next.js nel frontend? (y/n): ',
        async () => await installNextProject(destination, monorepoFolderName),
        `
        ✅ Inizializzazione di Next.js completata con successo,

        🚀 Ora puoi avviare il progetto Next.js con il comando:
        👉 pnpm --filter next-frontend dev',
        
        🔗 Assicurati di essere nella root del monorepo!`,
        '❌ Inizializzazione di Next.js annullata',
        '❌ Errore durante l\'inizializzazione di Next.js: '
    );

    // Step 4 - Inizializzazione di Storybook
    const isStorybookInstalled = await handleInstallationStep(
        '📦 Vuoi inizializzare Storybook nel frontend? (y/n): ',
        async () => await installStorybookProject(destination, monorepoFolderName),
        `
        ✅ Inizializzazione di Storybook completata con successo,

        🚀 Ora puoi avviare Storybook con il comando:
        👉 pnpm --filter react-components-library storybook
        
        🔗 Assicurati di essere nella root del monorepo!`,
        '❌ Inizializzazione di Storybook annullata',
        '❌ Errore durante l\'inizializzazione di Storybook: '
    );

    // Step 5 - Solo se Storybook è stato installato
    if (isStorybookInstalled) {
        const shouldIntegrateWithNext = await handleInstallationStep(
            '📦 Vuoi aggiungere la libreria react-components-library a Next.js? (y/n): ',
            async () => {
                execSync('pnpm --filter next-frontend add react-components-library', {
                    cwd: path.join(destination, monorepoFolderName),
                    stdio: 'inherit'
                });

                const tsconfigPath = path.join(destination, monorepoFolderName, 'frontend', 'next-frontend', 'tsconfig.json');
                const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

                tsconfig.compilerOptions = {
                    ...tsconfig.compilerOptions,
                    "baseUrl": ".",
                    "paths": {
                        ...tsconfig.compilerOptions?.paths,
                        "react-components-library": ["../react-components-library/src"]
                    }
                };

                fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8');
                console.log('✅ File tsconfig.json aggiornato con successo');
            },
            '✅ Aggiunta della libreria react-components-library a Next.js completata con successo',
            '❌ Aggiunta della libreria react-components-library a Next.js annullata',
            '❌ Errore durante l\'aggiunta della libreria react-components-library a Next.js: '
        );

        // Allineamento versioni React solo se viene richiesta l'integrazione
        if (shouldIntegrateWithNext) {
            console.log('🔄 Allineamento versioni React e ReactDOM...');
            execSync('pnpm install', {
                cwd: path.join(destination, monorepoFolderName),
                stdio: 'inherit'
            });

            execSync('pnpm add -r react@18.2.0 react-dom@18.2.0 && pnpm add -D -r @types/react@18.2.6 @types/react-dom@18.2.6', {
                cwd: path.join(destination, monorepoFolderName),
                stdio: 'inherit'
            });

            console.log('✅ Allineamento delle dipendenze React e ReactDOM completato con successo');
        }
    }

    console.log('🎉 Tutte le operazioni confermate sono state completate!');

} catch (error) {
    console.error('❌ Errore critico: ', error.message);
    process.exit(1);
}

