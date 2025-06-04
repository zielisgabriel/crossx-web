"use client"

import { StudentListContext } from "@/contexts/StudentListContext";
import { Dialog, ScrollArea } from "radix-ui";
import { useContext, useEffect } from "react";

interface StudentPaymentHistoryButtonProps {
    student_id: number,
}

export function StudentPaymentHistoryButton(props: StudentPaymentHistoryButtonProps) {
    const {payments, onLoadPayments} = useContext(StudentListContext);

    useEffect(() => {
        onLoadPayments(props.student_id);
    }, [props.student_id])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild className="mt-2 hover:underline cursor-pointer opacity-80 text-sm">
                <button>
                    Histórico de pagamentos
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed w-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 focus:outline-none border-1 border-for-border">
                    <Dialog.Title className="font-semibold text-foreground text-2xl mb-2">Histórico de pagamentos</Dialog.Title>

                        <ScrollArea.Root className="h-80">
                            <ScrollArea.Viewport>
                                {
                                    payments.map((payment) => {
                                        return (
                                            <div key={payment.payment_id} className="bg-primary p-2 rounded mt-2 border-1 border-for-border">
                                                <p className="flex gap-1 opacity-80 text-sm">
                                                    Valor:
                                                    <span>
                                                        {
                                                            new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(payment.amount)
                                                        }
                                                    </span>
                                                </p>
                                                <p className="flex gap-1 opacity-80 text-sm">
                                                    Método:
                                                    <span>
                                                        {payment.payment_method}
                                                    </span>
                                                </p>
                                                <p className="flex gap-1 opacity-80 text-sm">
                                                    Data:
                                                    <span>
                                                        {new Date(payment.payment_date).toLocaleDateString("pt-BR")}
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    })
                                }
                            </ScrollArea.Viewport>
                        </ScrollArea.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}