import BtnExample from "./components/BtnExample";
import BtnBasic from "./components/BtnBasic";
import BtnSmall from "./components/BtnSmall";
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
        text={"basic"}
        onClick={() => console.log("baseec")}
        styled={"btnAttention"}
      />

      <BtnSmall
        text={"yes"}
        onClick={() => console.log("je suis un petit oui")}
        styled={"btnSmallGood"}
      />

      <BtnSmall
        text={"no"}
        onClick={() => console.log("je suis un petit non")}
        styled={"btnSmallDanger"}
      />

      <p className="underline">hey</p>
    </>
  );
}
