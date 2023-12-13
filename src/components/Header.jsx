import LogoRsab from "../assets/logo-rsab.png";
import LogoKemenkes from "../assets/logo-kemenkes.png";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex justify-between">
        <div className="w-96 flex relative top-4 left-4">
          <div className="border-shape w-[16rem] h-[8rem] bg-white opacity-75"></div>
          <img
            src={LogoKemenkes}
            alt="logo rsab"
            className="h-24 absolute left-3 top-3 image"
          />
        </div>
        <div className="w-96 flex relative top-4 left-4">
          <div className="border-shape-2 w-[20rem] h-[8rem] bg-white opacity-75"></div>
          <img
            src={LogoRsab}
            alt="logo rsab"
            className="h-24 absolute left-3 top-3 image"
          />
        </div>
      </div>
    </div>
  );
}
