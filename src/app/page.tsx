import { AddNewStudentButton } from "@/components/AddNewStudentButton";
import { SearchByName } from "@/components/SearchByName";
import { StudentList } from "@/components/StudentList";
import { StudentListProvider } from "@/contexts/StudentListContext";
import { Metadata } from "next";
import { Prompt } from "next/font/google";

export const metadata: Metadata = {
  title: "CrossX | Lista de alunos",
}

const prompt = Prompt({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <StudentListProvider>
      <div className="flex items-center gap-6 flex-col py-4">
        <h1 className={`${prompt.className} text-6xl font-extrabold italic`}>
          CrossX
        </h1>

        <h3 className="text-xl opacity-80">
          Lista de alunos
        </h3>
        
        <div className="flex flex-col gap-2 w-xl">
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
