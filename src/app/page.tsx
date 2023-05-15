"use client";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";

import SearchBar from "@/components/modules/SearchBar";
import DogsDisplay from "@/components/modules/DogsDisplay";
import { GlobalContext } from "@/utils/GlobalContext";
import { Dog } from "@/utils/dataModelTypes";
import HomeLoading from "@/components/modules/HomeLoading";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-take-home-service.fetch.com";
const PAGE_SIZE = 24;
export default function Home() {
    const {
        authenticatedUser: { authenticated },
    } = useContext(GlobalContext);
    const [{ breed, zipcode, sort }, setQuery] = useState<{
        breed: string | undefined;
        zipcode: string | undefined;
        sort: "asc" | "desc";
    }>({
        breed: undefined,
        zipcode: undefined,
        sort: "asc",
    });
    const [{ dogs, next, prev, total, currentPage }, setDogData] = useState<{
        dogs: Dog[];
        total: number;
        currentPage: number;
        next: string;
        prev: string;
    }>({
        dogs: [],
        total: 0,
        currentPage: 1,
        next: "",
        prev: "",
    });
    const { refetch } = useQuery({
        queryKey: ["initial dog data"],
        queryFn: async () => {
            if (!authenticated) {
                data: null;
            }
            return new Promise<{ dogs: Dog[]; total: number; next?: string; prev?: string }>(async (resolve, reject) => {
                const breedQs = breed ? { breeds: breed } : {};
                const zipcodeQs = zipcode ? { zipCodes: zipcode } : {};
                const queryParam = qs.stringify({
                    size: PAGE_SIZE,
                    from: currentPage * PAGE_SIZE - PAGE_SIZE + 1,
                    ...breedQs,
                    ...zipcodeQs,
                });
                console.log(queryParam);
                try {
                    const idFetch = await axios.get(`${API_URL}/dogs/search?` + queryParam, { withCredentials: true });
                    const dogObj = await axios.post(API_URL + "/dogs", idFetch.data.resultIds, { withCredentials: true });
                    resolve({
                        dogs: dogObj.data,
                        total: idFetch.data.total,
                        next: idFetch.data.next || "",
                        prev: idFetch.data.prev || "",
                    });
                } catch (err) {
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
    const handleSearchSubmit = ({ breed, zipcode = "60601" }: { breed: string; zipcode?: string }) => {};
    return (
        <main>
            {authenticated ? (
                <>
                    <SearchBar searchSubmit={handleSearchSubmit} />
                    {dogs && <DogsDisplay dogs={dogs} />}
                </>
            ) : (
                <HomeLoading />
            )}
        </main>
    );
}
