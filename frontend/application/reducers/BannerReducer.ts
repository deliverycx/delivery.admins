import { ReducerAction } from ".";

export const initialStateBanner = {
		filee: "",
    smallFilee: "",
		mobfile:"",
    banners: null,
		stories:"",
		organizations:null,
		selectOrg:"all",
		error:false,
		url:""
};
type typeinitialState = typeof initialStateBanner

export enum ReducerActionTypePoints {
	setFile,
  setSmallFile,
	setMobfile,
	setStories,
	setBanners,
	setOrganizations,
	setSelectOrg,
	setError,
	setSuccsSelectOrg,
	setUrl
}


export function BannerReducer(state: typeinitialState, action: ReducerAction<ReducerActionTypePoints>) {
  switch (action.type) {
    case ReducerActionTypePoints.setFile:
      return {
        ...state,
        filee: action.payload,
      };
  	case ReducerActionTypePoints.setSmallFile:
      return {
        ...state,
        smallFilee: action.payload,
    };
		case ReducerActionTypePoints.setMobfile:
      return {
        ...state,
        mobfile: action.payload,
    };
		case ReducerActionTypePoints.setStories:
      return {
        ...state,
        stories: action.payload,
    };
    case ReducerActionTypePoints.setBanners:
      return {
        ...state,
        banners: action.payload,
    };
		case ReducerActionTypePoints.setOrganizations:
      return {
        ...state,
        organizations: action.payload,
    };
		case ReducerActionTypePoints.setSelectOrg:
      return {
        ...state,
        selectOrg: action.payload,
    };
		case ReducerActionTypePoints.setError:
      return {
        ...state,
        error: action.payload,
    };
		case ReducerActionTypePoints.setUrl:
      return {
        ...state,
        url: action.payload,
    };
		case ReducerActionTypePoints.setSuccsSelectOrg:
      return {
        ...state,
				selectOrg:action.payload,
        error: false,
    };
		

    default:
      return state
  }
}
