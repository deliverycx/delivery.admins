import { ReducerAction } from ".";

export const initialStateOrderPayment = {
		organization:'',
		token:'',
		retunrs:false,
		errors:''
};
type typeinitialState = typeof initialStateOrderPayment

export enum ReducerActionType {
	setOrganization,
	setToken,
	setReturns,
	setError
}


export function OrderPaymentReducer(state: typeinitialState, action: ReducerAction<ReducerActionType>) {
  switch (action.type) {
    case ReducerActionType.setOrganization:
      return {
        ...state,
        organization: action.payload,
      };

			case ReducerActionType.setToken:
				return {
					...state,
					token: action.payload,
				};	
			case ReducerActionType.setReturns:
				return {
					...state,
					retunrs: action.payload,
				};
			case ReducerActionType.setError:
				return {
					...state,
					errors: action.payload,
				};			
    default:
      return state
  }
}
