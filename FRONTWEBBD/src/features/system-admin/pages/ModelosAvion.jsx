useEffect(() => {
  fetch('http://localhost:3000/modelos')
    .then(res => res.json())
    .then(data => setModelos(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = {
    nombreModelo: formData.nombreModelo,
    capacidad: parseInt(formData.capacidad)
  };

  const res = await fetch('http://localhost:3000/modelos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('Modelo registrado');
    setFormData({
      nombreModelo: '', capacidad: '', clasePrimera: '', claseEjecutiva: '', claseTurista: ''
    });
    const lista = await fetch('http://localhost:3000/modelos').then(r => r.json());
    setModelos(lista);
  } else {
    alert('Error al registrar modelo');
  }
};