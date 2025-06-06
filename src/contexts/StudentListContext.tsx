"use client"

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Student {
    student_id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    status: "Matriculado" | "Não Matriculado" | "Pendente";
    registration_date: Date;
    termination_date: Date;
    due_date: Date;
}

interface Payment {
    payment_id: number;
    student_id: number;
    amount: number;
    payment_method: string;
    payment_date: Date;
}

interface UpdateStudentFormInputsProps {
    name: string;
    status: "Matriculado" | "Não Matriculado" | "Pendente";
    state: string;
    city: string;
    address: string;
    phone: string;
}

interface StudentListContextProps {
    students: Student[];
    payments: Payment[];

    onLoadStudents: () => Promise<void>;
    onLoadPayments: (student_id: number) => Promise<void>;
    onDeleteStudent: (student_id: number) => Promise<void>;
    onFindByStudentName: (name: string) => Promise<void>;
    onUpdateStudent: (student_id: number, data: UpdateStudentFormInputsProps) => Promise<void>;
}

export const StudentListContext = createContext({} as StudentListContextProps);

export function StudentListProvider({children}: {children: ReactNode}) {
    const [students, setStudents] = useState<Student[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);

    const onLoadStudents = useCallback(async() => {
        try {
            const response = await fetch("http://localhost:3103/students/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setStudents(data["students"]);
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [])

    const onLoadPayments = useCallback(async(student_id: number) => {
        try {
            const response = await fetch(`http://localhost:3103/payments/list/${student_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setPayments(data["payments"]);
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [])

    const onDeleteStudent = useCallback(async (student_id: number) => {
        try {
            const response = await fetch(`http://localhost:3103/students/delete/${student_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.status !== 200) {
                const data: any = await response.json();
                throw new Error(data.message);
            }

            toast.success("Aluno deletado com sucesso!");

            setStudents(value => value.filter(student => student.student_id !== student_id));
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [])

    async function onFindByStudentName(name: string) {
        const response = await fetch(`http://localhost:3103/students/find?name=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setStudents(data["students"]);
    }

    const onUpdateStudent = useCallback(async(student_id: number, data: UpdateStudentFormInputsProps) => {
        try {
            const response = await fetch(`http://localhost:3103/students/update/${student_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.status != 200) {
                const data: any = await response.json();
                throw new Error(data.message);
            }

            toast.success("Aluno atualizado com sucesso!");

            onLoadStudents();
        } catch (e: any) {
            toast.error(e.message);
        }
    }, [])

    useEffect(() => {
        onLoadStudents();
    }, []);

    return (
        <StudentListContext.Provider value={{students, onDeleteStudent, onFindByStudentName, onLoadStudents, onUpdateStudent, payments, onLoadPayments}}>
            {children}
        </StudentListContext.Provider>
    )
}