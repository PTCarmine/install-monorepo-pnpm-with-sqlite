import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { createTsconfigContent } from "../src/contents/storybook/react-components-library/tsconfigContent.js";
import { createpPackageJsonContent } from "../src/contents/storybook/react-components-library/packageJsonContent.js";
import { createWebpackConfigContent } from "../src/contents/storybook/react-components-library/webpackConfigContent.js";
import { createStorybookMainContent } from "../src/contents/storybook/mainContent.js";
import { createPreviewContent } from "../src/contents/storybook/previewContent.js";
import { createButtonContent } from "../src/contents/storybook/src/components/buttonContent.js";
import { createButtonStoriesContent } from "../src/contents/storybook/src/components/buttonStoriesContent.js";
import { createIndexContent } from "../src/contents/storybook/src/indexContent.js";

export async function installStorybookProject(destination, monorepoFolderName) {
    const monorepoFrontendPath = path.join(destination, monorepoFolderName);
    const frontendPath = path.join(monorepoFrontendPath, 'frontend');
    const storybookPath = path.join(frontendPath, 'react-components-library');
    const secretStorybookPath = path.join(storybookPath, '.storybook');
    const srcPath = path.join(storybookPath, 'src');
    const mainPath = path.join(secretStorybookPath, 'main.ts');
    const previewPath = path.join(secretStorybookPath, 'preview.tsx');

    const packageJson = createpPackageJsonContent(monorepoFolderName);
    const webpackConfig = createWebpackConfigContent();
    const tsConfig = createTsconfigContent();
    const buttonContent = createButtonContent();
    const buttonStoriesContent = createButtonStoriesContent();
    const indexContent = createIndexContent();
    const storybookMainContent = createStorybookMainContent();
    const previewContent = createPreviewContent();

    return new Promise(async (resolve, reject) => {
        try {
            // Creazione cartella principale
            fs.mkdirSync(storybookPath, { recursive: true });
            console.log('✅ Cartella react-components-library creata con successo');

            // Inizializzazione pnpm e TypeScript
            execSync('pnpm init', { cwd: storybookPath, stdio: 'inherit' });
            console.log('✅ Inizializzazione di pnpm completata con successo');

            execSync('pnpm add -D typescript', { cwd: storybookPath, stdio: 'inherit' });
            console.log('✅ Inizializzazione di TypeScript completata con successo');

            // Configurazione package.json
            fs.writeFileSync(path.join(storybookPath, 'package.json'), packageJson, 'utf-8');
            console.log('✅ File package.json modificato con successo');

            // Installazione dipendenze Storybook
            execSync('pnpm add -D @storybook/react @storybook/builder-webpack5 @storybook/manager-webpack5 @storybook/addon-essentials webpack webpack-cli typescript ts-loader @types/react @types/react-dom styled-components @types/styled-components @storybook/addon-webpack5-compiler-babel', {
                cwd: storybookPath,
                stdio: 'inherit'
            });
            console.log('✅ Inizializzazione delle dipendenze Storybook completata con successo');

            // Configurazione webpack e TypeScript
            fs.writeFileSync(path.join(storybookPath, 'webpack.config.ts'), webpackConfig, 'utf-8');
            fs.writeFileSync(path.join(storybookPath, 'tsconfig.json'), tsConfig, 'utf-8');
            console.log('✅ File webpack.config.js e tsconfig.json modificati con successo');

            // Configurazione Storybook
            fs.mkdirSync(secretStorybookPath, { recursive: true });
            fs.writeFileSync(mainPath, storybookMainContent, 'utf-8');
            fs.writeFileSync(previewPath, previewContent, 'utf-8');
            console.log('✅ File main.ts e preview.tsx configurati con successo');

            // Creazione struttura src e componenti
            fs.mkdirSync(srcPath, { recursive: true });
            console.log('✅ Cartella src creata con successo');

            fs.mkdirSync(path.join(srcPath, 'components'), { recursive: true });
            console.log('✅ Cartella components creata con successo');

            fs.writeFileSync(path.join(srcPath, 'components', 'Button.tsx'), buttonContent, 'utf-8');
            console.log('✅ File Button.tsx creato con successo');

            fs.writeFileSync(path.join(srcPath, 'components', 'Button.stories.tsx'), buttonStoriesContent, 'utf-8');
            fs.writeFileSync(path.join(srcPath, 'index.ts'), indexContent, 'utf-8');

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
            reject(new Error(`❌ Errore durante l'inizializzazione di Storybook in ${frontendPath}`));
        }
    });
}