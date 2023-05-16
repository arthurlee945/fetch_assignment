"use client";
import { useContext, useState, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import qs from "qs";

import { GlobalContext } from "@/utils/GlobalContext";
import { Dog } from "@/utils/dataModelTypes";
import SearchBar from "@/components/modules/SearchBar";
import DogsDisplay from "@/components/modules/DogsDisplay";
import HomeLoading from "@/components/modules/HomeLoading";
import Pagination from "@/components/modules/Pagnation";
import SortToggle from "@/components/modules/SortToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";
const PAGE_SIZE = 24;

export default function Home() {
    const {
        authenticatedUser: { authenticated },
        logout,
    } = useContext(GlobalContext);
    const [{ breeds, sort, currentPage }, setQuery] = useState<{
        breeds: string[] | undefined;
        currentPage: number;
        sort: "asc" | "desc";
    }>({
        breeds: undefined,
        sort: "asc",
        currentPage: 1,
    });
    const [{ dogs, total }, setDogData] = useState<{
        dogs: Dog[];
        total: number;
    }>({
        dogs: [],
        total: 0,
    });
    const { isFetching, isFetched } = useQuery({
        queryKey: [breeds, currentPage, sort],
        queryFn: () => {
            return new Promise<{ dogs: Dog[]; total: number }>(async (resolve, reject) => {
                if (!authenticated)
                    return resolve({
                        dogs: [],
                        total: 0,
                    });
                const breedQs = breeds ? { breeds: breeds } : {};
                const queryParam = qs.stringify({
                    size: PAGE_SIZE,
                    from: currentPage * PAGE_SIZE - PAGE_SIZE + 1,
                    ...breedQs,
                });
                try {
                    const idFetch = await axios.get(`${API_URL}/dogs/search?sort=breed:${sort}&` + queryParam, { withCredentials: true });
                    const dogObj = await axios.post(API_URL + "/dogs", idFetch.data.resultIds, { withCredentials: true });
                    resolve({
                        dogs: dogObj.data,
                        total: idFetch.data.total,
                    });
                } catch (err) {
                    if (err instanceof AxiosError && err.response?.data === "Unauthorized") {
                        logout();
                    }
                    reject(err);
                }
            });
        },
        onSuccess: (data) => {
            setDogData((curr) => ({
                ...curr,
                ...data,
            }));
        },
        onError: (err) => {
            console.log(err);
        },
    });
    const handleSearchSubmit = ({ breeds }: { breeds: string[] }) => {
        if (isFetching) return;
        setQuery((curr) => ({
            ...curr,
            breeds,
            currentPage: 1,
        }));
    };
    const handleResetSubmit = () => {
        setQuery((curr) => ({
            ...curr,
            breeds: undefined,
            currentPage: 1,
        }));
    };
    const handlePageButtonClick = async (page?: number, dir?: "left" | "right") => {
        if ((dir === "left" && currentPage === 1) || (dir === "right" && currentPage === total) || isFetching) return;
        setQuery((curr) => ({
            ...curr,
            currentPage: page || curr.currentPage + (dir === "right" ? 1 : -1),
        }));
        window.scrollTo(0, 0);
    };
    const handleSortCheckbox = (e: MouseEvent) => {
        if (isFetching) return;
        const selected = (e.target as HTMLInputElement).checked;
        setQuery((curr) => ({
            ...curr,
            sort: selected ? "desc" : "asc",
        }));
    };

    const pageCount = Math.ceil(total / PAGE_SIZE);
    if (!authenticated) {
        return (
            <main>
                <HomeLoading />
            </main>
        );
    }
    return (
        <main>
            <SearchBar searchSubmit={handleSearchSubmit} isFetching={isFetching} resetSubmit={handleResetSubmit} />
            <SortToggle onClick={handleSortCheckbox} />
            {dogs && <DogsDisplay dogs={dogs} isFetched={isFetched} isFetching={isFetching} breedsSet={breeds?.join("") || ""} />}
            {pageCount > 1 && <Pagination currentPage={currentPage} total={pageCount} onPageButtonClick={handlePageButtonClick} />}
        </main>
    );
}
