"use client"

import { createContext, ReactNode, use, useEffect, useState } from "react";

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

interface StudentListContextProps {
    students: Student[];
    onDeleteStudent: (student_id: number) => Promise<void>;
    onFindByStudentName: (name: string) => Promise<void>;
    onLoadStudents: () => Promise<void>;
}

export const StudentListContext = createContext({} as StudentListContextProps);

export function StudentListProvider({children}: {children: ReactNode}) {
    const [students, setStudents] = useState<Student[]>([]);

    async function onLoadStudents() {
        const response = await fetch("http://localhost:5000/students/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setStudents(data["students"]);
    }

    async function onDeleteStudent(student_id: number) {
        await fetch(`http://localhost:5000/students/delete/${student_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        setStudents(value => value.filter(student => student.student_id !== student_id));
    }

    async function onFindByStudentName(name: string) {
        const response = await fetch(`http://localhost:5000/students/find?name=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setStudents(data["students"]);
    }

    useEffect(() => {
        onLoadStudents();
    }, []);

    return (
        <StudentListContext.Provider value={{students, onDeleteStudent, onFindByStudentName, onLoadStudents}}>
            {children}
        </StudentListContext.Provider>
    )
}