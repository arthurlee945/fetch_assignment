"use client";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { m } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Search from "@/styles/icons/Search.svg";
import { colors, medias } from "@/styles/style-variables";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";
const searchSchema = z.object({
    breed: z.string().trim(),
    zipcode: z.number({ errorMap: () => ({ message: "Input needs to be numbers" }) }).max(6, "Please enter in 5 digit zip code"),
});
const SearchBarContainer = styled(m.div)`
    border: 2px solid ${colors.lightGrey};
    border-radius: 5px;
    max-width: 1250px;
    margin: 0px auto;

    @media screen and (max-width: ${`${medias.mobile}px`}) {
        /* padding: 5px 10px; */
    }
    form {
        display: flex;
        justify-content: space-between;
        height: fit-content;
        width: 100%;
        @media screen and (max-width: ${`${medias.mobile}px`}) {
            flex-direction: column;
            row-gap: 10px;
        }
        hr {
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
        .input-container {
            display: flex;
            flex: 1;
            .search-input {
                background-color: transparent;
                border: 0px;
                font-size: 1.2rem;
                padding: 0px 10px;
                border-radius: 5px;
                width: calc(50% - 1px);
                color: ${colors.black};
                font-weight: 600;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    appearance: none;
                }
                &[type="number"] {
                    -moz-appearance: textfield;
                    appearance: textfield;
                }
                @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
                    font-size: 1.1rem;
                }
                @media screen and (max-width: ${`${medias.mobile}px`}) {
                    font-size: 1.1rem;
                    padding: 10px;
                }
                &:focus {
                    outline: 2px solid #08080852;
                }
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
            margin: 5px 5px 5px 0px;
            border-radius: 5px;
            box-shadow: 0px 2px 4px #0808083d;
            transition: box-shadow 300ms, filter 300ms;
            @media screen and (min-width: ${`${medias.mobile + 1}px`}) and (max-width: ${`${medias.tablet}px`}) {
                width: 40px;
                min-width: 40px;
            }
            @media screen and (max-width: ${`${medias.mobile}px`}) {
                width: 95%;
                align-self: center;
                aspect-ratio: auto;
                padding: 5px;
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
    } = useForm({ resolver: zodResolver(searchSchema) });
    const onSubmit = (data: FieldValues) => {};

    return (
        <SearchBarContainer initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <input className="search-input" maxLength={5} placeholder="Search Terrier, Corgi, etc." {...register("breed")} />
                    <hr />
                    <input
                        type="number"
                        maxLength={5}
                        className="search-input"
                        placeholder="ZIP Code"
                        {...register("zipcode", { valueAsNumber: true })}
                    />
                </div>
                <button type="submit" className="search-button">
                    <Search />
                </button>
            </form>
        </SearchBarContainer>
    );
};

export default SearchBar;
