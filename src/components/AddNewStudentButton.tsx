"use client";

import { StudentListContext } from "@/contexts/StudentListContext";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ChevronDown, Plus, X } from "lucide-react";
import { Dialog, Select } from "radix-ui";
import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const addNewStudentFormSchema = z.object({
    name: z.string().min(5, "O nome deve ter no mínimo 5 caracteres"),
    city: z.string().min(5, "A cidade deve ter no mínimo 5 caracteres"),
    state: z.string().min(1, "O estado deve ter no mínimo 1 caracterer"),
    address: z.string().min(5, "O endereço deve ter no mínimo 5 caracteres"),
    phone: z.string().min(4, "O telefone deve ser válido").max(18, "O telefone deve ser válido"),
})

type AddNewStudentFormInputsProps = z.infer<typeof addNewStudentFormSchema>;

export function AddNewStudentButton() {
    const {register, formState, handleSubmit, reset, watch, setValue} = useForm({
        resolver: zodResolver(addNewStudentFormSchema),
    });

    const {onLoadStudents} = useContext(StudentListContext);

    async function addNewStudent(data: AddNewStudentFormInputsProps): Promise<void> {
        try {
            await fetch("http://localhost:5000/students/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
        
            await onLoadStudents();
        
            toast.success("Aluno cadastrado com sucesso!")

            reset();
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const phoneInputWatch = watch("phone");

    useEffect(() => {
            if (!phoneInputWatch) return;
            const digitsOnly = phoneInputWatch.replace(/\D/g, "");
            let formatted = phoneInputWatch;

            if (digitsOnly.length === 10) {
                formatted = digitsOnly.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
            } else if (digitsOnly.length === 11) {
                formatted = digitsOnly.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            }

            setValue("phone", formatted);
    }, [phoneInputWatch])
    
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild className="flex items-center gap-[.2rem] rounded bg-foreground px-4 text-sm text-background cursor-pointer hover:bg-primary-foreground outline-none">
                <button>
                    <Plus className="w-4 h-4" />
                    Adicionar
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed flex flex-col gap-6 w-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 shadow-lg shadow-blackA7 focus:outline-none border-1 border-for-border">
                    <Dialog.Title className="font-semibold text-foreground text-2xl">
                        Adicionar novo aluno
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(addNewStudent)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm opacity-80">
                                Nome do aluno:
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                id="name"
                                placeholder="Digite o nome do aluno"
                                className={clsx(
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200 border-1 border-for-border",
                                    formState.errors.name && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="state" className="text-sm opacity-80">
                                Estado:
                            </label>
                            <input
                                type="text"
                                {...register("state")}
                                id="state"
                                placeholder="Digite o nome estado"
                                className={clsx(
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200 border-1 border-for-border",
                                    formState.errors.state && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="city" className="text-sm opacity-80">
                                Cidade:
                            </label>
                            <input
                                type="text"
                                {...register("city")}
                                id="city"
                                placeholder="Digite o nome da cidade"
                                className={clsx(
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200 border-1 border-for-border",
                                    formState.errors.city && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm opacity-80">
                                Endereço:
                            </label>
                            <input
                                type="text"
                                {...register("address")}
                                id="name"
                                placeholder="Digite o endereço do aluno"
                                className={clsx(
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200 border-1 border-for-border",
                                    formState.errors.address && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm opacity-80">
                                Telefone:
                            </label>
                            <input
                                type="text"
                                {...register("phone")}
                                id="phone"
                                placeholder="(00) 0 0000-0000"
                                className={clsx(
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200 border-1 border-for-border",
                                    formState.errors.phone && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="bg-primary py-4 cursor-pointer hover:opacity-90 rounded duration-200 border-1 border-for-border">
                            Cadastrar
                        </button>
                    </form>

                    <Dialog.Close asChild>
                        <button
                            className="absolute right-2.5 top-2.5 cursor-pointer"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}