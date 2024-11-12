import React, {createContext, useReducer, ReactNode, Dispatch} from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  creationDate: Date;
};

type State = {
  user: User | null;
  tasks: Task[];
};

type Action =
  | {type: 'SET_USER'; payload: User}
  | {type: 'CLEAR_USER'}
  | {type: 'ADD_TASK'; payload: Task}
  | {type: 'UPDATE_TASK'; payload: Task}
  | {type: 'REMOVE_TASK'; payload: string};

const initialState: State = {
  user: null,
  tasks: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload};
    case 'CLEAR_USER':
      return {...state, user: null};
    case 'ADD_TASK':
      return {...state, tasks: [...state.tasks, action.payload]};
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
