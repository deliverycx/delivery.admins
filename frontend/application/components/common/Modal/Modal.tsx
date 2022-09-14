import { useState, ReactNode, FC } from 'react';
import { Dispatch } from 'react';

type IProps = {
	setter:Dispatch<boolean>
	children:ReactNode
}

const Modal:FC<IProps> = ({setter,children}) =>{


	return (
		<>
			<div className="modal_box">
					<div className="modal_overfloy"  onClick={()=> setter(false)}></div>
						<div className="col-md-8 modales">
						<div className="card card-warning">
							<div className="card-header">
								<h3 className="card-title">Removable</h3>

								<div className="card-tools">
									<button type="button" className="btn btn-tool" data-card-widget="remove" onClick={()=> setter(false)}>
										<img src="/img/close.png" />
									
									</button>
								</div>
								
							</div>
							{children}
							
						</div>
						
					</div>
				</div>
		</>
	)

}
export default Modal