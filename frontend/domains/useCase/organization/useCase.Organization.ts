import RequestOrganization from "servises/repository/Axios/Request/Request.Organization"


export function useOrganization(this: any) {
  
  const handlePuckUp = async (idorganization:string,delivmetod:string | null) => {
    const { data } = await RequestOrganization.switchDelivMetod({ idorganization, delivmetod })
    console.log(data)
  }

  this.data({
    
  })
  this.handlers({
    handlePuckUp
  })
  this.status({
    
  })
}