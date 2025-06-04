"use client";

import { Trash } from "lucide-react";
import { DetailsViewButton } from "./DetailsViewButton";
import { useContext } from "react";
import { StudentListContext } from "@/contexts/StudentListContext";
import clsx from "clsx";

export function StudentList() {
    const {students, onDeleteStudent} = useContext(StudentListContext);

    

    if (students && students.length === 0) {
        return (
            <p className="text-center opacity-55 text-md mt-12">
                Nenhum aluno cadastrado
            </p>
        );
    }

    return (
        <ul className="flex flex-col gap-2">
            {
                students.map((student) => {
                    return (
                        <li key={student.student_id} className="flex justify-center items-center bg-secondary p-4 h-24 rounded-sm w-full border-1 border-for-border">
                            <div className="grid grid-cols-[_1fr_1.8fr_1fr] gap-2 justify-between items-center w-full">
                                <p className="flex gap-2 items-center">
                                    <span className={clsx("block w-2 h-2 rounded-full",
                                        {
                                            "bg-green-500": student.status === "Matriculado",
                                            "bg-red-500": student.status === "Não Matriculado",
                                            "bg-yellow-500": student.status === "Pendente",
                                        }
                                    )}></span>
                                    {student.status}
                                </p>
                                <p className="max-w-48 truncate">
                                    {student.name}
                                </p>

                                <div className="flex gap-2">
                                    <DetailsViewButton
                                        student_id={student.student_id}
                                        name={student.name}
                                        address={student.address}
                                        city={student.city}
                                        state={student.state}
                                        status={student.status}
                                        phone={student.phone}
                                        registrationDate={student.registration_date ? new Date(student.registration_date) : null}
                                        terminationDate={student.termination_date ? new Date(student.termination_date) : null}
                                        dueDate={student.due_date ? new Date(student.due_date) : null}
                                    />

                                    <button
                                        onClick={() => onDeleteStudent(student.student_id)}
                                        className="flex justify-center items-center cursor-pointer bg-red-800 hover:opacity-90 p-2 rounded-sm text-sm text-white h-12 w-12 ml-auto"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
}