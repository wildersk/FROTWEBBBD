useEffect(() => {
  fetch('http://localhost:3000/aerolineas')
    .then(res => res.json())
    .then(data => setAerolineas(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:3000/aerolineas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    alert('Aerolínea registrada');
    setFormData({ nombre: '', codigo: '', modelosDisponibles: '' });
    const lista = await fetch('http://localhost:3000/aerolineas').then(r => r.json());
    setAerolineas(lista);
  } else {
    alert('Error al registrar aerolínea');
  }
};