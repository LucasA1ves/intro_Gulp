// src/js/script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('O documento foi carregado!')

  const button = document.querySelector('.button')
  button.addEventListener('click', () => {
    alert('Botão clicado!')
  })
})
