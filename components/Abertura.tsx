import Image from 'next/image';
import { atendimento, profissional } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import { IconeLocal, IconeRelogio } from './Icones';
import s from './Abertura.module.css';

export default function Abertura() {
  return (
    <section className={s.abertura} id="topo">
      <div className={s.interno}>
        <div className={s.texto}>
          <p className={s.registro}>{profissional.crp}</p>

          <h1 className={s.titulo}>{profissional.nome}</h1>

          <p className={s.papel}>{profissional.titulo}</p>

          <p className={s.linha}>
            Escuta para quem está passando por um momento difícil. Atendimento
            individual, de casal e familiar em Nova Iguaçu, no Centro, e também
            online.
          </p>

          <BotaoWhatsApp className={s.cta}>
            Agendar pelo WhatsApp
          </BotaoWhatsApp>

          <ul className={s.dados}>
            <li>
              <IconeLocal className={s.icone} />
              <span>Centro de Nova Iguaçu, e online</span>
            </li>
            <li>
              <IconeRelogio className={s.icone} />
              <span>{atendimento.horario}</span>
            </li>
          </ul>
        </div>

        <div className={s.foto}>
          <Image
            src="/img/alexander-barnabes-retrato.webp"
            alt={
              'Alexander Barnabés sentado em um sofá, de blazer branco e ' +
              'calça mostarda, com a mão no queixo, olhando para a câmera.'
            }
            width={1296}
            height={864}
            priority
            sizes="(max-width: 899px) 100vw, 46vw"
            className={s.imagem}
          />
        </div>
      </div>
    </section>
  );
}
