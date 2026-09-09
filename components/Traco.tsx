import s from './Traco.module.css';

type Props = {
  /** Qual desenho. Um por secao: repetir o mesmo em tres viraria carimbo. */
  variante: 'onda' | 'sublinhado' | 'arco';
  /** 'claro' e sobre creme ou palha. 'escuro' e sobre o grafite. */
  tom?: 'claro' | 'escuro';
};

/**
 * O traco a mao, no vazio ao lado do titulo.
 *
 * ============================== DE ONDE VEIO ================================
 * O Maxwel rabiscou por cima de um print: uma linha comprida atravessando o
 * espaco vazio a direita do titulo, com dois riscos cruzando ela. Aqui esta o
 * mesmo gesto, desenhado.
 *
 * ========================= POR QUE PARECE FEITO A MAO =======================
 * Nao e a curva -- e a REPETICAO. Cada traco sao DOIS caminhos quase iguais,
 * sobrepostos e ligeiramente fora de registro, como caneta que passa duas vezes
 * no mesmo lugar. Um caminho so, por mais torto que fosse, continuaria lendo
 * como vetor. Dois em cima do outro leem como gesto.
 *
 * As pontas sao redondas e as espessuras nunca batem entre os dois caminhos,
 * pelo mesmo motivo: linha de espessura constante e a assinatura do computador.
 *
 * ============================== O QUE ELE NAO E =============================
 * Nao e conteudo. `aria-hidden` nos tres, e nenhum deles carrega informacao que
 * nao esteja escrita ao lado em texto.
 */
export default function Traco({ variante, tom = 'claro' }: Props) {
  return (
    <div className={`${s.campo} ${s[tom]} ${s[variante]}`} aria-hidden="true">
      {variante === 'onda' ? <Onda /> : null}
      {variante === 'sublinhado' ? <Sublinhado /> : null}
      {variante === 'arco' ? <Arco /> : null}
    </div>
  );
}

/**
 * O rabisco dele, limpo: sobe, achata e cai, com dois riscos cortando.
 * Os riscos nao sao paralelos de proposito -- 8 graus de diferenca entre eles
 * e o que separa "risquei rapido" de "desenhei com esquadro".
 */
function Onda() {
  return (
    <svg viewBox="0 0 520 96" fill="none" className={s.svg}>
      <path
        d="M6 74C64 22 148 10 236 30c74 17 152 30 226 22"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9 71C70 24 150 15 235 34c76 17 150 29 224 21"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M268 6 246 84" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M330 14 314 88" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Um sublinhado que passa do fim da palavra e volta, como quem sublinha rapido. */
function Sublinhado() {
  return (
    <svg viewBox="0 0 460 74" fill="none" className={s.svg}>
      <path
        d="M10 30c88 26 196 34 300 22 46-5 88-16 142-38"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M22 44c92 24 198 30 300 18 40-5 76-14 120-30"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Diferente dos outros dois, como pedido: em vez de atravessar, ele CERCA --
 * um arco aberto que abraca o canto, com um risco solto por dentro.
 */
function Arco() {
  return (
    <svg viewBox="0 0 400 220" fill="none" className={s.svg}>
      <path
        d="M28 208C4 140 22 68 84 30c58-36 140-30 196 8 40 27 62 66 66 108"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M36 206C14 142 32 74 92 38c56-34 134-28 188 8"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M132 168c46-52 108-64 168-40"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
