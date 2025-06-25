export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
