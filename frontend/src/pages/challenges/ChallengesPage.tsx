import AddBtn from "../../components/AddBtn";
import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";

const ChallengesPage = () => {
  const navigate = useNavigate()

  return <div>
    <h3 className="flex items-center gap-4 mb-4">
      EN COURS :
      <BtnCustom
        addMode
        text="Challenge"
        styled="btnAttention"
        onClick={() => navigate("/challenges/creation")}
      />    </h3>
  </div>;
}

export default ChallengesPage;
