import yaml from 'js-yaml';

export const createYamlWorkspaceContent = () => {
    const content = {
        packages: [
            'backend/*',
            'frontend/*',
            'frontend/react-components-library'
        ]
    };

    return yaml.dump(content, {
        indent: 2,
        lineWidth: -1,
        quotingType: '"',
        forceQuotes: true
    });
}