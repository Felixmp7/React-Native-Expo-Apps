/* eslint-disable @typescript-eslint/no-unused-vars */

type Todos = {
    id: string;
    task: string;
    description: string;
    done: boolean;
};
type Action = {
    type: string;
    payload: Todos;
};

type Dispatch = (action: Action) => void;
type State = { todos: Array<Todos> };

type ContextProps = {
    state: State;
    dispatch: Dispatch
};
