import { createAction, props } from '@ngrx/store';

export const save = createAction('[Form] Save', props<{form: any }>());
export const reset = createAction('[Form] Reset');
