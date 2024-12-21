import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createNextConfigContent } from "../src/contents/next/nextConfigContent.js";

export async function installNextProject(destination, monorepoFolderName) {
    const monorepoFrontendPath = path.join(destination, monorepoFolderName);
    const frontendPath = path.join(monorepoFrontendPath, 'frontend');
    const nextPath = path.join(frontendPath, 'next-frontend');
    const nextConfigPath = path.join(nextPath, 'next.config.ts');
    const nextConfigContent = createNextConfigContent();

    return new Promise(async (resolve, reject) => {
        try {
            console.log('📦 Inizializzazione di Next.js in corso...');

            execSync('pnpm create next-app@latest next-frontend', {
                cwd: frontendPath,
                stdio: 'inherit'
            });

            console.log('✅ Inizializzazione di Next.js completata con successo');

            execSync('pnpm add react react-dom styled-components', {
                cwd: nextPath,
                stdio: 'inherit'
            });
            execSync('pnpm add -D @types/react @types/react-dom @types/styled-components', {
                cwd: nextPath,
                stdio: 'inherit'
            });

            console.log('✅ Inizializzazione delle dipendenze React e ReactDOM completata con successo');

            fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf-8');

            console.log('✅ File next.config.ts modificato con successo');

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
            reject(new Error(`❌ Errore durante l'inizializzazione di Next.js in ${frontendPath}`));
        }
    });
}
