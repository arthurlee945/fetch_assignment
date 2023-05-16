import { FC } from "react";
import styled from "@emotion/styled";

//----------------parts
import Torso from "./fetch-torso.svg";
import Tail from "./fetch-tail.svg";
import FrontLeg from "./fetch-front-leg.svg";
import BackLeg from "./fetch-back-leg.svg";

const FetchLogoContainer = styled.div`
    position: relative;
    aspect-ratio: 75/46;
    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &.tail {
            transform-origin: 35% 45%;
            animation: tail-wag 500ms ease-in-out infinite;
            @keyframes tail-wag {
                50% {
                    transform: rotate(30deg);
                }
            }
        }
    }
`;
interface FetchLogoProps {
    iconSizes?: { width: number | string; height?: number | string };
}

const FetchLogo: FC<FetchLogoProps> = ({ iconSizes = { width: 75 } }) => {
    return (
        <FetchLogoContainer style={{ ...iconSizes }}>
            <Tail className="tail" />
            <Torso />
            <FrontLeg className="front-leg" />
            <BackLeg className="back-leg" />
        </FetchLogoContainer>
    );
};

export default FetchLogo;
