import { Button } from "@/components/ui/button";
import Ecom from "../../assets/icon/Ecom.svg";
import Successfull from "../../assets/icon/Illustration Success.svg";
import { useNavigate } from "react-router-dom";
const RegisterSuccessfull = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col xs:items-center xs:justify-center bg-white pt-2 px-4">
      <div className="flex justify-center md:justify-start md:pl-8 pt-0 mb-6">
        <div className="flex flex-row items-center gap-2">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] font-bold text-3xl tracking-wide">
            E-COM
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  min-h-screen">
        <img src={Successfull} alt="Successfull" className="w-80 h-80" />
        <p className="text-2xl font-medium text-[var(--primary)] mt-2">
          Register Successful
        </p>
        <p className="text-base  text-[var(--secondary)] mt-2 text-center">
          Start exploring and shopping your favorite products with us!
        </p>
        <Button
          className={"mt-4 w-full lg:w-md"}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccessfull;
