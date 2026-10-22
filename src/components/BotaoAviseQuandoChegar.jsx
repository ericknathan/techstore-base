import { useEffect, useState } from "react"

export default function BotaoAviseQuandoChegar() {
    const [modalAberto, setModalAberto] = useState(false)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false)

    useEffect(() => {
        if (!modalAberto) return undefined

        function fecharComEscape(evento) {
            if (evento.key === 'Escape') {
                setModalAberto(false)
            }
        }

        document.addEventListener('keydown', fecharComEscape)
        return () => document.removeEventListener('keydown', fecharComEscape)
    }, [modalAberto])

    return (
        <>
            <button
                className="botao botao-grande"
                onClick={() => {
                    setSolicitacaoEnviada(false)
                    setModalAberto(true)
                }}
            >
                Avise-me quando chegar
            </button>

            {modalAberto && (
                <div
                    className="modal-fundo"
                    role="presentation"
                    onClick={() => setModalAberto(false)}
                >
                    <div
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-aviso-titulo"
                        onClick={(evento) => evento.stopPropagation()}
                    >
                        <button
                            className="modal-fechar"
                            type="button"
                            aria-label="Fechar"
                            onClick={() => setModalAberto(false)}
                        >
                            ×
                        </button>

                        {solicitacaoEnviada ? (
                            <div className="modal-mensagem">
                                <h2 id="modal-aviso-titulo">Pedido cadastrado!</h2>
                                <p>
                                    Avisaremos {nome} pelo e-mail {email} quando esse produto estiver disponível.
                                </p>
                                <button
                                    className="botao botao-grande"
                                    type="button"
                                    onClick={() => setModalAberto(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="sobretitulo">Produto esgotado</p>
                                <h2 id="modal-aviso-titulo">Avise-me quando chegar</h2>
                                <p className="modal-descricao">
                                    Informe seus dados e avisaremos quando <strong>{produto.title}</strong> estiver
                                    disponível novamente.
                                </p>

                                <form
                                    className="modal-formulario"
                                    onSubmit={(evento) => {
                                        evento.preventDefault()
                                        setSolicitacaoEnviada(true)
                                    }}
                                >
                                    <label className="rotulo" htmlFor="nome-aviso">
                                        Nome
                                    </label>
                                    <input
                                        id="nome-aviso"
                                        type="text"
                                        value={nome}
                                        onChange={(evento) => setNome(evento.target.value)}
                                        placeholder="Digite seu nome"
                                        required
                                    />

                                    <label className="rotulo" htmlFor="email-aviso">
                                        E-mail
                                    </label>
                                    <input
                                        id="email-aviso"
                                        type="email"
                                        value={email}
                                        onChange={(evento) => setEmail(evento.target.value)}
                                        placeholder="voce@email.com"
                                        required
                                    />

                                    <button className="botao botao-grande" type="submit">
                                        Quero ser avisado
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}