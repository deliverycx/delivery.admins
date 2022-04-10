

function parseOrganization(organization:any,geo:any) {
  const matchesAddress = organization.address.match(
    /(?<city>.*?),\s?(?<street>.*)/i
  );

    if(matchesAddress) {
      const { city, street } = matchesAddress.groups;
      
      console.log(city)
      const organizationInArray = {
        street,
        guid: organization.id,
        
        workTime: organization.workTime.split(";")[0],
        phone: organization.phone
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