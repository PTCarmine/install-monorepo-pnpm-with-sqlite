import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createPackageJsonContent } from '../src/contents/setup-monorepo-pnpm/packageJsonContent.js';
import { createYamlWorkspaceContent } from "../src/contents/setup-monorepo-pnpm/pnpmWorkspaceContent.js";

export function createMonorepoBaseStructure(destination, monorepoFolderName) {
    return new Promise(async (resolve, reject) => {
        const monorepoPath = path.resolve(destination, monorepoFolderName);
        const jsonContent = createPackageJsonContent(monorepoFolderName);
        const workspaceContent = createYamlWorkspaceContent();
        const backendPath = path.join(monorepoPath, 'backend');
        const frontendPath = path.join(monorepoPath, 'frontend');

        try {
            if (!fs.existsSync(monorepoPath)) {
                // Creazione struttura cartelle
                fs.mkdirSync(monorepoPath, { recursive: true });
                console.log(`✅ Cartella ${monorepoFolderName} creata con successo in ${monorepoPath}`);

                fs.mkdirSync(backendPath, { recursive: true });
                fs.mkdirSync(frontendPath, { recursive: true });
                console.log(`✅ Cartelle backend e frontend create con successo`);

                // Creazione file di configurazione
                fs.writeFileSync(path.join(monorepoPath, 'pnpm-workspace.yaml'), workspaceContent, 'utf-8');
                fs.writeFileSync(path.join(monorepoPath, 'package.json'), jsonContent, "utf-8");
                console.log(`✅ File di configurazione pnpm-workspace.yaml e package.json creati con successo`);

                // Inizializzazione monorepo
                execSync('pnpm install', {
                    cwd: monorepoPath,
                    stdio: 'inherit'
                });
                console.log('✅ Inizializzazione Monorepo pnpm completata con successo');

                // Inizializzazione TypeScript
                execSync('pnpm add -Dw typescript @types/node', {
                    cwd: monorepoPath,
                    stdio: 'inherit'
                });
                console.log('✅ Inizializzazione TypeScript completata con successo');
                resolve();
            } else {
                reject(new Error(`🚫 La cartella ${monorepoFolderName} esiste già in ${monorepoPath}`));
            }
        } catch (error) {
            reject(new Error(`❌ Errore durante la creazione del monorepo. Errore: ${error}`));
        }
    });
}
