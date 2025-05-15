import { useState } from 'react';

export default function Aeropuertos() {
    const [aeropuertos, setAeropuertos] = useState([]);
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        ciudad: '',
        pais: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isDuplicate = aeropuertos.some(aeropuerto => aeropuerto.codigo === formData.codigo);
        if (isDuplicate) {
            alert('El código OACI ya está registrado.');
            return;
        }
        setAeropuertos([...aeropuertos, formData]);
        setFormData({ codigo: '', nombre: '', ciudad: '', pais: '' });
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Gestión de Aeropuertos</h1>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input name="codigo" value={formData.codigo} onChange={handleChange} placeholder="Código OACI" className="border p-2 w-full" required />
                <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" required />
                <input name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ciudad" className="border p-2 w-full" required />
                <input name="pais" value={formData.pais} onChange={handleChange} placeholder="País" className="border p-2 w-full" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Registrar</button>
            </form>

            <h2 className="text-lg font-semibold">Aeropuertos Registrados</h2>
            <ul className="mt-2 list-disc pl-5">
                {aeropuertos.map((aeropuerto, index) => (
                    <li key={index}>{aeropuerto.codigo} - {aeropuerto.nombre} ({aeropuerto.ciudad}, {aeropuerto.pais})</li>
                ))}
            </ul>
        </div>
    );
}
