import GlobalContextProvider from "@/utils/GlobalContext";
import Header from "@/components/layouts/Header";
export const metadata = {
    title: "Fetch Assignment",
    description: "Fetch Front End Developer Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <GlobalContextProvider>
                    <Header />
                    {children}
                </GlobalContextProvider>
            </body>
        </html>
    );
}
