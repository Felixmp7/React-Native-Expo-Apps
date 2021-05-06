/* eslint-disable @typescript-eslint/no-unused-vars */
type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
};

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
type ChildrenNode = { children: React.ReactNode };

type ContextProps = {
    state: State;
    dispatch: Dispatch
};
type ApiResponseProps = {
    status: string;
    data: any,
    error?: any
};
