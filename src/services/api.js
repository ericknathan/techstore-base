export const API_URL = import.meta.env.VITE_API_URL

function normalizarResposta(dados) {
  if (Array.isArray(dados)) {
    return dados
  }

  if (dados && Array.isArray(dados.value)) {
    return dados.value
  }

  return dados ?? []
}

export function get(caminho) {
  return fetch(API_URL + caminho).then((resposta) => {
    if (!resposta.ok) {
      throw new Error('Erro ao buscar ' + caminho + ': ' + resposta.status)
    }
    return resposta.json().then((dados) => normalizarResposta(dados))
  })
}
