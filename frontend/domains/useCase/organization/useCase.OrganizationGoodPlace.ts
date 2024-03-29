import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {requestGoodPlacePayment} from "../../../servises/repository/Axios/Request/Request.OrganizationGoodPlace";
import {IGoodPlace} from "../../../@type";
import login from "../../../pages/api/auth/login";

export function useOrganizationGoodPlace(this: any,id:string) {
    const router = useRouter()
    const initState = {
        goodplaceid: ''
    }

    const [info,setInfo] = useState<IGoodPlace | null>(null)

    useEffect(()=>{
        getBu()
    },[id])

    const { register, handleSubmit, watch,setValue } = useForm<typeof initState>();

    const onSubmit = async (data:any) => {
        try {
            !info
                ? await requestGoodPlacePayment.CRUDFabric.create({ ...data,organization:id })
                : await requestGoodPlacePayment.CRUDFabric.edit({ ...data,organization:id },info._id)
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getBu = async () =>{
        try {
            const {data} = await requestGoodPlacePayment.findBuOrg({organization:id})
            data && setInfo(data)
        } catch (error) {
            console.log(error);
        }
    }

    this.data({
        info
    })
    this.handlers({
        handleSubmit,
        register,
        onSubmit,
    })
    this.status({

    })
}