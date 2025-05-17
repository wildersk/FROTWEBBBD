useEffect(() => {
  fetch('http://localhost:3000/aeropuertos')
    .then(res => res.json())
    .then(data => setAeropuertos(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const body = {
    codigo: formData.codigo,
    nombre: formData.nombre,
    ciudadId: 1 // ciudad por defecto para prueba
  };

  const res = await fetch('http://localhost:3000/aeropuertos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    alert('Aeropuerto registrado');
    setFormData({ codigo: '', nombre: '', ciudad: '', pais: '' });
    // recargar
    const lista = await fetch('http://localhost:3000/aeropuertos').then(r => r.json());
    setAeropuertos(lista);
  } else {
    alert('Error al registrar aeropuerto');
  }
};