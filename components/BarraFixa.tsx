import { atendimento } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import s from './BarraFixa.module.css';

/**
 * Barra fixa no rodape do celular. A conversao do site inteiro e o WhatsApp,
 * e quem chega aqui pode estar mal demais para rolar ate o fim procurando o
 * botao. So aparece abaixo de 1120px, onde o cabecalho nao mostra o dele --
 * que e a largura a partir da qual a pilula do topo cabe inteira na tela.
 */
export default function BarraFixa() {
  return (
    <div className={s.barra}>
      <div className={s.interno}>
        <p className={s.horario}>{atendimento.horarioCurto}</p>
        <BotaoWhatsApp className={s.botao}>WhatsApp</BotaoWhatsApp>
      </div>
    </div>
  );
}
