import {
  GetUserQuery,
  GetUserQueryVariables,
  LogoutMutation,
  LogoutMutationVariables,
  SignInInput,
  SignUpInput,
  SigninMutation,
  SigninMutationVariables,
  SignupMutation,
  SignupMutationVariables,
} from "@/graphql/generated/types";
import Logout from "@/graphql/mutations/auth/logout";
import Signin from "@/graphql/mutations/auth/signin";
import Signup from "@/graphql/mutations/auth/signup";
import GetUser from "@/graphql/queries/auth/getUser";
import { useSnackbar } from "@/hooks";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: GetUserQuery["getMe"] | null;
  isLoading: boolean;
  handleSignin: (input: SignInInput) => Promise<void>;
  handleSignup: (input: SignUpInput) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  handleSignin: () => Promise.resolve(),
  handleSignup: () => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const { data, loading, refetch } = useQuery<GetUserQuery, GetUserQueryVariables>(GetUser, {
    skip: !hasToken,
    errorPolicy: "ignore",
  });

  const user = data?.getMe || null;
  const isLoading = loading;
  const [signin] = useMutation<SigninMutation, SigninMutationVariables>(Signin);
  const [signup] = useMutation<SignupMutation, SignupMutationVariables>(Signup);
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(Logout);


  const handleSignin = async (input: SignInInput) => {
    try {
      const response = await signin({ variables: { signInInput: input } });
      const token = response.data?.login?.access_token || "";
      localStorage.setItem("token", token);
      setHasToken(true);
      await refetch();
      router.push("/profil");
    } catch (err) {
      snackbar.error("Une erreur est survenue");
    }
  };

  const handleSignup = async (input: SignUpInput) => {
    try {
      await signup({ variables: { signUpInput: input } });
      router.push("/signin");
    } catch (err) {
      snackbar.error("Une erreur est survenue");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setHasToken(false);
      router.push("/");
    } catch (err) {
      snackbar.error("Une erreur est survenue");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleSignin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
