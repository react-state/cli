const promptDirectory = require('inquirer-directory');
const path = require('path');
const finder = require('find-package-json');
const pluralize = require('pluralize');
const packageJson = finder(process.cwd()).next().value;

module.exports = function (plop) {
    const customPath = (packageJson.reactStateRxJsCli && packageJson.reactStateRxJsCli.basePath) || '';
    const folderName = (packageJson.reactStateRxJsCli && packageJson.reactStateRxJsCli.actionsFolderName) || 'actions';

    const userConfig = path.resolve(process.cwd(), customPath);
    const basePath = userConfig || process.cwd();

    plop.setPrompt('directory', promptDirectory);

    const chooseDirAction = {
        type: 'directory',
        name: 'directory',
        message: 'Choose a directory',
        basePath: basePath
    };

    const statePathAction = {
        type: 'input',
        name: 'statePath',
        message: 'Enter state path',
        default: ''
    };

    const addOrEdit = {
        type: 'list',
        name: 'extends',
        message: 'What component should extend?',
        default: 'add',
        choices: [
            { name: 'ReactComponentWithStateActions', value: 'reactStateComponent' },
            { name: 'React.Component', value: 'plainComponent' },
          ],
    };

    plop.setGenerator('react-staterx-js add', {
        description: 'Create new stack',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of component?'
            }
        ].concat(chooseDirAction, statePathAction, addOrEdit),
        actions: function (data) {
                return getAddActions(data);
        }
    });

    function getAddActions(data) {
        const actions = {
            type: 'add',
            skipIfExists: true,
            path: buildPath('{{ \'dashCase\' name}}.actions.ts', data.directory, folderName),
            templateFile: `./templates/actions.tpl`
        };

        const specFile = {
            type: 'add',
            skipIfExists: true,
            path: buildPath('{{ \'dashCase\' name}}.spec.ts', data.directory),
            templateFile: `./templates/spec.tpl`,
            data: {
                folderName: folderName
            }
        };

        const component = {
            type: 'add',
            skipIfExists: true,
            path: buildPath('{{ \'dashCase\' name}}.tsx', data.directory),
            templateFile: data.extends === 'reactStateComponent' ? './templates/component.tpl' : './templates/component-plain.tpl',
            data: {
                folderName: folderName
            }
        };

        return [actions, component,  specFile];
    }

    plop.setHelper('singular', function (value) {
        return pluralize.singular(value);
    });

    function buildPath(name, chosenDir, folderName) {
        const basePath = customPath ? userConfig : process.cwd();
        folderName = folderName ? `${folderName}/` : '';

        return `${basePath}/${chosenDir}/${folderName}/${name}`;
    }
}