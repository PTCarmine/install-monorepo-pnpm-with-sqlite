A breve sarà pronto un file readme con tutti bi passaggi per utilizzare il repository!!

Il comando per farlo partire è: `node install-monorepo-with-sqlite.js percorso-cartella nome-monorepo`

Seguire le istruzioni a terminale. Finita l'installazione per utilizzare qualunque installazione usare, da root del monorepo, pnpm --install nome-del-progetto-nel-package.json dev (o storybook)
es:

pnpm --filter next-frontend dev
pnpm --filter payload-backend dev
pnpm --filter react-components-library storybook
