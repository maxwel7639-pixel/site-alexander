'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Secao from './Secao';
import { espaco } from '@/lib/dados';
import s from './Espaco.module.css';

const INTERVALO = 6000;

/**
 * O espaco onde ele atende.
 *
 * ============================== POR QUE EXISTE ==============================
 * O site mostrava a fachada e um retrato na poltrona. Faltava a sala. Quem vai
 * a terapia pela primeira vez chega com uma pergunta que ninguem faz em voz
 * alta -- "como e la dentro?" -- e ela some quando a pessoa ja viu o lugar.
 *
 * ============================== DUAS COLUNAS ================================
 * Copy a esquerda, galeria a direita. A primeira versao punha o texto em cima e
 * a foto na largura toda: 1120 por 608. Grande daquele jeito ela nao dividia a
 * atencao com o texto, ela substituia -- quando a pessoa chegava na foto, a
 * copy ja tinha saido da tela. Lado a lado, quem para pra ler ve as imagens
 * trocando ao lado.
 *
 * =============================== A TIRA =====================================
 * NO DESKTOP ela se apoia na base da foto: perto o bastante pra ficar claro que
 * uma coisa comanda a outra.
 *
 * NO CELULAR ela desce pra baixo da foto. Ali a foto e baixa e a tira
 * sobreposta comia quase metade dela: a miniatura passava a ser o assunto, e o
 * assunto e a sala.
 *
 * A tira rola DENTRO DELA MESMA: `overflow-x` mora no contentor dela e nunca
 * sobe pro documento. Galeria que empurra a largura da pagina e o jeito mais
 * comum de um site ganhar rolagem lateral no celular.
 *
 * ================================ O RELOGIO =================================
 * Ele para em tres situacoes, e as tres importam:
 *
 *   mouse ou foco dentro   quem esta olhando decide o ritmo, nao o relogio
 *   aba escondida          contador correndo em aba de fundo nao serve a
 *                          ninguem e ainda gasta bateria
 *   prefers-reduced-motion movimento automatico e exatamente o que essa
 *                          preferencia pede pra nao acontecer
 *
 * Clicar numa miniatura zera a contagem, porque `atual` esta nas dependencias
 * do efeito: seria estranho escolher uma foto e ela trocar meio segundo depois.
 */
export default function Espaco() {
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);

  useEffect(() => {
    const menosMovimento = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (menosMovimento || parado) return;

    const relogio = setInterval(() => {
      if (document.hidden) return;
      setAtual((i) => (i + 1) % espaco.fotos.length);
    }, INTERVALO);

    return () => clearInterval(relogio);
  }, [parado, atual]);

  return (
    <Secao id="espaco" etiqueta="O espaço" titulo={espaco.titulo} fundo="claro">
      <div className={s.colunas}>
        <p className={s.introducao}>{espaco.texto}</p>

        <div
          className={s.galeria}
          onMouseEnter={() => setParado(true)}
          onMouseLeave={() => setParado(false)}
          onFocusCapture={() => setParado(true)}
          onBlurCapture={() => setParado(false)}
        >
          {/*
            O quadro e o contexto de posicionamento da tira. Ela e IRMA do
            palco e nao filha: assim pode sobrepor a foto no desktop e descer
            pra baixo dela no celular, sem trocar de lugar no DOM.
          */}
          <div className={s.quadro}>
            <div className={s.palco}>
              {/*
                As fotos ficam TODAS montadas, empilhadas, e o que muda e a
                opacidade. Trocar o `src` de uma unica <img> daria um piscar
                branco a cada volta, e o next/image perderia o pre-carregamento
                das seguintes.
              */}
              {espaco.fotos.map((foto, i) => (
                <Image
                  key={foto.arquivo}
                  src={`/img/${foto.arquivo}`}
                  alt={foto.alt}
                  width={1600}
                  height={1201}
                  sizes="(max-width: 899px) 100vw, 58vw"
                  // So a primeira tem prioridade: carregar as tres de uma vez
                  // atrasaria justamente a que aparece.
                  priority={i === 0}
                  className={`${s.foto} ${i === atual ? s.visivel : ''}`}
                />
              ))}

              {/* O veu so existe onde a tira cobre a foto: no desktop. */}
              <div className={s.veu} aria-hidden="true" />
            </div>

            <div className={s.tira}>
              {espaco.fotos.map((foto, i) => (
                <button
                  key={foto.arquivo}
                  type="button"
                  onClick={() => setAtual(i)}
                  className={`${s.miniatura} ${i === atual ? s.ativa : ''}`}
                  aria-label={`Ver: ${foto.legenda}`}
                  aria-current={i === atual ? 'true' : undefined}
                >
                  <Image
                    src={`/img/${foto.arquivo}`}
                    alt=""
                    width={320}
                    height={240}
                    sizes="150px"
                    className={s.miniaturaImagem}
                  />
                </button>
              ))}
            </div>
          </div>

          {/*
            A legenda muda junto, e e o unico texto que a troca move.
            `aria-live` educado: quem usa leitor de tela recebe a mudanca sem
            ser interrompido no meio de outra leitura.
          */}
          <p className={s.legenda} aria-live="polite">
            {espaco.fotos[atual].legenda}
          </p>
        </div>
      </div>
    </Secao>
  );
}
