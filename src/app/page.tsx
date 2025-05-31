import { AddNewStudentButton } from "@/components/AddNewStudentButton";
import { SearchByName } from "@/components/SearchByName";
import { StudentList } from "@/components/StudentList";
import { StudentListProvider } from "@/contexts/StudentListContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CrossX | Lista de alunos",
}

export default function Home() {
  return (
    <StudentListProvider>
      <div className="flex items-center gap-6 flex-col py-4">
        <h1 className="text-5xl font-black">
          CrossX
        </h1>

        <h3 className="text-xl opacity-80">
          Lista de alunos
        </h3>
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <AddNewStudentButton />
            <SearchByName />
          </div>
          <StudentList />
        </div>
      </div>
    </StudentListProvider>
  );
}
