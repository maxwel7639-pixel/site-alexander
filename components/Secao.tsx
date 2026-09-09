import MarcaFundo from './MarcaFundo';
import Traco from './Traco';
import s from './Secao.module.css';

type Props = {
  id: string;
  etiqueta?: string;
  titulo: string;
  /** 'claro' e o creme, 'palha' e o bege, 'escuro' e o grafite. */
  fundo?: 'claro' | 'palha' | 'escuro';
  /** O desenho a mao no vazio ao lado do titulo. Nem toda secao leva um. */
  traco?: 'onda' | 'sublinhado' | 'arco';
  children: React.ReactNode;
};

export default function Secao({
  id,
  etiqueta,
  titulo,
  fundo = 'claro',
  traco,
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
      <MarcaFundo tom={fundo === 'escuro' ? 'escuro' : 'claro'} />

      {traco ? (
        <Traco variante={traco} tom={fundo === 'escuro' ? 'escuro' : 'claro'} />
      ) : null}

      <div className={s.interno}>
        <header className={s.cabecalho}>
          {etiqueta ? <p className={s.etiqueta}>{etiqueta}</p> : null}
          <h2 id={tituloId}>{titulo}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}
