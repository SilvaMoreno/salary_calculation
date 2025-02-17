import FromGrossSalary from "./Components/FromGrossSalary";
import FromNetSalary from "./Components/FromNetSalary";

export default function Home() {


    return (
        <div className="grid lg:grid-cols-2">
            <FromNetSalary />
            <FromGrossSalary />
        </div>
    );
}
