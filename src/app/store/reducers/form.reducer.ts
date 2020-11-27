import { createReducer, on } from '@ngrx/store';
import { save, reset } from 'src/app/store/actions/form.actions';

export const initialState = {
  form: {}
}

const _formReducer = createReducer(
  initialState,
  on(save, (state, { form }) => ({ form: { ...state.form, ...form }})),
  on(reset, (state) => ({ form: {}}))
);

export function formReducer(state, action) {
  return _formReducer(state, action);
}
