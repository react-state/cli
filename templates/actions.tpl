import { HasStore, InjectStore } from 'react-state-rxjs';
import { Map } from 'immutable';

@InjectStore({{{ statePath }}})
export class {{pascalCase name}}StateActions extends HasStore<Map<any, any>> {
}