import { FC, RefObject, useEffect, useRef, useState } from "react"
import cn from "classnames";
import { RequestOrganization } from "servises/repository/Axios/Request";

type IProps ={
  setter: (id:string) => void
	selected?: string
}
const FormSelectOrganization:FC<IProps> = ({selected = 'all', setter }) => {
	const [organizations, setOrganizations] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selecteds, setSelecteds] = useState<string>('');
  const ref = useRef() as RefObject<HTMLDivElement> | null;

	useEffect(()=>{
		fetchOrg()
	},[])

	useEffect(()=>{
		if(selected === 'all'){
			setSelecteds('Все точки')
		}else{
			organizations &&
			organizations.map((val:any) => val.organizations.map((org:any) => selected === org.id && setSelecteds(org.address.street)))
		}
		
	},[selected,organizations])

	const fetchOrg = async () => {
    try {
      const { data } = await RequestOrganization.getAll()
			setOrganizations(data)
    } catch (error) {
      console.log(error)
    }
  }

    const dynamycCN = (value: string)=>cn(value, {open: isOpen});

    const openToggle = ()=>{
        setIsOpen(isOpen ? false : true);
    }
    const valueClickHandler = (id:string,name:string)=>{
        setter(id);
				setSelecteds(name)
        openToggle();
    }

    return (
        <div className="form__field__type col-2" onClick={openToggle} ref={ref}>
            <div className="form__field__valueselect">
                {
                    selecteds
                }
            </div>
            <div className={dynamycCN("form__field__values")}>
								<div className="form__field__values__item" onClick={()=> valueClickHandler('all','Все точки')}>Все точки</div>
                {
										organizations &&
                    organizations.map((option:any) => {


                        
												return (
													<>
						
														<option disabled>{option.name}</option>
														{
															option.organizations.map((org:any)=>{
																 const CN = cn("form__field__values__item", {active: selected === org.id})
																return <div
																	className={CN}
																	key={org.id} 
																	onClick={()=> valueClickHandler(org.id,org.address.street)} 
																	
																	>- {org.address.street}</div>
															})
														}
														
													</>
												)
                    })
                }
								
            </div>
            
        </div>
    )
}
export default FormSelectOrganization