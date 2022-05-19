import { AbstractEntities } from "src/application/abstracts/entities.abstract";

interface IOrganizationEntities{
  orgid: string,
  delivmetod: string | null,
  isHidden:boolean
}

export class OrganizationEntities extends AbstractEntities < IOrganizationEntities> {
  delivMetod(id:string,metod:string | null) {
    return this.entities = {
      orgid: id,
      delivmetod:metod
    }
  }
  hiddenMetod(id:any,metod:boolean) {
    return this.entities = {
      orgid: id,
      isHidden:metod
    }
  }
	
}
export const organizationEntities = new OrganizationEntities()