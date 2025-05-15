import { useState } from 'react';

export default function Aerolineas() {
    const [aerolineas, setAerolineas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        codigo: '',
        modelosDisponibles: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAerolineas([...aerolineas, formData]);
        setFormData({ nombre: '', codigo: '', modelosDisponibles: '' });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Gestión de Aerolíneas</h1>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre de la Aerolínea"
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Código de la Aerolínea"
                    className="border p-2 w-full"
                    required
                />
                <input
                    name="modelosDisponibles"
                    value={formData.modelosDisponibles}
                    onChange={handleChange}
                    placeholder="Modelos de Avión Disponibles (separados por coma)"
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                    Registrar Aerolínea
                </button>
            </form>

            <h2 className="text-lg font-semibold">Aerolíneas Registradas</h2>
            <ul className="mt-2 list-disc pl-5">
                {aerolineas.map((a, index) => (
                    <li key={index}>
                        {a.nombre} ({a.codigo}) – Modelos: {a.modelosDisponibles}
                    </li>
                ))}
            </ul>
        </div>
    );
}
