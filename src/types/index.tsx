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
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
