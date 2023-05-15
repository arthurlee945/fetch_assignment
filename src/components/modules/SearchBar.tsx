"use client";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import Search from "@/styles/icons/Search.svg";
import { colors, medias } from "@/styles/style-variables";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";

const SearchBarContainer = styled(m.div)`
    border: 2px solid ${colors.lightGrey};
    border-radius: 5px;
    max-width: 1250px;
    margin: 0px auto;
    padding: 5px 10px 5px 0px;
    form {
        display: flex;
        justify-content: space-between;
        height: fit-content;
        width: 100%;
        > hr {
            border: 0px;
            width: 2px;
            height: 100%;
            background-color: ${colors.lightGrey};
            height: 35px;
            align-self: center;
            @media screen and (max-width: ${`${medias.tablet}px`}) {
                height: 30px;
            }
        }
        .search-input {
            background-color: transparent;
            border: 0px;
            flex: 1;
            font-size: 1.2rem;
            padding: 0px 10px;
            border-radius: 5px;
            @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
                font-size: 1.1rem;
            }

            @media screen and (max-width: ${`${medias.mobile}px`}) {
                font-size: 1rem;
            }
            &:focus {
                outline: 2px solid #08080852;
            }
        }
        .search-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            min-width: 45px;
            aspect-ratio: 1/1;
            background-color: #518ab8;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0px 2px 4px #0808083d;
            transition: box-shadow 300ms, filter 300ms;
            @media screen and (max-width: ${`${medias.tablet}px`}) {
                width: 40px;
                min-width: 40px;
            }
            &:hover {
                box-shadow: 0px 1px 3px #0808083d;
                filter: brightness(0.9);
            }
            path {
                fill: ${colors.white};
            }
        }
    }
`;
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
    const [formStates, setFormState] = useState({
        loading: false,
        submitted: false,
    });
    const {
        register,
        handleSubmit,
        resetField,
        setFocus,
        setError,
        formState: { errors, dirtyFields },
    } = useForm();
    const onSubmit = (data: FieldValues) => {};
    return (
        <SearchBarContainer initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="search-input" placeholder="Search Terrier, Corgi, etc." {...register("breed")} />
                <hr />
                <input className="search-input" placeholder="ZIP Code" {...register("zipcode")} />
                <button type="submit" className="search-button">
                    <Search />
                </button>
            </form>
        </SearchBarContainer>
    );
};

export default SearchBar;
