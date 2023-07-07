import AddBtn from "./components/AddBtn";
import BtnCustom from "./components/BtnCustom";
import NavBtn from "./components/NavBtn";

export default function App() {
  return <>
    <NavBtn />
    <AddBtn onClick={() => console.log('test')} />
  </>;
}
