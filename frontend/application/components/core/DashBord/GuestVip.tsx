import { RequestDashBord } from "servises/repository/Axios/Request"
import { useEffect, useState } from 'react';

const GuestVip = () =>{
	const [vip,setVip] = useState<any>(null)

	const getDashbordVip = async () =>{
		try {
			const {data} = await RequestDashBord.CRUDFabric.getBu('')
			if(!data){
				await RequestDashBord.switchGuestVip({})
			}
			setVip(data)
		} catch (error) {
			console.log(error);
		}
	}

	const swtichDashbordVip = async () =>{
		try {
			if(vip){
				const {data} = await RequestDashBord.switchGuestVip({
					_id:vip._id,
					guestvip:!vip.guestvip
				})
				
			}
			getDashbordVip()
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		getDashbordVip()
	},[])



	return (
		<>
			<button onClick={swtichDashbordVip}>
				{
					vip && vip.guestvip ? 'выключить вип' : 'включить вип'
				}
			</button>
		</>
	)

}
export default GuestVip