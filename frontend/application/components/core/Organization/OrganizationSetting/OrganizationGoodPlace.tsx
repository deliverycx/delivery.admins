import React, {FC, useEffect} from 'react';
import {adapterComponentUseCase} from "../../../../../adapters/adapterComponents";
import {useOrganizationGoodPlace} from "../../../../../domains/useCase/organization/useCase.OrganizationGoodPlace";

const OrganizationGoodPlace: FC<{organization:any,refresh:any}> = ({organization,refresh}) =>{
    const useCase = adapterComponentUseCase(useOrganizationGoodPlace,organization.id)
    const { info } = useCase.data
    const { handleSubmit, register, onSubmit } = useCase.handlers
    console.log(info, 'INFO')


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Хорошее место</h3>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <br />
                        <div className="popBox_item col-3">
                            <label className="form-label">Айди точки для фрейма (Хорошее место)</label>
                            <input type="text" {...register('goodplaceid')} defaultValue={info && info.goodplaceid} name="goodplaceid" className="form-control" />
                        </div>
                    </div>
                    <input type="submit" value="Сохранить" className="btn btn-success"/>

                </div>

            </div>
        </form>

    )
};

export default OrganizationGoodPlace;