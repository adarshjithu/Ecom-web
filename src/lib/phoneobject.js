import { parsePhoneNumberFromString } from 'libphonenumber-js';

function getPhoneObject(phone) {
  const phoneNumber = parsePhoneNumberFromString(phone || "");
  if (!phoneNumber) return null;
  return {
    code: `+${phoneNumber.countryCallingCode}`,
    number: phoneNumber.nationalNumber
  };
}

export default getPhoneObject;