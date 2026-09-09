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
 * O terceiro. Diferente dos outros dois sem sair da familia: os tres ATRAVESSAM
 * -- o que muda e o gesto. A onda tem riscos cortando, o sublinhado volta por
 * baixo, e este termina numa virada pra cima, como quem levanta a caneta.
 *
 * ============================ POR QUE NAO E MAIS UM ARCO ====================
 * A primeira versao era um arco alto que CERCAVA o canto, com 220 de altura no
 * viewBox contra 96 da onda. Dois problemas, e o Maxwel viu os dois:
 *
 * Alto daquele jeito, ele descia dentro da faixa vertical onde mora o psi da
 * MarcaFundo, e os dois desenhos se cruzavam num emaranhado.
 *
 * E arco nao e gesto: ele nao vai a lugar nenhum. Lia como um pedaco de
 * circunferencia solto, nao como um traco que alguem fez.
 */
function Arco() {
  return (
    <svg viewBox="0 0 540 120" fill="none" className={s.svg}>
      <path
        d="M12 84C90 26 210 20 302 48c66 20 120 29 184 9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 90C98 34 214 28 302 55c64 19 116 27 178 9"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* A virada final. E ela que transforma a linha em gesto: sem isso o
          traco so termina, com isso ele e SOLTO. */}
      <path
        d="M486 57c17-5 27-16 24-30"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
