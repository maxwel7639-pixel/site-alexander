import { existsSync } from 'node:fs';
import path from 'node:path';
import { CEREBRO } from '@/lib/cerebro';
import { servicos } from '@/lib/dados';
import CoverflowServicos from './CoverflowServicos';
import Desenrolar from './Desenrolar';
import { Eco, Letreiro } from './Letreiro';
import { servicosIntro } from '@/lib/dados';
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
 * voz de quem oferece. E uma faixa propria, com os servicos em uma frase cada.
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
 *
 * ===================== O LETREIRO E O CEREBRO DE FIO ========================
 * Desde 13/09/2026, pedido do Maxwel com duas referencias: um cartaz de
 * psicologia ("Dizer nao tambem e uma forma de cuidado") pro letreiro, e um
 * cerebro desenhado com uma linha so pro fundo. O fundo era azul-ardosia e
 * virou areia no mesmo dia, o bege da imagem da abertura.
 *
 * A abertura da secao fica PARADA na tela (sticky) enquanto o cerebro se
 * desenrola; quando termina, a secao segue e os cartoes sobem. Sem JS ou com
 * prefers-reduced-motion nao ha trava: o cerebro fica inteiro e a pagina rola
 * normal. O desenho sai de scripts/gerar-cerebro.mjs.
 */
export default function Servicos() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className={s.servicos}>
      <div className={s.trilho} data-trilho>
        <div className={s.painel}>
          <Eco palavra="serviços" tom="claro" />

          <div className={s.interno}>
            {/* Sem contar quantos sao: o numero mora no array, e texto que
                repete o tamanho de uma lista envelhece sozinho no dia em que
                ela crescer. */}
            <Letreiro
              id="servicos-titulo"
              tom="claro"
              etiqueta="Psicologia e psicanálise"
              faixa="As formas de trabalhar com ele"
              palavra="Serviços"
            >
              {servicosIntro}
            </Letreiro>

            <Desenrolar className={s.cerebro} fioY={CEREBRO.fioY} saidaX={CEREBRO.saidaX}>
              <svg viewBox={CEREBRO.viewBox} aria-hidden="true" focusable="false">
                <path d={CEREBRO.entrada} />
                <path d={CEREBRO.caminho} data-cerebro="" />
                <path d={CEREBRO.saida} data-saida="" />
              </svg>
            </Desenrolar>
          </div>
        </div>
      </div>

      <div className={s.interno}>
        {/*
          Coverflow 3D desde 13/09/2026, no lugar da grade de cartões: o
          Alexander achou a página "muito quieta". Quem gira é o componente
          cliente; aqui, no servidor, só se confere quais fotos já existem --
          o site é estático, então isso roda uma vez por build.
        */}
        <CoverflowServicos
          itens={servicos.map((servico) => ({
            ...servico,
            temFoto:
              !!servico.imagem &&
              existsSync(path.join(process.cwd(), 'public', 'img', 'servicos', servico.imagem)),
          }))}
        />
      </div>
    </section>
  );
}
