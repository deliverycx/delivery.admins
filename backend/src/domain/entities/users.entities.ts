import { AbstractEntities } from "src/application/abstracts/entities.abstract"

export interface IUsersEntities{
  name: string
  password: string
}

class UsersEntities extends AbstractEntities<IUsersEntities>{
  name(name:string) {
    return this.entities.name = name
  }
}
export const usersEntities = new UsersEntities()