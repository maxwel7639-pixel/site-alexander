import s from './MarcaFundo.module.css';

type Props = {
  /** 'claro' e sobre creme ou palha. 'escuro' e sobre o grafite. */
  tom?: 'claro' | 'escuro';
  /**
   * Some com o psi da direita. Serve pras secoes que tem traco: os dois moram
   * no mesmo canto e, sobrepostos, viram emaranhado -- foi exatamente o que
   * aconteceu no Contato. O da esquerda continua, entao a marca nao falta em
   * secao nenhuma.
   */
  soEsquerda?: boolean;
};

/**
 * O psi dele, grande e quase transparente, sangrando pelas duas laterais.
 *
 * ============================== POR QUE EXISTE ==============================
 * Nasceu so na abertura, pra o campo creme parar de ser uma chapa. O Maxwel viu
 * e pediu duas coisas: espelhar pro outro lado, e levar pra todas as secoes.
 * Vira componente por isso -- a alternativa era repetir o mesmo span e o mesmo
 * bloco de posicionamento em sete arquivos, e sete copias divergem no primeiro
 * ajuste de opacidade.
 *
 * ========================= POR QUE TEXTO, E NAO A IMAGEM ====================
 * `/img/simbolo-psi.webp` e o psi dourado SOBRE grafite, com fundo. Como marca
 * d'agua ele apareceria como um quadrado escuro. O caractere Ψ na fonte de
 * titulo da a mesma forma, em qualquer escala, sem baixar um byte.
 *
 * ============================== ACESSIBILIDADE ==============================
 * `aria-hidden` nos dois. Um leitor de tela lendo "psi psi" antes de cada secao
 * seria ruido puro: a marca aqui e textura, nao conteudo.
 */
export default function MarcaFundo({ tom = 'claro', soEsquerda }: Props) {
  return (
    <div className={`${s.campo} ${s[tom]}`} aria-hidden="true">
      {/*
        `unica` marca o caso em que este e o UNICO psi da secao. Sem essa marca
        o CSS nao tem como distinguir "sou o da esquerda, tem outro do outro
        lado" de "sou o unico que existe aqui" -- e no celular, onde so um cabe,
        os dois casos pedem tratamento oposto.
      */}
      <span className={`${s.psi} ${s.esquerda} ${soEsquerda ? s.unica : ''}`}>
        Ψ
      </span>
      {soEsquerda ? null : <span className={`${s.psi} ${s.direita}`}>Ψ</span>}
    </div>
  );
}
