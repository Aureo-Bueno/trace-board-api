import { RegisterRequest } from "../register";

export interface UpdateUserRequest extends Omit<RegisterRequest, "email"> {
  id: string;
}
