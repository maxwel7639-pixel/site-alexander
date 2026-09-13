import { existsSync } from 'node:fs';
import path from 'node:path';
import { Fragment } from 'react';
import { temas } from '@/lib/dados';
import Halo from './Halo';
import { Eco, Letreiro } from './Letreiro';
import s from './Temas.module.css';

/**
 * Os temas que aparecem com mais frequência.
 *
 * Desde 13/09/2026 abre com o mesmo letreiro de Serviços, agora com a palavra
 * "Psicologia", e os temas giram num anel de cartões (Halo) em vez da
 * grade de três colunas. Pedido do Maxwel, com a referência do Halo Reel.
 *
 * As fotos dos cartões ainda não chegaram: cada tema já tem o nome do arquivo
 * em lib/dados.ts, e o cartão só usa a foto quando ela existe em
 * public/img/temas. Sem ela, o cartão mostra o nome do tema.
 */
export default function Temas() {
  return (
    <section id="temas" aria-labelledby="temas-titulo" className={s.temas}>
      <Eco palavra="psicologia" className={s.eco} />

      <div className={s.interno}>
        <Letreiro
          id="temas-titulo"
          etiqueta="Áreas de atendimento"
          faixa="Os assuntos que aparecem com mais frequência"
          palavra="Psicologia"
        >
          Alguns dos temas mais presentes no consultório. Se o que você está
          vivendo não aparece aqui, ainda assim vale conversar.
        </Letreiro>

        <Halo
          rotuloAnterior="Tema anterior"
          rotuloProximo="Próximo tema"
          cartas={temas.map((tema) => ({
            src: existsSync(path.join(process.cwd(), 'public', 'img', 'temas', tema.imagem))
              ? `/img/temas/${tema.imagem}`
              : undefined,
            rotulo: tema.titulo,
          }))}
          paineis={temas.map((tema) => (
            <Fragment key={tema.titulo}>
              <h3 className={s.titulo}>{tema.titulo}</h3>
              <p className={s.texto}>{tema.texto}</p>
            </Fragment>
          ))}
        />
      </div>
    </section>
  );
}
