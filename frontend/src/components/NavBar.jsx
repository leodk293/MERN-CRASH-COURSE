import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, Plus, Sun } from "lucide-react";

export default function NavBar() {
  return (
    <nav className=" self-center flex flex-wrap border border-transparent border-b-slate-400 shadow bg-[#000000] py-5 justify-center gap-5 md:justify-evenly md:gap-0">
      <Link to={"/"}>
        <div className=" flex flex-row gap-2">
          <h1 className=" text-4xl uppercase self-center text-sky-950 font-extrabold">
            Product Store
          </h1>
          <ShoppingCart
            className="self-center"
            size={45}
            color="#082f49"
            strokeWidth={3}
          />
        </div>
      </Link>

      <div className=" self-center flex flex-wrap gap-4">
        <Link className=" self-center" to={"/create"}>
          <Button className="text-xl font-bold">
            <Plus size={50} color="#ffffff" strokeWidth={1.75} />
          </Button>
        </Link>
        <Button className="text-xl self-center font-bold">
          <Sun size={28} color="#ffffff" strokeWidth={1.75} />
        </Button>
      </div>
    </nav>
  );
}
