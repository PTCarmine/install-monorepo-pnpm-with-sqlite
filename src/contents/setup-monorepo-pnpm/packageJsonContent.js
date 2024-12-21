export const createPackageJsonContent = (name) => {
    const content = (name) => ({
        name: name,
        version: '1.0.0',
        workspaces: [
            'backend/*',
            'frontend/*'
        ]
    });

    return JSON.stringify(content(name), null, 2);
};