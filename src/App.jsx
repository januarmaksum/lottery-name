import bgImage from "./assets/bg.png";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="mx-auto h-screen bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-center font-Jomhuria"
    >
      <div className="flex gap-8 -mt-36">
        <div
          onClick={() => navigate("/ab")}
          className="card text-[#6B6BAF] bg-yellow-400 hover:bg-[#6B6BAF] hover:text-gray-800 cursor-pointer hover:scale-110 transition-all"
        >
          <div className="bg flex justify-center items-center">
            <h2 className="text-[12rem] leading-none relative mt-6">AB</h2>
          </div>
          <div className="blob"></div>
        </div>
        <div
          onClick={() => navigate("/c")}
          className="card text-[#6B6BAF] bg-yellow-400 hover:bg-[#6B6BAF] hover:text-gray-800 cursor-pointer hover:scale-110 transition-all"
        >
          <div className="bg flex justify-center items-center">
            <h2 className="text-[12rem] leading-none relative mt-6">C</h2>
          </div>
          <div className="blob"></div>
        </div>
        <div
          onClick={() => navigate("/d")}
          className="card text-[#6B6BAF] bg-yellow-400 hover:bg-[#6B6BAF] hover:text-gray-800 cursor-pointer hover:scale-110 transition-all"
        >
          <div className="bg flex justify-center items-center">
            <h2 className="text-[12rem] leading-none relative mt-6">D</h2>
          </div>
          <div className="blob"></div>
        </div>
      </div>
    </div>
  );
}
