import { ReducerAction } from ".";

export const initialStateOrderPayment = {
		organization:'',
		token:''
};
type typeinitialState = typeof initialStateOrderPayment

export enum ReducerActionType {
	setOrganization,
	setToken
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
    default:
      return state
  }
}
