import * as React from 'react';
import { TodosContext } from '../TodosContext';

const useTodos = (): ContextProps => {
  const context = React.useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};

export default useTodos;
