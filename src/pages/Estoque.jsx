import { formatarPreco } from '../utils/formatarPreco'

const CATEGORIAS = {
  roupas: 'Roupas',
  eletronicos: 'Eletrônicos',
  acessorios: 'Acessórios',
  casa: 'Casa',
}

function obterCusto(produto) {
  const custo = produto.custo ?? produto.cost ?? produto.precoCusto
  const numero = Number(custo)
  return Number.isFinite(numero) && numero >= 0 ? numero : null
}

export default function Estoque({ produtos, avisosDisponibilidade }) {
  const categorias = Object.keys(CATEGORIAS).map((categoria) => {
    const produtosDaCategoria = produtos.filter((produto) => produto.category === categoria)
    const valorEstoque = produtosDaCategoria.reduce(
      (total, produto) => total + (produto.price || 0) * produto.estoque,
      0
    )
    const produtosComCusto = produtosDaCategoria.filter(
      (produto) => produto.price !== null && obterCusto(produto) !== null
    )
    const lucro = produtosComCusto.reduce(
      (total, produto) =>
        total + (produto.price - obterCusto(produto)) * produto.estoque,
      0
    )

    return { categoria, valorEstoque, lucro, temCusto: produtosComCusto.length > 0 }
  })

  const produtosSemPreco = produtos.filter((produto) => produto.price === null)
  const produtosEsgotados = produtos.filter((produto) => produto.estoque === 0)
  const avisosPorProduto = produtosEsgotados
    .map((produto) => ({
      ...produto,
      avisos: avisosDisponibilidade.filter((aviso) => aviso.produtoId === produto.id),
    }))
    .filter((produto) => produto.avisos.length > 0)
  const totalAvisos = avisosDisponibilidade.length
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Painel da loja</h1>
      <p className="aviso">Acompanhe o valor do estoque, oportunidades e demandas dos clientes.</p>

      <div className="painel-indicadores">
        <article className="indicador">
          <span className="indicador-legenda">Aguardando preço</span>
          <strong>{produtosSemPreco.length}</strong>
          <small>produtos sem preço definido</small>
        </article>
        <article className="indicador">
          <span className="indicador-legenda">Clientes esperando</span>
          <strong>{totalAvisos}</strong>
          <small>pedidos de aviso cadastrados</small>
        </article>
        <article className="indicador">
          <span className="indicador-legenda">Estoque parado</span>
          <strong>{produtosEsgotados.length}</strong>
          <small>produtos esgotados</small>
        </article>
      </div>

      <h2>Valor em estoque e lucro por categoria</h2>
      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Valor em estoque</th>
              <th>Lucro (com custo informado)</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((item) => (
              <tr key={item.categoria}>
                <td>{CATEGORIAS[item.categoria]}</td>
                <td>{formatarPreco(item.valorEstoque)}</td>
                <td>{item.temCusto ? formatarPreco(item.lucro) : 'Indisponível'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Clientes esperando reposição</h2>
      {avisosPorProduto.length > 0 ? (
        <div className="tabela-moldura">
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Nome e e-mail</th>
              </tr>
            </thead>
            <tbody>
              {avisosPorProduto.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.title}</td>
                  <td>{CATEGORIAS[produto.category] || produto.category}</td>
                  <td>
                    <ul className="lista-avisos">
                      {produto.avisos.map((aviso, indice) => (
                        <li key={`${aviso.email}-${indice}`}>
                          {aviso.nome} · {aviso.email}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="estado-vazio">
          <p>Nenhum cliente está aguardando produtos esgotados.</p>
        </div>
      )}

      <h2>Estoque por produto</h2>
      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{CATEGORIAS[produto.category] || produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.price === null && (
                    <span className="selo selo-alerta">Aguardando preço</span>
                  )}
                  {produto.price !== null && produto.estoque === 0 && (
                    <span className="selo selo-esgotado">Esgotado</span>
                  )}
                  {produto.price !== null && produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.price !== null && produto.estoque >= 5 && (
                    <span className="selo selo-ok">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
