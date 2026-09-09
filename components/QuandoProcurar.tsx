import { sinais } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import Secao from './Secao';
import { IconeCheck } from './Icones';
import s from './QuandoProcurar.module.css';

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

      <ul className={s.lista}>
        {sinais.map((sinal) => (
          <li key={sinal} className={s.item}>
            <IconeCheck className={s.icone} />
            <span>{sinal}</span>
          </li>
        ))}
      </ul>

      <div className={s.rodape}>
        <BotaoWhatsApp variante="contorno">
          Conversar sobre isso no WhatsApp
        </BotaoWhatsApp>
      </div>
    </Secao>
  );
}
