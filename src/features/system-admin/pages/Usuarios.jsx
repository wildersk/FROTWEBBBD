useEffect(() => {
  fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(data => setUsuarios(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: formData.nombre, correo: formData.correo })
  });

  if (res.ok) {
    alert('Usuario registrado');
    setFormData({ nombre: '', correo: '', rol: 'ADMIN', activo: true });
    const lista = await fetch('http://localhost:3000/usuarios').then(r => r.json());
    setUsuarios(lista);
  } else {
    alert('Error al registrar usuario');
  }
};