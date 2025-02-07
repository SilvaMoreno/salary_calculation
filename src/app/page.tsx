"use client";
import { useState } from "react";

export default function Home() {
    const [iva, setIVA] = useState(23);
    const [irs, setIRS] = useState(25);
    const [ss, setSS] = useState(20);
    const [sal, setSAL] = useState(0);
    const [grossSalary, setGrossSalary] = useState(0);
    const [netSalary, setNetSalary] = useState(0);

    function getIRS(value) {
        return Number(((value * irs) / 100).toFixed(2));
    }

    const calculate = () => {
        let IRSGlobal = 0;
        let netSalaryGlobal = 0;
        let grossSalaryGlobal = 0;

        do {
            if (grossSalaryGlobal === 0) grossSalaryGlobal = sal + ss;
            else grossSalaryGlobal++;

            IRSGlobal = getIRS(grossSalaryGlobal);
            netSalaryGlobal = Number((grossSalaryGlobal - IRSGlobal - ss).toFixed(2));
        } while (netSalaryGlobal < sal);

        setGrossSalary(grossSalaryGlobal);
        setNetSalary(netSalaryGlobal);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">Calculadora de Salário</h2>
            <div className="space-y-4">
                <label className="block">
                    IVA (%): {iva}%
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={iva}
                        onChange={(e) => setIVA(Number(e.target.value))}
                    />
                </label>
                <label className="block">
                    IRS (%): {irs}%
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={irs}
                        onChange={(e) => setIRS(Number(e.target.value))}
                    />
                </label>
                <label className="block">
                    Segurança Social (€): {ss}€
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={ss}
                        onChange={(e) => setSS(Number(e.target.value))}
                    />
                </label>
                <label className="block">
                    Salário Líquido Desejado (€):
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={sal}
                        onChange={(e) => setSAL(Number(e.target.value))}
                    />
                </label>
                <button
                    onClick={calculate}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Calcular
                </button>
            </div>
            {grossSalary > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <p><strong>Salário Bruto Estimado:</strong> €{grossSalary}</p>
                    <p><strong>Salário Líquido:</strong> €{netSalary}</p>
                    <p><strong>Valor do IVA:</strong> €{((grossSalary * iva) / 100).toFixed(2)}</p>
                    <p><strong>Valor do IRS:</strong> €{((grossSalary * irs) / 100).toFixed(2)}</p>
                    <p><strong>Segurança Social:</strong> €{ss}</p>
                </div>
            )}
        </div>
    );
}
