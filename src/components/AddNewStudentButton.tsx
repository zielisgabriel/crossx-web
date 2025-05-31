"use client";

import { StudentListContext } from "@/contexts/StudentListContext";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ChevronDown, Plus, X } from "lucide-react";
import { Dialog, Select } from "radix-ui";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const addNewStudentFormSchema = z.object({
    name: z.string().min(5, "O nome deve ter no mínimo 5 caracteres"),
    city: z.string().min(5, "A cidade deve ter no mínimo 5 caracteres"),
    state: z.string().min(1, "O estado deve ter no mínimo 1 caracterer"),
    address: z.string().min(5, "O endereço deve ter no mínimo 5 caracteres"),
    phone: z.string().min(4, "O telefone deve ser válido").max(18, "O telefone deve ser válido"),
    status: z.string(),
})

type AddNewStudentFormInputsProps = z.infer<typeof addNewStudentFormSchema>;

export function AddNewStudentButton() {
    const {register, formState, handleSubmit, reset, control} = useForm({
        resolver: zodResolver(addNewStudentFormSchema),
    });

    const {onLoadStudents} = useContext(StudentListContext);

    async function addNewStudent(data: AddNewStudentFormInputsProps): Promise<void> {
        await fetch("http://localhost:5000/students/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        await onLoadStudents();

        reset();
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="flex items-center gap-[.2rem] rounded bg-foreground px-4 text-sm text-background cursor-pointer hover:bg-primary-foreground">
                    <Plus className="w-4 h-4" />
                    Adicionar
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed flex flex-col gap-6 w-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 shadow-lg shadow-blackA7 focus:outline-none">
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
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200",
                                    formState.errors.name && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm opacity-80">
                                Status:
                            </span>
                            
                            <Controller
                                {...register("status")}
                                control={control}
                                render={({field}) => {
                                    return (
                                        <Select.Root value={field.value} onValueChange={field.onChange}>
                                            <Select.Trigger className={clsx(
                                                "flex justify-between p-2 outline-none items-center gap-1 w-40 bg-primary px-2 rounded cursor-pointer text-sm",
                                                formState.errors.status && "border border-red-500"
                                            )}>
                                                <Select.Value placeholder="Selecione o status" />

                                                <Select.Icon>
                                                    <ChevronDown className="w-6 h-6" />
                                                </Select.Icon>
                                            </Select.Trigger>
                                            
                                            <Select.Content className="overflow-hidden z-10 rounded mt-1 bg-primary w-40" position="popper">
                                                <Select.Viewport className="flex flex-col gap-2 p-2">
                                                    <Select.Item value="Matriculado" className="cursor-pointer outline-none">
                                                        <Select.ItemText>Matriculado</Select.ItemText>
                                                    </Select.Item>

                                                    <Select.Item value="Não Matriculado" className="cursor-pointer outline-none">
                                                        <Select.ItemText>Não Matriculado</Select.ItemText>
                                                    </Select.Item>
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Root>
                                    );
                                }}
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
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200",
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
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200",
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
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200",
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
                                    "bg-primary p-2 rounded focus:outline-none w-full focus:w-[98%] duration-200",
                                    formState.errors.phone && "border border-red-500"
                                )}
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="bg-primary py-4 cursor-pointer hover:opacity-90 rounded duration-200">
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