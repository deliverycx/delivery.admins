import axios from "axios";


function parseOrganization(organization:any,geo:any) {
	
	//console.log(organization);
	

  const matchesAddress = organization.restaurantAddress.match(
		/(?<oblast>.*?),(?<city>.*?),\s?(?<street>.*)/i
  );

    if(matchesAddress) {
      const { city, street } = matchesAddress.groups;
      
      
      const organizationInArray = {
        street,
        guid: organization.id,
        
        workTime:organization.workTime ? organization.workTime.split(";")[0] : '',
        phone: organization.phone ? organization.phone : ''
      };

			

      return {
        city: city.trim(),
        organization: organizationInArray,
        info:organization
      }
    }
    
}

export type Organization = ReturnType<typeof parseOrganization>;
export {
    parseOrganization
};