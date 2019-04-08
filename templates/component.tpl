import * as React from 'react';
import { ComponentState, ReactComponentWithStateActions } from 'react-state-rxjs';
import { {{pascalCase name}}StateActions } from './{{folderName}}/{{name}}.actions';

@ComponentState({{pascalCase name}}StateActions)
export class {{pascalCase name}} extends ReactComponentWithStateActions<any, any, {{pascalCase name}}StateActions> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return '';
    }
}