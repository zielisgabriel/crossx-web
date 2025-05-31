import clsx from "clsx";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";

interface DetailsViewButtonProps {
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
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="cursor-pointer hover:opacity-90 bg-primary-foreground p-2 rounded-sm text-sm text-primary h-12 whitespace-nowrap">
                    Visualizar detalhes
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.60)] data-[state=open]:animate-overlayShow" />

                <Dialog.Content className="fixed flex flex-col gap-6 w-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-sm p-6 shadow-lg shadow-blackA7 focus:outline-none">
                    <Dialog.Title className="font-semibold text-foreground text-4xl">
                        Detalhes do aluno
                    </Dialog.Title>

                    <div className="flex flex-col gap-2">
                        <p>
                            Nome: <span className="opacity-80">{props.name}</span>
                        </p>
                        <p>
                            Endereço: <span className="opacity-80">{props.address}</span>
                        </p>
                        <p>
                            Cidade: <span className="opacity-80">{props.city}</span>
                        </p>
                        <p>
                            Estado: <span className="opacity-80">{props.state}</span>
                        </p>
                        <p>
                            Telefone:
                            <span className="opacity-80">
                                {
                                    props.phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, " ($1) $2 $3-$4")
                                }
                            </span>
                        </p>
                        <p className="flex gap-1 items-center">
                            Status:
                            <span className="opacity-80 flex gap-1 items-center">
                                <span className={clsx("block w-2 h-2 rounded-full",
                                    {
                                        "bg-green-500": props.status === "Matriculado",
                                        "bg-red-500": props.status === "Não Matriculado",
                                        "bg-yellow-500": props.status === "Pendente",
                                    }
                                )}></span>
                                {props.status}
                            </span>
                        </p>
                        <p>
                            Data de matricula: <span className="opacity-80">{props.registrationDate ? props.registrationDate.toLocaleDateString().toString() : "-"}</span>
                        </p>
                        <p>
                            Data de desligamento: <span className="opacity-80">{props.terminationDate ? props.terminationDate.toLocaleDateString().toString() : "-"}</span>
                        </p>
                        <p>
                            Data de vencimento: <span className="opacity-80">{props.dueDate ? props.dueDate.toLocaleDateString().toString() : "-"}</span>
                        </p>
                    </div>

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