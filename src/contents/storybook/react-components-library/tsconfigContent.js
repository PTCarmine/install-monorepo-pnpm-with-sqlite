export const createTsconfigContent = () => {
    const content = {
        compilerOptions: {
            target: "ES2017",
            module: "ESNext",
            lib: ["dom", "dom.iterable", "esnext"],
            declaration: true,
            declarationDir: "dist",
            jsx: "react-jsx",
            moduleResolution: "node",
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            skipLibCheck: true,
            strict: true,
            outDir: "dist",
        },
        include: ["src"],
        exclude: ["node_modules", "dist", "**/*.stories.tsx"],
    };

    return JSON.stringify(content, null, 2); // Serializza il contenuto con indentazione
};