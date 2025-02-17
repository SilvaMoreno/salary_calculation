"use client";
import { useState } from "react";

export default function FromGrossSalary() {
    const [valueAddedTax, setValueAddedTax] = useState(23);
    const [irsTax, setIRSTax] = useState(25);
    const [grossSalary, setGrossSalary] = useState(1000);

    const [resume, setResume] = useState({
        grossSalary: 0,
        netSalary: 0,
        socialSecurity: 0,
        iva: 0,
        irs: 0,
        receive: 0,
    });

    const calculate = () => {
        const irs = Number(((grossSalary * irsTax) / 100).toFixed(2));
        const socialSecurity = Number((grossSalary * 0.7 * 0.21).toFixed(2));

        const netSalary = Number(
            (grossSalary - irs - socialSecurity).toFixed(2)
        );

        const iva = Number(((grossSalary * valueAddedTax) / 100).toFixed(2));
        const receive = Number((grossSalary - irs + iva).toFixed(2));
        setResume({
            grossSalary: grossSalary,
            netSalary: netSalary,
            socialSecurity,
            iva,
            irs,
            receive,
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">
                Calculadora de Salário - Bruto
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
                    Valor ilíquido (€):
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
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
                        <strong>Valor ilíquido:</strong> €{resume.grossSalary}
                    </p>
                    <p>
                        <strong>Salário Líquido:</strong> €{resume.netSalary}
                    </p>
                    <p>
                        <strong>Valor do IVA:</strong> €{resume.iva}
                    </p>{" "}
                    <p>
                        <strong>TOTAL DO DOCUMENTO:</strong> €
                        {(resume.grossSalary + resume.iva).toFixed(2)}
                    </p>
                    <p>
                        <strong>Valor do IRS:</strong> €{resume.irs}
                    </p>
                    <p>
                        <strong>Segurança Social:</strong> €
                        {resume.socialSecurity}
                    </p>
                    <p>
                        <strong>Salário a receber:</strong> €{resume.receive}
                    </p>
                </div>
            )}
        </div>
    );
}
