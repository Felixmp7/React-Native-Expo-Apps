import * as React from 'react';
import useTodoReducer from './reducers/useTodoReducer';
import todos from './todos.json';

export const TodosContext = React.createContext<ContextProps | undefined>(undefined);

const TodosProvider = ({ children }: ChildrenNode): JSX.Element => {
    const [state, dispatch] = React.useReducer(useTodoReducer, { todos });

    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;
