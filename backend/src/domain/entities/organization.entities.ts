import { AbstractEntities } from "src/application/abstracts/entities.abstract";

interface IOrganizationEntities{
  orgid: string,
  delivmetod:string | null
}

export class OrganizationEntities extends AbstractEntities < IOrganizationEntities> {
  delivMetod(id:string,metod:string | null) {
    return this.entities = {
      orgid: id,
      delivmetod:metod
    }
  }
}
export const organizationEntities = new OrganizationEntities()