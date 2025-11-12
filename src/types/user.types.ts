export interface Address {
  city: string; 
}

export interface Company {
  name: string; 
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
