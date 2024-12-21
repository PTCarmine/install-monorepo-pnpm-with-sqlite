export const createpPackageJsonContent = (name) => {
    const content = (name) => ({
        "name": "react-components-library",
        "version": "0.1.0",
        "private": true,
        "main": "dist/index.js",
        "types": "dist/index.d.ts",
        "scripts": {
            "build": "webpack --mode production",
            "storybook": "storybook dev -p 6006",
            "build-storybook": "storybook build"
        },
        "peerDependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "styled-components": "^6.1.13"
        },
        "devDependencies": {
            "@babel/core": "^7.24.0",
            "@babel/preset-env": "^7.24.0",
            "@babel/preset-react": "^7.24.0",
            "@babel/preset-typescript": "^7.24.0",
            "@storybook/addon-essentials": "^7.6.17",
            "@storybook/addon-webpack5-compiler-babel": "^3.0.3",
            "@storybook/blocks": "^7.6.17",
            "@storybook/react": "^7.6.17",
            "@storybook/react-webpack5": "^7.6.17",
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@types/styled-components": "^5.1.34",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "storybook": "^7.6.17",
            "styled-components": "^6.1.13",
            "ts-loader": "^9.5.1",
            "typescript": "^5.7.2",
            "webpack": "^5.97.1",
            "webpack-cli": "^6.0.1"
        }
    });

    return JSON.stringify(content(name), null, 2);
}