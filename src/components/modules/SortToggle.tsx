import { FC, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors, medias } from "@/styles/style-variables";

const SortToggleContainer = styled.div`
    border-radius: 3px;
    max-width: 1000px;
    margin: 0px auto;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    @media screen and (max-width: ${`${medias.mobile}px`}) {
        margin-top: 10px;
    }
    .toggle-container {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .toggle-label {
            font-size: 1.2rem;
            font-weight: 600;
        }
        .sort-switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 30px;
            input {
                opacity: 0;
                width: 0;
                height: 0;
                &:checked + .indicator {
                    background-color: ${colors.black};
                    &:before {
                        transform: translateX(calc(100% + 8px));
                    }
                }
            }
            .indicator {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-color: ${colors.lightGrey};
                transition: background-color 0.4s;
                &:before {
                    position: absolute;
                    content: "";
                    height: calc(100% - 8px);
                    width: calc(50% - 8px);
                    left: 4px;
                    bottom: 4px;
                    background-color: ${colors.white};
                    transition: transform 0.4s;
                }
            }
        }
    }
`;
interface SortToggleProps {
    onClick: (e: MouseEvent) => void;
}

const SortToggle: FC<SortToggleProps> = ({ onClick }) => {
    return (
        <SortToggleContainer>
            <div className="toggle-container">
                <p className="toggle-label">ASC</p>
                <label className="sort-switch" aria-label="Ascnending order for default and Descending order for toggled">
                    <input type="checkbox" onClick={onClick} />
                    <span className="indicator" />
                </label>
                <p className="toggle-label">DESC</p>
            </div>
        </SortToggleContainer>
    );
};

export default SortToggle;
