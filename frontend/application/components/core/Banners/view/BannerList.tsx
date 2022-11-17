import { IBanner } from "@type";
import { imgRout } from "application/helpers/imgInit";
import { FC, memo, ReactNode } from "react"

type IProps = {
	banners:IBanner[],
	handler?:(id:string) => void,
	children?:ReactNode
}

const BannerList:FC<IProps> = ({banners,handler,children}) => {

	const grid = 4;
	const getItemStyle = () => ({
	  padding: grid * 2,
	  margin: `0 ${grid}px 0 0`,
	  background: '#f0f0f0',
	});

	return (
		<div className="card-body">
			<div className="row banners_box">
				{
					banners && banners.length > 0 &&
					banners.sort((a: any, b: any) => (a.order - b.order)).map((val: any) => {
						return (
							<div
								key={val._id}
								style={getItemStyle()}
								className="col-sm-2 banner-item"
								onClick={() => typeof handler === 'function' && handler(val._id)}
							>
								<a data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
									<img src={imgRout(val.images[0])} className="img-fluid mb-2" alt="white sample" />
								</a>
								{
									children
								}
							</div>
						)
					})
				}


			</div>
		</div>
	)
}
export default memo(BannerList) 