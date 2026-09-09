'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { navegacao, profissional } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import s from './Cabecalho.module.css';

/**
 * Sorteia a ordem em que as letras de um link se movem. O movimento e igual em
 * todas: o que faz parecer aleatorio e a ORDEM dos atrasos.
 */
function embaralhar(tamanho: number): number[] {
  const ordem = Array.from({ length: tamanho }, (_, i) => i);
  for (let i = ordem.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return ordem;
}

export default function Cabecalho() {
  // Enquanto for nulo, o servidor e o primeiro render do cliente entregam o
  // texto puro e identicos. So depois da montagem o sorteio existe e as letras
  // sao desenhadas. Sortear durante o render daria uma ordem no servidor e
  // outra no cliente, e o React reclamaria de hydration mismatch.
  const [ordens, setOrdens] = useState<number[][] | null>(null);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    setOrdens(navegacao.map((item) => embaralhar(item.label.length)));

    // Um listener so, passivo, para o estado apertado da pilula.
    const aoRolar = () => setRolou(window.scrollY > 12);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <header
      className={[s.cabecalho, rolou ? s.rolou : '', 'sobreEscuro']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={s.pilula}>
        <a href="#topo" className={s.marca}>
          <Image
            src="/img/simbolo-psi.webp"
            alt=""
            width={38}
            height={38}
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
            {navegacao.map((item, indice) => {
              const ordem = ordens?.[indice];

              return (
                <li key={item.href}>
                  {/* O texto original vive no aria-label. Para um leitor de
                      tela, "Atendimento" picado em onze spans com tudo dobrado
                      viraria "AAtteennddiimmeennttoo". */}
                  <a href={item.href} className={s.link} aria-label={item.label}>
                    {ordem
                      ? [...item.label].map((letra, i) => (
                          <span
                            key={i}
                            className={s.letra}
                            aria-hidden="true"
                          >
                            <span
                              className={s.par}
                              style={{
                                transitionDelay: `${(
                                  ordem.indexOf(i) * 0.028
                                ).toFixed(3)}s`,
                              }}
                            >
                              <span>{letra === ' ' ? ' ' : letra}</span>
                              <span>{letra === ' ' ? ' ' : letra}</span>
                            </span>
                          </span>
                        ))
                      : item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <BotaoWhatsApp variante="contorno" className={s.botao}>
          WhatsApp
        </BotaoWhatsApp>
      </div>
    </header>
  );
}
