import Image from 'next/image';
import { navegacao, profissional } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import s from './Cabecalho.module.css';

export default function Cabecalho() {
  return (
    <header className={`${s.cabecalho} sobreEscuro`}>
      <div className={s.interno}>
        <a href="#topo" className={s.marca}>
          <Image
            src="/img/simbolo-psi.webp"
            alt=""
            width={44}
            height={44}
            className={s.logo}
            priority
          />
          <span className={s.nome}>
            <strong>{profissional.nome}</strong>
            <small>{profissional.titulo}</small>
          </span>
        </a>

        <nav className={s.nav} aria-label="Seções do site">
          <ul className={s.lista}>
            {navegacao.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={s.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BotaoWhatsApp variante="contorno" className={s.botao}>
          WhatsApp
        </BotaoWhatsApp>
      </div>
    </header>
  );
}
