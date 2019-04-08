import * as React from 'react';
import { ComponentState, ReactComponentWithStateActions } from 'react-state-rxjs';
import { {{pascalCase name}}StateActions } from './{{folderName}}/{{name}}.actions';

@ComponentState({{pascalCase name}}StateActions)
export class {{pascalCase name}} extends React.Component {
    actions: {{pascalCase name}}StateActions;
    statePath: any;

    constructor(props: any) {
        super(props);
    }

    render() {
        return '';
    }
}