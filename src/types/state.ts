import { CategoryType } from "./category";
import { CartType } from "./cart";
import { ProfileType } from "./profile";

export interface featureState {
  hamburger: boolean;
  category: {
    men: CategoryType[] | [];
    women: CategoryType[] | [];
  };
}

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string;
  avatar: {
    url: string;
  };
  email: string;
  userId: string;
  isEmailVerified: boolean;
  role: string;
  isLoggedIn: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserState;
  error: string | null;
}

export interface CartState {
  cart: CartType[] | [];
  totalPrice: number;
  discountedTotalPrice: number;
}

export interface wishlistState {
  proudcts: string[] | [];
}

export interface profileState extends ProfileType {}

export interface RootState {
  user: AuthState;
  features: featureState;
  cart: CartState;
  wishlist: wishlistState;
  profile: profileState;
}
