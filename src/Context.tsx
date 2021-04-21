import * as React from 'react';
import todos from './todos.json';

export const TodosContext = React.createContext<ContextProps | undefined>(undefined);

const todoReducer = (state: State, action: Action): Array<Todos> | any => {
    switch (action.type) {
        case 'ADD_TODO': {
            const todoList: Array<Todos> = state.todos;
            todoList.push(action.payload);

            return {
                ...state,
                todos: [...todoList],
            };
        }
        case 'REMOVE_TODO': {
            const todoList: Array<Todos> = state.todos;
            const find = todoList.findIndex((todo) => todo.id === action.payload.id);
            todoList.splice(find, 1);

            return {
                ...state,
                todos: [...todoList],
            };
        }
        case 'TOGGLE_DONE_TODO': {
            const todoList: Array<Todos> = state.todos;
            const index: number = todoList.findIndex((todo) => todo.id === action.payload.id);
            todoList[index].done = !todoList[index].done;

            return {
                ...state,
                todos: [...todoList],
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const TodosProvider = ({ children }: ChildrenNode): JSX.Element => {
    const [state, dispatch] = React.useReducer(todoReducer, { todos });

    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosProvider;
