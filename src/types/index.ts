import { Method } from "axios";

export interface InputData {
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
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
  headers?: object;
  debounceTime?: number;
}

export interface LoginPayload {
  accessToken: string | null;
  refreshToken: string | null;
  username: string;
  email: string;
  userId: string;
  isEmailVerified: boolean;
  role: string;
}

export interface SliderProps {
  title: string;
  categoryID: React.ReactNode;
}

export interface AuthRouteProps {
  component: React.ComponentType<any>;
}
