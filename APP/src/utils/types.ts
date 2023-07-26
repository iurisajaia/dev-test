export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  address: Address;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
