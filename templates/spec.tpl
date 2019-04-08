import { ReactStateTestBed } from 'react-state';

import { {{pascalCase name}} } from './{{name}}';
import { {{pascalCase name}}StateActions } from './{{folderName}}/{{name}}.actions';

describe('{{pascalCase name}}', () => {
    let {{name}}: {{pascalCase name}};

    beforeAll(() => {
        ReactStateTestBed.setTestEnvironment();
    });

    beforeEach(() => {
        {{name}} = new {{pascalCase name}}(null);
        const actions = ReactStateTestBed.createActions<{{pascalCase name}}StateActions>({{pascalCase name}}StateActions, {});
        ReactStateTestBed.setActionsToComponent(actions, {{name}});
    });

    it('should create actions', () => {
        expect({{name}}.actions).not.toBeNull();
    });
});
