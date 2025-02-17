"use client";
import { useState } from "react";

export default function FromNetSalary() {
    const [valueAddedTax, setValueAddedTax] = useState(23);
    const [irsTax, setIRSTax] = useState(25);
    const [socialSecurityTax, setSocialSecurityTax] = useState(20);
    const [salaryBase, setSalaryBase] = useState(1000);

    const [resume, setResume] = useState({
        grossSalary: 0,
        netSalary: 0,
        ss: 0,
        iva: 0,
        irs: 0,
        receive: 0,
    });

    function getIRS(value: number) {
        return Number(((value * irsTax) / 100).toFixed(2));
    }

    const calculate = () => {
        let irs = 0;
        let _netSalary = 0;
        let _grossSalary = 0;

        do {
            if (_grossSalary === 0)
                _grossSalary = salaryBase + socialSecurityTax;
            else _grossSalary++;

            irs = getIRS(_grossSalary);
            _netSalary = Number(
                (_grossSalary - irs - socialSecurityTax).toFixed(2)
            );
        } while (_netSalary < salaryBase);

        _grossSalary = Number(_grossSalary.toFixed(2));

        const iva = Number(((_grossSalary * valueAddedTax) / 100).toFixed(2));
        const receive = Number((_grossSalary - irs + iva).toFixed(2));
        setResume({
            grossSalary: _grossSalary,
            netSalary: _netSalary,
            ss: socialSecurityTax,
            iva,
            irs,
            receive,
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">
                Calculadora de Salário - Liquido
            </h2>
            <div className="space-y-4">
                <label className="block">
                    IVA (%): {valueAddedTax}%
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={valueAddedTax}
                        onChange={(e) =>
                            setValueAddedTax(Number(e.target.value))
                        }
                    />
                </label>
                <label className="block">
                    IRS (%): {irsTax}%
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={irsTax}
                        onChange={(e) => setIRSTax(Number(e.target.value))}
                    />
                </label>
                <label className="block">
                    Segurança Social (€): {socialSecurityTax}€
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={socialSecurityTax}
                        onChange={(e) =>
                            setSocialSecurityTax(Number(e.target.value))
                        }
                    />
                </label>
                <label className="block">
                    Salário Líquido Desejado (€):
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={salaryBase}
                        onChange={(e) => setSalaryBase(Number(e.target.value))}
                    />
                </label>
                <button
                    onClick={calculate}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Calcular
                </button>
            </div>
            {resume.grossSalary > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <p>
                        <strong>Valor ilíquido:</strong> €
                        {resume.grossSalary}
                    </p>
                    <p>
                        <strong>Salário Líquido:</strong> €{resume.netSalary}
                    </p>
                    <p>
                        <strong>Valor do IVA:</strong> €{resume.iva}
                    </p> <p>
                        <strong>TOTAL DO DOCUMENTO:</strong> €{(resume.grossSalary + resume.iva).toFixed(2)}
                    </p>
                    <p>
                        <strong>Valor do IRS:</strong> €{resume.irs}
                    </p>
                    <p>
                        <strong>Segurança Social:</strong> €{socialSecurityTax}
                    </p>

                    <p>
                        <strong>Salário a receber:</strong> €{resume.receive}
                    </p>
                </div>
            )}
        </div>
    );
}
