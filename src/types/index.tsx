import { Method } from "axios";

export interface InputData {
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonData {
  text: string;
}
export interface SSOButtonData {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ApiCallProps {
  url: string;
  method?: Method;
  params?: object;
  data?: object;
  debounceTime?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  isEmailVerified: boolean;
  role: string;
}
