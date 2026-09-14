'use client';

import Image from 'next/image';
import { useRef } from 'react';
import s from './FotoProfundidade.module.css';

type Props = {
  src: string;
  alt: string;
  largura: number;
  altura: number;
  sizes: string;
  /** Carrega antes do resto: pra foto que aparece na primeira tela. */
  preload?: boolean;
};

/**
 * Foto com profundidade: inclina em 3D seguindo o mouse e a sombra anda junto,
 * como se a foto estivesse suspensa acima da página. Pedido do Maxwel em
 * 13/09/2026 pra foto do "sobre mim" ("efeitos 3D, sombreado").
 *
 * EM REPOUSO ELA JÁ TEM PROFUNDIDADE: uma inclinação leve e sombra em camadas.
 * Assim o efeito existe também no celular, onde não há mouse pra inclinar, e
 * na primeira olhada, antes de qualquer movimento.
 *
 * A imagem aparece INTEIRA (sem object-fit: cover): é panorâmica e o pedido
 * foi justamente não cortar.
 *
 * Com prefers-reduced-motion ela fica parada na pose de repouso.
 */
export default function FotoProfundidade({ src, alt, largura, altura, sizes, preload }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function mover(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 9).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 11).toFixed(2)}deg`);
    el.style.setProperty('--sx', `${(-px * 26).toFixed(1)}px`);
    el.style.setProperty('--sy', `${(-py * 18 + 28).toFixed(1)}px`);
    el.style.setProperty('--brilho-x', `${((px + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty('--brilho-y', `${((py + 0.5) * 100).toFixed(0)}%`);
  }

  function soltar() {
    const el = ref.current;
    if (!el) return;
    ['--rx', '--ry', '--sx', '--sy', '--brilho-x', '--brilho-y'].forEach((v) => el.style.removeProperty(v));
  }

  return (
    <div className={s.cena}>
      <div ref={ref} className={s.foto} onPointerMove={mover} onPointerLeave={soltar}>
        <Image src={src} alt={alt} width={largura} height={altura} sizes={sizes} preload={preload} className={s.imagem} />
        <span className={s.brilho} aria-hidden="true" />
      </div>
    </div>
  );
}
