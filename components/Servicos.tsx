import { servicos } from '@/lib/dados';
import Secao from './Secao';
import s from './Servicos.module.css';

/**
 * O que ele oferece.
 *
 * ============================== POR QUE EXISTE ==============================
 * Ele pediu, em 09/09/2026, que "Coaching de relacionamentos e Consultorias"
 * aparecessem em algum lugar. Nao havia lugar: o site inteiro falava do que
 * DOI em quem chega (a secao de temas) e de por onde a conversa acontece
 * (presencial e online), e nunca do que ele faz.
 *
 * Entao a secao nova nao e um card a mais no meio dos temas -- seria a mistura
 * errada, porque tema e escrito na voz de quem sente e servico e escrito na
 * voz de quem oferece. E uma faixa propria, com os quatro servicos em uma
 * frase cada.
 *
 * ============================ ONDE ELA FICA =================================
 * Logo depois de "Como ele trabalha" e antes dos temas. A ordem responde as
 * perguntas de quem chega na sequencia em que elas aparecem: como e trabalhar
 * com ele, o que da pra contratar, e so entao "isso que eu tenho cabe aqui?".
 *
 * ========================= NAO TEM BOTAO NEM PRECO ==========================
 * Nenhum cartao termina em "agende agora". A pagina ja tem tres portas pro
 * WhatsApp -- o topo, os quatro sinais e o contato -- e uma quarta aqui so
 * transformaria uma lista de servicos em vitrine. Preco e duracao ele nao
 * mandou, e nada aqui promete resultado.
 */
export default function Servicos() {
  return (
    <Secao
      id="servicos"
      etiqueta="Serviços"
      titulo="As formas de trabalhar com ele"
      fundo="mate"
    >
      {/* Sem contar quantos sao: o numero mora no array, e texto que repete o
          tamanho de uma lista envelhece sozinho no dia em que ela crescer. */}
      <p className={s.introducao}>
        Na primeira conversa dá para entender qual destes formatos faz sentido
        para o que você está vivendo.
      </p>

      <ul className={s.grade}>
        {servicos.map((servico) => (
          <li key={servico.titulo} className={s.cartao}>
            <h3 className={s.titulo}>{servico.titulo}</h3>
            <p className={s.texto}>{servico.texto}</p>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
