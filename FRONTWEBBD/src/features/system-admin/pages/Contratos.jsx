import { useState } from 'react';

export default function Contratos() {
    const [contratos, setContratos] = useState([]);
    const [formData, setFormData] = useState({
        aerolinea: '',
        fechaInicio: '',
        fechaFin: '',
        condiciones: '',
        tipoOperacion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(formData.fechaInicio) > new Date(formData.fechaFin)) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }
        setContratos([...contratos, formData]);
        setFormData({
            aerolinea: '',
            fechaInicio: '',
            fechaFin: '',
            condiciones: '',
            tipoOperacion: '',
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Gestión de Contratos</h1>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    name="aerolinea"
                    value={formData.aerolinea}
                    onChange={handleChange}
                    placeholder="Aerolínea"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    name="condiciones"
                    value={formData.condiciones}
                    onChange={handleChange}
                    placeholder="Condiciones del contrato"
                    className="border p-2 w-full"
                    rows={3}
                />
                <input
                    name="tipoOperacion"
                    value={formData.tipoOperacion}
                    onChange={handleChange}
                    placeholder="Tipo de operación"
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                    Registrar Contrato
                </button>
            </form>

            <h2 className="text-lg font-semibold">Contratos Registrados</h2>
            <ul className="mt-2 list-disc pl-5">
                {contratos.map((c, index) => (
                    <li key={index}>
                        {c.aerolinea} ({c.fechaInicio} → {c.fechaFin}) – {c.tipoOperacion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
