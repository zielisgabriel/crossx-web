"use client"

import { StudentListContext } from "@/contexts/StudentListContext";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { Dialog, Select } from "radix-ui"
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import z from "zod";

const PaymentFormInputsSchema = z.object({
    amount: z.string().regex(/^R\$ ?(?!0\d)\d{1,3}(\.\d{3})*,\d{2}$/, "O valor deve ser valido"),
    payment_method: z.enum(["Dinheiro", "Crédito", "Débito"]),
})

interface PaymentButtonProps {
    student_id: number,
}

type PaymentFormInputsProps = z.infer<typeof PaymentFormInputsSchema>

type OnMakePaymentProps = {
    student_id: number,
    data: {
        amount: number,
        payment_method: string,
    }
}

export function PaymentButton(props: PaymentButtonProps) {
    const {handleSubmit, formState, control, reset} = useForm({
        resolver: zodResolver(PaymentFormInputsSchema),
    });

    const {onLoadStudents} = useContext(StudentListContext);

    async function onMakePayment(props: OnMakePaymentProps) {
        try {
            const response = await fetch(`http://localhost:5000/payments/make/${props.student_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props.data),
            })

            if (response.status !== 201) {
                const data: any = response.json();
                throw new Error(data.message);
            }

            toast.success("Pagamento realizado com sucesso!");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    async function onSubmit(data: PaymentFormInputsProps) {
        const amountFromStringToNumber = data.amount.replace("R$ ", "").replace(",", ".");
        const amount = Number(amountFromStringToNumber);
        const payment_method = data.payment_method;

        await onMakePayment({
            student_id: props.student_id,
            data: {
                amount,
                payment_method,
            },
        });

        await onLoadStudents();
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="py-3 cursor-pointer hover:opacity-90 rounded duration-200 bg-green-600">
                    Pagar
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed flex flex-col gap-8 w-82 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 shadow-lg shadow-blackA7 focus:outline-none border-1 border-for-border">
                    <Dialog.Title className="font-semibold text-foreground text-4xl">Pagar</Dialog.Title>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="amount" className="text-sm opacity-80">
                                Valor:
                            </label>
                            
                            <Controller
                                control={control}
                                name="amount"
                                render={({field}) => {
                                    return (
                                        <NumericFormat
                                            {...field}
                                            id="amount"
                                            prefix="R$ "
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            allowNegative={false}
                                            allowLeadingZeros={false}
                                            valueIsNumericString={true}
                                            value={field.value}
                                            placeholder="R$ 0,00"
                                            className={clsx(
                                                "outline-none bg-primary p-2 rounded text-sm border-1 border-for-border",
                                                formState.errors.amount && "border border-red-500"
                                            )}
                                        />
                                    )
                                }}
                            >

                            </Controller>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm opacity-80">
                                Status:
                            </span>
                            
                            <Controller
                                name="payment_method"
                                control={control}
                                render={({field}) => {
                                    return (
                                        <Select.Root value={field.value} onValueChange={field.onChange}>
                                            <Select.Trigger className={clsx(
                                                "flex justify-between p-2 outline-none items-center gap-1 w-52 bg-primary px-2 rounded cursor-pointer text-sm border-1 border-for-border",
                                                formState.errors.payment_method && "border border-red-500"
                                            )}>
                                                <Select.Value placeholder="Método de pagamento" />

                                                <Select.Icon>
                                                    <ChevronDown className="w-6 h-6" />
                                                </Select.Icon>
                                            </Select.Trigger>
                                            
                                            <Select.Content className="overflow-hidden z-10 rounded mt-1 bg-primary w-52 border-1 border-for-border" position="popper">
                                                <Select.Viewport className="flex flex-col gap-2 p-2">
                                                    <Select.Item value="Dinheiro" className="cursor-pointer outline-none">
                                                        <Select.ItemText>Dinheiro</Select.ItemText>
                                                    </Select.Item>

                                                    <Select.Item value="Crédito" className="cursor-pointer outline-none">
                                                        <Select.ItemText>Crédito</Select.ItemText>
                                                    </Select.Item>

                                                    <Select.Item value="Débito" className="cursor-pointer outline-none">
                                                        <Select.ItemText>Débito</Select.ItemText>
                                                    </Select.Item>
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Root>
                                    );
                                }}
                            />
                        </div>
                        
                        <button className="py-4 w-full cursor-pointer hover:opacity-90 rounded duration-200 bg-green-600 disabled:opacity-80 disabled:cursor-no-drop" disabled={!formState.isValid}>
                            Realizar Pagamento
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}