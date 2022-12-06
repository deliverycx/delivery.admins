import { adapterComponentUseCase } from 'adapters/adapterComponents';
import { useOrganizationTables } from 'domains/useCase/organization/useCase.OrganizationTables';
import { FC, useState } from 'react';

const OrganizationTables:FC<{organization:any}> = ({organization}) =>{
	const usecase = adapterComponentUseCase(useOrganizationTables,organization.id)
	const {table,organizationTable} = usecase.data
	const {handlerAddTable,deliteTables} = usecase.handlers

	const [select,setSelect] = useState<any>(0)
	const [tableModal,setTableModal] = useState<{modal:boolean,tableindex:number}>({
		modal:false,
		tableindex:0
	})

	console.log(tableModal);

	return (
		<div className="card card-primary">
			<div className="card-header">
				<h3 className="card-title">Столики</h3>
			</div>
			<div className="card-body">
				<h4>Название локации</h4>
				{
					table &&
					<div className="row">
					<select onChange={(e) => setSelect(e.target.value) }>
						{
							table.map((val:any,index:number) =>{
								return <option key={val.id} value={index}>{val.name}</option>
							})
						}
						
					</select>
					<button className="btn btn-success" onClick={() => handlerAddTable(select)}>добавить</button>
					</div>
				}
				<br/>
				{
					organizationTable &&
					<div className="card card-widget widget-user-2">

              <div className="widget-user-header bg-info">

                <h3 className="widget-user-username">Активные локации</h3>
              </div>
              <div className="card-footer p-0">
                <ul className="nav flex-column">
									{
										organizationTable.map((table:any,index:number)=>{
											return (
												<li key={table._id} className="nav-item">
			                    <a className="nav-link float-left" onClick={()=> setTableModal((prev:any)=> {
														return {
															...prev,
															modal:true,
															tableindex:index
														}
													})}>
			                      {table.name} 
			                    </a>
													<button className="float-right nav-link btn btn-danger" onClick={()=> deliteTables(table._id)}>удалить</button>
			                  </li>
											)
										})
									}
                  
                  
                  
                </ul>
              </div>
            </div>
				}
				
				{
				tableModal.modal &&
				<div className="modal_box">
					<div className="modal_overfloy"  onClick={()=> setTableModal((prev:any) => {return {...prev,modal:false}})}></div>
						<div className="col-md-8 modales">
						<div className="card card-warning">
							<div className="card-header">
								<h3 className="card-title">ССылки QR кода</h3>

								<div className="card-tools">
									<button type="button" className="btn btn-tool" data-card-widget="remove" onClick={()=> setTableModal((prev:any) => {return {...prev,modal:false}})}>
										<img src="/img/close.png" />
									
									</button>
								</div>
							</div>		
								<div className="card-body">
									<div className="row banners_box">
										<ul className="nav flex-column">
														
										{
											organizationTable[tableModal.tableindex].tables
											.map((val: any) => {
												return (
													
													<li key={val.id} className="nav-item"> <strong>столик - №{val.number},</strong> <br />
													
													{
														`http://localhost:3000/shop?organuzation=${organization.id}&table=${JSON.stringify({id:val.id,numb:val.number,section:organizationTable[tableModal.tableindex].idsection})}&delivMetod=ONSPOT
													`} 
													</li>
														
													
												)
											})
										}
										</ul>

									</div>
								</div>
								
							</div>
							
							
							
						
						
					</div>
				</div>
				
			}

			</div>

		</div>
	)
}
export default OrganizationTables