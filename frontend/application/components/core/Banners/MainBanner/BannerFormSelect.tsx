import { FC, RefObject, useEffect, useRef, useState } from "react"
import cn from "classnames";

type IProps ={
  options: any,
  selected: any,
  setter: any
}
const FormSelect:FC<IProps> = ({ options, selected, setter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selecteds, setSelecteds] = useState<string>('');
  const ref = useRef() as RefObject<HTMLDivElement> | null;


	useEffect(()=>{
		if(selected === 'all'){
			setSelecteds('Все точки')
		}else{
			options.map((val:any) => val.organizations.map((org:any) => selected === org.id && setSelecteds(org.address.street)))
		}
	},[selected])

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
        <div className="form__field__type" onClick={openToggle} ref={ref}>
            <div className="form__field__valueselect">
                {
                    selecteds
                }
            </div>
            <div className={dynamycCN("form__field__values")}>
								<div className="form__field__values__item" onClick={()=> valueClickHandler('all','Все точки')}>Все точки</div>
                {
                    options.map((option:any) => {


                        
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
export default FormSelect