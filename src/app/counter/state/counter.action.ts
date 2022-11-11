import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customCounter = createAction('customCounter', props<{ count: number }>());
export const changeProjectName = createAction('changeProjectName', props<{ newProjectname: string }>());