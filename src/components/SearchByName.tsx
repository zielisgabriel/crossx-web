"use client";

import { StudentListContext } from "@/contexts/StudentListContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const searchByNameSchema = z.object({
    searchByName: z.string()
});

type SearchByNameTypes = z.infer<typeof searchByNameSchema>;

export function SearchByName() {
    const {onFindByStudentName} = useContext(StudentListContext);
    
    const {register, handleSubmit, formState, watch, getValues} = useForm({
        resolver: zodResolver(searchByNameSchema),
    });

    let searchInputWatch = watch("searchByName");

    async function onFetchStudentsByName(data: SearchByNameTypes) {
        await onFindByStudentName(data.searchByName);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFindByStudentName(getValues("searchByName"));
        }, 600);

        return () => clearTimeout(timeout);
    }, [searchInputWatch]);

    
    return (
        <form onSubmit={handleSubmit(onFetchStudentsByName)} className="flex justify-center">
            <input type="text"
                {...register("searchByName")}
                name="searchByName"
                className="bg-foreground text-primary px-2 w-72 rounded-l-sm h-10 focus:outline-none focus:w-78 duration-200"
                placeholder="Busque por nome"
                autoComplete="off"
            />
            <button type="submit" disabled={formState.isSubmitting} className="cursor-pointer bg-secondary px-5 rounded-r-sm h-10">
                <Search />
            </button>
        </form>
    );
}