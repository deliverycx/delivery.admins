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
			return data
		} catch (error) {
			
		}
	}

	const swtichDashbordVip = async () =>{
		try {
			//const res = await getDashbordVip()

			if(vip){
				const {data} = await RequestDashBord.switchGuestVip({
					_id:vip._id,
					guestvip:!vip.guestvip
				})
				
			}
			getDashbordVip()
		} catch (error) {
			
		}
	}

	useEffect(()=>{
		getDashbordVip()
	},[])

	console.log(vip);

	return (
		<>
			<button onClick={swtichDashbordVip}>{
				vip.guestvip ? 'выключить вип' : 'включить вип'
			}</button>
		</>
	)

}
export default GuestVip