export function normalizarPreco(valor) {
  const texto = String(valor)
    .trim()
    .replace('R$', '')
    .replaceAll(' ', '')

  if (!texto) {
    return null
  }

  const textoNormalizado = texto.includes(',')
    ? texto.replaceAll('.', '').replace(',', '.')
    : texto.replaceAll(',', '')

  const numero = Number(textoNormalizado)
  return Number.isNaN(numero) ? null : numero
}
