"use client"

import { StudentListContext } from "@/contexts/StudentListContext";
import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import { Dialog, Select } from "radix-ui";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PaymentButton } from "./PaymentButton";
import { StudentPaymentHistoryButton } from "./StudentPaymentHistoryButton";

interface DetailsViewButtonProps {
    student_id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    phone: string,
    status: string,
    registrationDate: Date | null,
    terminationDate: Date | null,
    dueDate: Date | null,
}

export function DetailsViewButton(props: DetailsViewButtonProps) {
    const {register, handleSubmit, formState, control, setValue, watch} = useForm();
    const {onUpdateStudent} = useContext(StudentListContext);
    
    async function onSubmit(data: any) {
        await onUpdateStudent(props.student_id, data);
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
            <Dialog.Trigger asChild>
                <button className="cursor-pointer hover:opacity-90 bg-primary-foreground p-2 rounded-sm text-sm text-primary h-12 whitespace-nowrap">
                    Visualizar detalhes
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed flex flex-col gap-2 w-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 shadow-lg shadow-blackA7 focus:outline-none border-1 border-for-border">
                    <Dialog.Title className="font-semibold text-foreground text-2xl mb-2">
                        Detalhes do aluno
                    </Dialog.Title>


                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
                                defaultValue={props.name}
                                autoComplete="off"
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm opacity-80">
                                    Status:
                                </span>
                                
                                <Controller
                                    name="status"
                                    control={control}
                                    defaultValue={props.status}
                                    render={({field}) => {
                                        return (
                                            <Select.Root value={field.value} onValueChange={field.onChange}>
                                                <Select.Trigger className={clsx(
                                                    "flex justify-between p-2 outline-none items-center gap-1 w-40 bg-primary px-2 rounded cursor-pointer text-sm border-1 border-for-border",
                                                    formState.errors.status && "border border-red-500"
                                                )}>
                                                    <Select.Value placeholder="Selecione o status" />

                                                    <Select.Icon>
                                                        <ChevronDown className="w-6 h-6" />
                                                    </Select.Icon>
                                                </Select.Trigger>
                                                
                                                <Select.Content className="overflow-hidden z-10 rounded mt-1 bg-primary w-40 border-1 border-for-border" position="popper">
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
                            <div className="flex flex-col gap-1 w-full">
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
                                    defaultValue={props.state}
                                    autoComplete="off"
                                />
                            </div>
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
                                value={props.city}
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
                                defaultValue={props.address}
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
                                defaultValue={props.phone}
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-2 p-2 bg-primary rounded border-1 border-for-border">
                            <p className="flex gap-1 text-sm opacity-60 font-medium tracking-wide">
                                Data de matrícula:
                                <span>{props.registrationDate ? new Date(props.registrationDate).toLocaleDateString() : "-"}</span>
                            </p>
                            <p className="flex gap-1 text-sm opacity-60 font-medium tracking-wide">
                                Data de desligamento:
                                <span>{props.terminationDate ? new Date(props.terminationDate).toLocaleDateString() : "-"}</span>
                            </p>
                            <p className="flex gap-1 text-sm opacity-60 font-medium tracking-wide">
                                Data de vencimento:
                                <span>{props.dueDate ? new Date(props.dueDate).toLocaleDateString() : "-"}</span>
                            </p>
                        </div>

                        <button type="submit" className="bg-primary py-3 cursor-pointer hover:opacity-90 rounded duration-200 border-1 border-for-border">
                            Atualizar
                        </button>
                    </form>

                    <PaymentButton student_id={props.student_id} />

                    <StudentPaymentHistoryButton student_id={props.student_id} />

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