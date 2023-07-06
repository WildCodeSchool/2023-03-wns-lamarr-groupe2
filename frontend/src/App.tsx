import BtnExample from "./components/BtnExample";
import BtnBasic from "./components/BtnBasic";

export default function App() {
  return (
    <>
      <h1 className="text-primary-good  font-titles">Echoes of Future</h1>
      <BtnExample
        text={"Salut"}
        onClick={() => console.log("salut")}
        styled={"btnGood"}
      />
      <BtnBasic
        text={"Je suis basique"}
        onClick={() => console.log("basic")}
        styled={"btnAttention"}
      />
      <p className="underline">hey</p>
    </>
  );
}
