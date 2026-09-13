import s from './Letreiro.module.css';

type Tom = 'claro' | 'escuro';

type Props = {
  /** id do h2, pro aria-labelledby da seção. */
  id: string;
  etiqueta: string;
  /** A frase miúda em itálico sobre a tarja. */
  faixa: string;
  /** A palavra grande. É ela que vira o h2. */
  palavra: string;
  tom?: Tom;
  className?: string;
  /** Parágrafo de introdução, logo abaixo da palavra. */
  children?: React.ReactNode;
};

/**
 * O letreiro de abertura de seção, no estilo do cartaz de psicologia que o
 * Maxwel mandou de referência em 13/09/2026 ("Dizer não também é uma forma de
 * cuidado"): etiqueta miúda, uma frase em itálico sobre uma tarja, a palavra
 * enorme e, atrás de tudo, a mesma palavra gigante e apagada (o `Eco`).
 *
 * Nasceu em Serviços e foi repetido na divisão com Temas ("Psicologia"). Virou
 * componente pra os dois não divergirem no primeiro ajuste de tamanho.
 */
export function Letreiro({
  id,
  etiqueta,
  faixa,
  palavra,
  tom = 'claro',
  className,
  children,
}: Props) {
  return (
    <div className={[s.letreiro, s[tom], className].filter(Boolean).join(' ')}>
      <p className={s.etiqueta}>{etiqueta}</p>
      <p className={s.faixa}>{faixa}</p>
      <h2 id={id} className={s.palavra}>
        {palavra}
      </h2>
      {children ? <p className={s.introducao}>{children}</p> : null}
    </div>
  );
}

/** A palavra gigante e apagada atrás do letreiro. Textura: fora do leitor de tela. */
export function Eco({
  palavra,
  tom = 'claro',
  className,
}: {
  palavra: string;
  tom?: Tom;
  className?: string;
}) {
  return (
    <span className={[s.eco, s[tom], className].filter(Boolean).join(' ')} aria-hidden="true">
      {palavra}
    </span>
  );
}
