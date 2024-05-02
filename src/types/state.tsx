export interface featureState {
  hamburger: boolean;
}

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string;
  avatar: string;
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

export interface RootState {
  user: AuthState;
  features: featureState;
}
