import { sinais, whatsappCom } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import Secao from './Secao';
import { IconeCheck, IconeWhatsApp } from './Icones';
import s from './QuandoProcurar.module.css';

/**
 * Quando procurar ajuda.
 *
 * ======================= OS QUATRO SINAIS VIRARAM PORTAS ====================
 * Eram uma lista pra ler. Agora cada um e um link que abre o WhatsApp com o
 * assunto ja escrito, e isso resolve as duas pontas de uma vez.
 *
 * Do lado de quem chega: a parte mais dificil de procurar um psicologo nao e
 * achar o numero, e escrever a primeira frase. Aqui ela ja vem pronta.
 *
 * Do lado dele: a conversa comeca sabendo do que se trata, em vez de um "oi"
 * seco que exige tres mensagens ate chegar no assunto.
 *
 * ============== POR QUE O TEXTO AVISA QUE DA PRA EDITAR =====================
 * Porque sem esse aviso o link vira um risco. Quem esta mal e clica sem saber o
 * que acontece pode achar que acabou de mandar, sem querer, uma frase sobre a
 * propria tristeza pra um desconhecido. O WhatsApp so PREENCHE a caixa -- nada
 * sai sem apertar enviar -- e dizer isso antes e o que transforma o clique de
 * risco em convite.
 */
export default function QuandoProcurar() {
  return (
    <Secao
      id="sinais"
      traco="onda"
      etiqueta="Quando procurar ajuda"
      titulo="Quatro sinais que ele costuma apontar"
      fundo="escuro"
    >
      <p className={s.introducao}>
        Estes quatro sinais são os que o próprio Alexander publica. Reconhecer-se
        em algum deles não é diagnóstico. É só um bom motivo para conversar.
      </p>

      <p className={s.instrucao}>
        Se você se reconhece em algum, toque nele: a mensagem abre já escrita, e
        você lê e muda o que quiser antes de enviar.
      </p>

      <ul className={s.lista}>
        {sinais.map((sinal) => (
          <li key={sinal.texto}>
            <a
              href={whatsappCom(sinal.mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className={s.item}
              aria-label={`${sinal.texto} — abrir o WhatsApp com essa mensagem escrita`}
            >
              <IconeCheck className={s.icone} />
              <span className={s.texto}>{sinal.texto}</span>
              {/*
                O icone do WhatsApp e nao uma seta: seta diz "tem mais adiante",
                e quem esta prestes a falar de um assunto dificil merece saber
                exatamente pra onde o toque leva antes de dar o toque.
              */}
              <IconeWhatsApp className={s.destino} />
            </a>
          </li>
        ))}
      </ul>

      <div className={s.rodape}>
        {/*
          A porta de quem nao se reconheceu em nenhum dos quatro. O texto mudou
          junto com os cartoes: com cada sinal virando um link proprio, um botao
          dizendo "conversar sobre isso" passaria a competir com eles em vez de
          oferecer outra coisa.
        */}
        <BotaoWhatsApp variante="contorno">
          Prefiro escrever do meu jeito
        </BotaoWhatsApp>
      </div>
    </Secao>
  );
}
