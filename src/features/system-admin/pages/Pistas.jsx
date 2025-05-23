useEffect(() => {
  fetch('http://localhost:3000/pistas')
    .then(res => res.json())
    .then(data => setPistas(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = {
    nombre: formData.identificador,
    longitud: 3500,
    ancho: 60,
    aeropuertoId: 1 // de prueba
  };

  const res = await fetch('http://localhost:3000/pistas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    alert('Pista registrada');
    setFormData({ identificador: '', disponible: true });
    const lista = await fetch('http://localhost:3000/pistas').then(r => r.json());
    setPistas(lista);
  } else {
    alert('Error al registrar pista');
  }
};