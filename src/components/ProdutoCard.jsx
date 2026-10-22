import { Link } from 'react-router'
import BotaoAviseQuandoChegar from './BotaoAviseQuandoChegar'
import { formatarPreco } from '../utils/formatarPreco'
import { VALOR_MINIMO_FRETE_GRATIS } from '../utils/configuracoes'

export default function ProdutoCard({ produto, onAdicionar, onRegistrarAviso }) {
  const esgotado = Number(produto.estoque) === 0
  const semPreco = produto.price === null
  const freteGratis = Number(produto.price) >= VALOR_MINIMO_FRETE_GRATIS

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <p className="card-avaliacao">
        ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
      </p>

      <div className="card-precos">
        {produto.precoOriginal && (
          <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
        )}
        <span className="preco">
          {semPreco ? 'Preço em breve' : formatarPreco(produto.price)}
        </span>
      </div>

      <div className="card-selos">
        {!semPreco && freteGratis && <span className="selo selo-frete">Frete grátis</span>}
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      {esgotado ? (
        <BotaoAviseQuandoChegar
          produto={produto}
          onRegistrarAviso={onRegistrarAviso}
          compacto
        />
      ) : (
        <button
          className="botao"
          onClick={() => onAdicionar(produto)}
          disabled={semPreco}
        >
          {semPreco ? 'Aguardando preço' : 'Adicionar ao carrinho'}
        </button>
      )}
    </article>
  )
}
