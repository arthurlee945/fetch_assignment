"use client";
import axios from "axios";
import { createContext, useState, FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
import GlobalStyles from "@/styles/GlobalStyles";

type User = {
    name: string;
    email: string;
};
type authedState = {
    authenticated: boolean;
    user: User | undefined;
};

interface GlobalContextProps {
    authenticatedUser: authedState;
    login: ({ name, email }: User) => void;
    logout: () => void;
}

const API_URL = "https://frontend-take-home-service.fetch.com";
const queryClient = new QueryClient();
export const GlobalContext = createContext<GlobalContextProps>({
    authenticatedUser: {
        authenticated: false,
        user: undefined,
    },
    login: () => {},
    logout: () => {},
});

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProviderProps> = ({ children }) => {
    const [authenticatedUser, setauthenticatedUser] = useState<authedState>({
        authenticated: false,
        user: undefined,
    });

    const login = async ({ name, email }: User) => {
        try {
            const { data } = await axios.post(
                API_URL + "/auth/login",
                { name, email },
                {
                    withCredentials: true,
                }
            );
            setauthenticatedUser((curr) => ({
                ...curr,
                authenticated: data === "OK",
                user:
                    data === "OK"
                        ? {
                              name,
                              email,
                          }
                        : undefined,
            }));
        } catch (err) {
            console.error(err);
            setauthenticatedUser((curr) => ({
                ...curr,
                authenticated: false,
                user: undefined,
            }));
        }
    };
    const logout = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/logout");
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };
    const value = {
        authenticatedUser,
        login,
        logout,
    };
    return (
        <>
            <GlobalStyles />
            <QueryClientProvider client={queryClient}>
                <GlobalContext.Provider value={value}>
                    <LazyMotion features={domAnimation}>{children}</LazyMotion>
                </GlobalContext.Provider>
            </QueryClientProvider>
        </>
    );
};

export default GlobalContextProvider;
