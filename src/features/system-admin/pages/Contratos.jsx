useEffect(() => {
  fetch('http://localhost:3000/contratos')
    .then(res => res.json())
    .then(data => setContratos(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const body = {
    aerolineaId: 1, // ejemplo fijo
    aeropuertoId: 1,
    contratoId: 1,
    fechaInicio: formData.fechaInicio,
    fechaFin: formData.fechaFin
  };

  const res = await fetch('http://localhost:3000/contratos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    alert('Contrato registrado');
    setFormData({ aerolinea: '', fechaInicio: '', fechaFin: '', condiciones: '', tipoOperacion: '' });
    const lista = await fetch('http://localhost:3000/contratos').then(r => r.json());
    setContratos(lista);
  } else {
    alert('Error al registrar contrato');
  }
};
const handleDelete = async (id) => {
  const res = await fetch(`http://localhost:3000/contratos/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert('Contrato eliminado');
    const lista = await fetch('http://localhost:3000/contratos').then(r => r.json());
    setContratos(lista);
  } else {
    alert('Error al eliminar contrato');
  }
};
