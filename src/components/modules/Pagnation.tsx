import { FC } from "react";
import styled from "@emotion/styled";
import Arrow from "@/styles/icons/arrow.svg";
import { colors } from "@/styles/style-variables";
import PageButton from "../subComponents/PageButton";
const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
    max-width: 1440px;
    margin: 0px auto;
    margin-top: 25px;
    .arrow-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        aspect-ratio: 1/0.75;
        border: 2px solid ${colors.black};
        border-radius: 50%;
        padding: 5px;
        transition: background-color 200ms;
        svg,
        path {
            width: 100%;
            fill: ${colors.black};
            stroke: ${colors.black};
            transition: fill 200ms, stroke 200ms;
        }
        &:hover {
            background-color: ${colors.darkGrey};
            svg,
            path {
                fill: ${colors.white};
                stroke: ${colors.white};
            }
        }
        &.left-button {
        }
        &.right-button {
            transform: scaleX(-1);
        }
    }
    .indicator {
        font-size: 1rem;
        font-weight: 600;
        align-self: flex-end;
    }
`;

interface PaginationProps {
    currentPage: number;
    total: number;
    onPageButtonClick: (page?: number, dir?: "left" | "right") => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, total, onPageButtonClick }) => {
    const restOfButtons =
        total < 7
            ? new Array(total - 2).fill(undefined).map((_, i) => i + 2)
            : currentPage === 1 || currentPage < 3
            ? [2, 3, 4]
            : currentPage === total || total - currentPage < 3
            ? [total - 3, total - 2, total - 1]
            : [currentPage - 1, currentPage, currentPage + 1];
    return (
        <PaginationContainer>
            {currentPage !== 1 && (
                <button className="arrow-btn left-button" onClick={onPageButtonClick.bind(null, undefined, "left")}>
                    <Arrow />
                </button>
            )}
            <PageButton
                key={`1-pagination-button`}
                page={1}
                onClick={onPageButtonClick.bind(null, 1, undefined)}
                selected={currentPage === 1}
            />
            {total > 6 && currentPage > 3 && <p className="indicator">...</p>}
            {total > 2 &&
                restOfButtons.map((p) => (
                    <PageButton
                        key={`${p}-pagination-button`}
                        page={p}
                        onClick={onPageButtonClick.bind(null, p, undefined)}
                        selected={currentPage === p}
                    />
                ))}
            {total > 6 && currentPage < total - 2 && <p className="indicator">...</p>}
            <PageButton
                key={`${total}-pagination-button`}
                page={total}
                onClick={onPageButtonClick.bind(null, total, undefined)}
                selected={currentPage === total}
            />
            {currentPage !== total && (
                <button className="arrow-btn right-button" onClick={onPageButtonClick.bind(null, undefined, "right")}>
                    <Arrow />
                </button>
            )}
        </PaginationContainer>
    );
};

export default Pagination;
