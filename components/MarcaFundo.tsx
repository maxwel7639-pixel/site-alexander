import s from './MarcaFundo.module.css';

type Props = {
  /** 'claro' e sobre creme ou palha. 'escuro' e sobre o grafite. */
  tom?: 'claro' | 'escuro';
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
export default function MarcaFundo({ tom = 'claro' }: Props) {
  return (
    <div className={`${s.campo} ${s[tom]}`} aria-hidden="true">
      <span className={`${s.psi} ${s.esquerda}`}>Ψ</span>
      <span className={`${s.psi} ${s.direita}`}>Ψ</span>
    </div>
  );
}
