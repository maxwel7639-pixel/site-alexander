import MarcaFundo from './MarcaFundo';
import Traco from './Traco';
import s from './Secao.module.css';

type Props = {
  id: string;
  etiqueta?: string;
  titulo: string;
  /**
   * 'claro' e o creme, 'palha' e o bege, 'mate' e a Folha de Mate e 'escuro'
   * e o grafite. Os tres primeiros sao claros e recebem o mesmo tom de marca
   * d'agua; so o 'escuro' inverte.
   */
  fundo?: 'claro' | 'palha' | 'mate' | 'escuro';
  /** O desenho a mao no vazio ao lado do titulo. Nem toda secao leva um. */
  traco?: 'onda' | 'sublinhado' | 'arco';
  /**
   * Uma ilustracao no mesmo canto do traco, no lugar dele. Nasceu em
   * 13/09/2026 pro divã do cartao dele, que saiu do rodape e subiu pro Contato.
   */
  desenho?: React.ReactNode;
  /**
   * Conteúdo que fica AO LADO do título e do texto, parado enquanto eles
   * rolam (sticky). Nasceu em 13/09/2026 pra foto do "sobre mim": com a foto
   * dentro do corpo da seção ela começava abaixo do título e grudava por pouco
   * tempo; ao lado do título ela começa no alto da seção e segura a rolagem
   * do texto inteiro.
   */
  lateral?: React.ReactNode;
  children: React.ReactNode;
};

export default function Secao({
  id,
  etiqueta,
  titulo,
  fundo = 'claro',
  traco,
  desenho,
  lateral,
  children,
}: Props) {
  const tituloId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={[s.secao, s[fundo], fundo === 'escuro' ? 'sobreEscuro' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/* Atras de tudo, em toda secao. O `interno` sobe com z-index proprio. */}
      {/* Onde ha traco, o psi da direita sai: os dois ocupam o mesmo canto. */}
      <MarcaFundo
        tom={fundo === 'escuro' ? 'escuro' : 'claro'}
        soEsquerda={Boolean(traco || desenho)}
      />

      {traco ? (
        <Traco variante={traco} tom={fundo === 'escuro' ? 'escuro' : 'claro'} />
      ) : null}

      {desenho ? (
        <div className={s.desenho} aria-hidden="true">
          {desenho}
        </div>
      ) : null}

      <div className={s.interno}>
        {lateral ? (
          <div className={s.comLateral}>
            <div>
              <header className={s.cabecalho}>
                {etiqueta ? <p className={s.etiqueta}>{etiqueta}</p> : null}
                <h2 id={tituloId}>{titulo}</h2>
              </header>
              {children}
            </div>
            <div className={s.lateral}>{lateral}</div>
          </div>
        ) : (
          <>
            <header className={s.cabecalho}>
              {etiqueta ? <p className={s.etiqueta}>{etiqueta}</p> : null}
              <h2 id={tituloId}>{titulo}</h2>
            </header>
            {children}
          </>
        )}
      </div>
    </section>
  );
}
