export type IGroopsBanner = {
	_id:string
	name:string
	category:string
	banners:IBanner[]
}

export type IBanner = {
	_id: string
	images:string[]
	mobimages:string[]
	order:number
	smallimages: string[]
	url: string
}

export type IDisplayBanner = {
	_id: string
	organization:string
	groopbanner:IGroopsBanner
	banners:IBanner
}
