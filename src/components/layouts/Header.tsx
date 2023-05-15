"use client";
import { FC, useContext } from "react";
import styled from "@emotion/styled";
//-------custom--------------
import { colors, medias } from "@/styles/style-variables";
import { GlobalContext } from "../../utils/contexts/GlobalContext";
import MainButton from "../subComponents/MainButton";
import MainLink from "../subComponents/MainLink";

const HeaderComponent = styled.header`
    z-index: 1;
    position: sticky;
    padding: 7px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 2px solid ${colors.grey};
    @media screen and (min-width: ${medias.tablet}) {
        &:hover {
        }
    }

    .profile-container {
        display: flex;
        align-items: center;
        column-gap: 15px;
        .loggedin-user {
            font-weight: 600;
        }
    }
`;
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const {
        authenticatedUser: { authenticated, user },
        logout,
    } = useContext(GlobalContext);
    const handleLogout = async () => {
        try {
            const res = await logout();
            res !== "OK" && alert("Failed on logging out");
        } catch (err) {
            alert(err);
        }
    };
    return (
        <>
            <HeaderComponent>
                <div className="profile-container">
                    {authenticated && user && (
                        <p className="paragraph loggedin-user">
                            Hi, <span>{user.name || "Unknown"}</span>!
                        </p>
                    )}
                    {!authenticated ? (
                        <MainLink href="/login" ariaLabel="Log in button">
                            Log In
                        </MainLink>
                    ) : (
                        <MainButton onClick={handleLogout} ariaLabel="Log out button">
                            Log Out
                        </MainButton>
                    )}
                </div>
            </HeaderComponent>
        </>
    );
};

export default Header;
