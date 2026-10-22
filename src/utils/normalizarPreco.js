export function normalizarPreco(valor) {
  const texto = String(valor)
    .trim()
    .replace('R$', '')
    .replaceAll(' ', '')

  if (!texto) {
    return null
  }

  let textoNormalizado = texto

  if (texto.includes(',') && texto.includes('.')) {
    textoNormalizado = texto.indexOf(',') < texto.indexOf('.')
      ? texto.replaceAll(',', '')
      : texto.replaceAll('.', '').replace(',', '.')
  } else if (texto.includes(',')) {
    textoNormalizado = texto.split(',').length > 2
      ? texto.replaceAll(',', '')
      : texto.replace(',', '.')
  }

  const numero = Number(textoNormalizado)
  return Number.isNaN(numero) ? null : numero
}
