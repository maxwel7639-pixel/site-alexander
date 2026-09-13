'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import s from './CoverflowServicos.module.css';

export type ItemServico = {
  titulo: string;
  texto: string;
  imagem?: string;
  alt?: string;
  temFoto: boolean;
};

const INTERVALO = 5000;

/**
 * Os serviços em coverflow 3D, com a mesma geometria do portfólio da MX
 * (portfoliomx.online, terceira seção). Pedido do Maxwel em 13/09/2026: o
 * Alexander achou a página "muito quieta", e os serviços passam a girar.
 *
 * A GEOMETRIA: cada cartão anda no X conforme a distância do centro, afunda no
 * Z, encolhe e gira em torno do eixo Y. O giro tem sinal invertido de
 * propósito: o cartão da direita mostra a face esquerda, que é o que faz ele
 * parecer indo pro fundo. Teto de 34 graus, acima disso o texto entra em fuga.
 *
 * SÓ O DA FRENTE MOSTRA TEXTO e só ele recebe foco. Os vizinhos estão ali do
 * lado e a legenda deles vazaria por cima do cartão do meio. Clicar num de trás
 * traz ele pra frente.
 *
 * O GIRO SOZINHO É SÓ CONVITE: para com o mouse em cima, e para de vez quando a
 * pessoa toma o controle (arraste, ponto, seta). Não anda fora da tela, com a
 * aba escondida, nem com prefers-reduced-motion.
 */
export default function CoverflowServicos({ itens }: { itens: ItemServico[] }) {
  const N = itens.length;
  const [atual, setAtual] = useState(0);
  const [largura, setLargura] = useState(260);
  const pausado = useRef(false);
  const tocou = useRef(false);
  const palco = useRef<HTMLDivElement>(null);
  const arraste = useRef({ ativo: false, x: 0 });

  const vai = useCallback((n: number) => setAtual(((n % N) + N) % N), [N]);

  useEffect(() => {
    const medir = () => setLargura(Math.min(290, Math.max(window.innerWidth * 0.2, 150)));
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const relogio = setInterval(() => {
      if (pausado.current || tocou.current || document.hidden) return;
      const r = palco.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      setAtual((a) => (a + 1) % N);
    }, INTERVALO);
    return () => clearInterval(relogio);
  }, [N]);

  function assumir(n: number) {
    tocou.current = true;
    vai(n);
  }

  return (
    <div className={s.bloco}>
      <div
        ref={palco}
        className={s.palco}
        onMouseEnter={() => (pausado.current = true)}
        onMouseLeave={() => (pausado.current = false)}
        onPointerDown={(e) => {
          arraste.current = { ativo: true, x: e.clientX };
        }}
        onPointerMove={(e) => {
          if (!arraste.current.ativo) return;
          const andou = e.clientX - arraste.current.x;
          if (Math.abs(andou) > 60) {
            assumir(atual + (andou > 0 ? -1 : 1));
            arraste.current.x = e.clientX;
          }
        }}
        onPointerUp={() => (arraste.current.ativo = false)}
        onPointerCancel={() => (arraste.current.ativo = false)}
        onPointerLeave={() => (arraste.current.ativo = false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') assumir(atual - 1);
          if (e.key === 'ArrowRight') assumir(atual + 1);
        }}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Serviços"
        tabIndex={0}
      >
        {itens.map((item, i) => {
          let o = i - atual;
          if (o > N / 2) o -= N;
          if (o < -N / 2) o += N;
          const a = Math.abs(o);
          const frente = a < 0.5;
          const giro = Math.max(-34, Math.min(34, -o * 22));
          return (
            <article
              key={item.titulo}
              className={`${s.cartao} ${frente ? s.frente : ''}`}
              aria-hidden={!frente}
              onClick={() => !frente && assumir(i)}
              style={{
                transform: `translateX(${o * largura}px) translateZ(${-a * 150}px) rotateY(${giro}deg) scale(${Math.max(0.68, 1 - a * 0.15)})`,
                opacity: a > 2.6 ? 0 : Math.max(0, 1 - a * 0.3),
                filter: frente ? 'none' : `brightness(${Math.max(0.62, 1 - a * 0.18).toFixed(2)})${a > 1.6 ? ' blur(1.2px)' : ''}`,
                zIndex: 50 - Math.round(a * 10),
              }}
            >
              <div className={s.quadro}>
                {item.temFoto ? (
                  <Image
                    src={`/img/servicos/${item.imagem}`}
                    alt={frente ? item.alt || '' : ''}
                    width={900}
                    height={675}
                    sizes="(max-width: 639px) 86vw, 440px"
                    className={s.imagem}
                    draggable={false}
                  />
                ) : (
                  <span className={s.espera} aria-hidden="true">Ψ</span>
                )}
              </div>
              <div className={s.corpo}>
                <h3 className={s.titulo}>{item.titulo}</h3>
                <p className={s.texto}>{item.texto}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={s.pontos}>
        {itens.map((item, i) => (
          <button
            key={item.titulo}
            type="button"
            className={`${s.ponto} ${i === atual ? s.ligado : ''}`}
            aria-label={`Ver ${item.titulo}`}
            aria-current={i === atual ? 'true' : undefined}
            onClick={() => assumir(i)}
          />
        ))}
      </div>
    </div>
  );
}
