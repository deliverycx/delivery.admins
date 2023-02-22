import { ReducerAction } from ".";

export const initialStateOrderPayment = {
		order:null,
		barPayment:null,
		organization:'',
		token:'',
		tokenBar:'',
		retunrs:false,
		errors:''
};
type typeinitialState = typeof initialStateOrderPayment

export enum ReducerActionType {
	setOrder,
	setBarPayment,
	setOrganization,
	setToken,
	setTokenBar,
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
			case ReducerActionType.setTokenBar:
				return {
					...state,
					tokenBar: action.payload,
				};		
			case ReducerActionType.setOrder:
				return {
					...state,
					order: action.payload,
				};
			case ReducerActionType.setBarPayment:
				return {
					...state,
					barPayment: action.payload,
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
