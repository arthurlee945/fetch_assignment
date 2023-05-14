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
    justify-content: space-between;
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

    return (
        <>
            <HeaderComponent>
                <div className="info-container"></div>
                <div className="profile-container">
                    {authenticated && user && (
                        <p className="paragraph loggedin-user">
                            Hi! <span>{user.name || "Unknown"}</span>!
                        </p>
                    )}
                    {!authenticated ? (
                        <MainLink href="/login">Log in</MainLink>
                    ) : (
                        <MainButton onClick={logout} ariaLabel="Log out button">
                            Log out
                        </MainButton>
                    )}
                </div>
            </HeaderComponent>
        </>
    );
};

export default Header;
