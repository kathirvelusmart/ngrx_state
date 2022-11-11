// Reducer is a pure fuction
import { createReducer, on } from "@ngrx/store";
import { increment, decrement, reset, customCounter, changeProjectName } from "./counter.action";
import { initialState } from "./counter.state";


const _counterReducer = createReducer(
    initialState,
    on(increment, (state: any) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),
    on(decrement, (state: any) => {
        return {
            ...state,
            counter: state.counter - 1
        }
    }),
    on(reset, (state: any) => {
        return {
            ...state,
            counter: 0
        }
    }),
    on(customCounter, (state: any, action: any) => {
        return {
            ...state,
            counter: state.counter + action.count
        }
    }),
    on(changeProjectName, (state: any, action: any) => {
        console.log(action)
        return {
            ...state,
            projectName: action.newProjectName
        }
    })
)

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}