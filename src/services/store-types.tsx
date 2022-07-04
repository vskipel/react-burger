import { TAuthActions } from "./actions/auth-types";
import { TIngredientsActions } from "./actions/ingredients-types";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import store from "./store";

export type RootState = ReturnType<typeof store.getState>; 

type TApplicationActions = TIngredientsActions | TAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
