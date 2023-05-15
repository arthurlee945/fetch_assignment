"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, FC, ReactNode, useEffect } from "react";
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
    login: ({ name, email }: User) => Promise<string>;
    logout: () => Promise<string>;
}

const API_URL = "https://frontend-take-home-service.fetch.com";
const queryClient = new QueryClient();
export const GlobalContext = createContext<GlobalContextProps>({
    authenticatedUser: {
        authenticated: false,
        user: undefined,
    },
    login: ({ name, email }: User) => new Promise((resolve) => resolve("not initialized")),
    logout: () => new Promise((resolve) => resolve("not initialized")),
});

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProviderProps> = ({ children }) => {
    const router = useRouter();
    const [authenticatedUser, setauthenticatedUser] = useState<authedState>({
        authenticated: false,
        user: undefined,
    });

    const login = ({ name, email }: User): Promise<string> => {
        return new Promise(async (resolve, reject) => {
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
                data === "OK" ? resolve("successful") : reject("Something went wrong in our server.");
            } catch (err) {
                setauthenticatedUser((curr) => ({
                    ...curr,
                    authenticated: false,
                    user: undefined,
                }));
                reject("Sorry Something went wront");
            }
        });
    };
    const logout = (): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(API_URL + "/auth/logout", {}, { withCredentials: true });
                setauthenticatedUser((curr) => ({
                    ...curr,
                    authenticated: false,
                    user: undefined,
                }));
                resolve(typeof data === "string" ? data : "Successful");
            } catch (err) {
                reject("Failed to log out");
            }
        });
    };
    const value = {
        authenticatedUser,
        login,
        logout,
    };
    useEffect(() => {
        !authenticatedUser.authenticated && router.push("/login");
    }, [authenticatedUser, router]);
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
