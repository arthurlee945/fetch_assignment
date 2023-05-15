import { FC } from "react";
import { Global, css } from "@emotion/react";
import { colors, medias } from "@/styles/style-variables";

const globalStyles = css`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        -webkit-tap-highlight-color: transparent;
    }
    html,
    body {
        font-family: "Helvetica", "Arial", sans-serif;
        background-color: ${colors.white};
        color: ${colors.black};
        max-width: 100vw;
        overflow-x: hidden;
        scroll-behavior: smooth;
        scrollbar-width: thin;
    }

    html {
        color-scheme: dark;
    }

    body {
        margin: 15px;
        overflow-x: hidden;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        border: 2px solid ${colors.black};
        position: relative;
        min-height: calc(100vh - 30px);
        min-height: calc(100svh - 30px);
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            margin: 10px;
            min-height: calc(100vh - 20px);
            min-height: calc(100svh - 20px);
        }
    }
    main {
        position: relative;
        padding: 25px 20px;
        @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        }

        @media screen and (max-width: ${`${medias.mobile}px`}) {
            padding: 20px 10px;
        }
    }
    /*override default scroll bar*/

    body::-webkit-scrollbar {
        appearance: none;
        width: 4px;
    }
    body::-webkit-scrollbar-track {
        background-color: ${colors.lightGrey};
    }
    body::-webkit-scrollbar-thumb {
        background-color: ${colors.darkGrey};
    }
    body::-webkit-scrollbar-thumb:hover {
        background-color: ${colors.black};
    }

    a {
        color: inherit;
        text-decoration: none;
    }
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    li,
    ul {
        list-style: none;
    }

    .paragraph-small {
        font-size: 0.9rem;
        font-weight: 500;
        @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        }
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            font-size: 0.8rem;
        }
    }
    .paragraph {
        font-size: 1rem;
        font-weight: 500;
        @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
        }
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            font-size: 0.9rem;
        }
    }
`;

const GlobalStyles: FC = () => <Global styles={globalStyles} />;

export default GlobalStyles;
