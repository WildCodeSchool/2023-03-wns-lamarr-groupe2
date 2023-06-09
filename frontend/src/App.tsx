import BtnExample from "./components/BtnExample";

export default function App() {
  return (
    <>
      <h1 className="text-primary-good  font-titles">Echoes of Future</h1>
      <BtnExample
        text={"Salut"}
        onClick={() => console.log("salut")}
        styled={"btnGood"}
      />
    </>
  );
}
