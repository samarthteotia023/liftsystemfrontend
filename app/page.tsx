import Image from "next/image";
import Lift from "./Components/Lift";
import InputForm from "./Components/Input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputForm/>
    </main>
  );
}