import Image from 'next/image';
import Secao from './Secao';
import { sobre } from '@/lib/dados';
import s from './ComoTrabalha.module.css';

export default function ComoTrabalha() {
  return (
    <Secao
      id="atendimento"
      etiqueta="Sobre mim"
      titulo="Quem vai te escutar"
      fundo="palha"
    >
      <div className={s.grade}>
        <div className={s.texto}>
          {/* O texto mora em lib/dados.ts, com a explicacao de por que ele
              nao foi copiado do site de referencia. E a unica secao do site em
              primeira pessoa: aqui quem fala e ele. */}
          {sobre.map((paragrafo) => (
            <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
          ))}

          <ul className={s.formatos}>
            <li>Individual</li>
            <li>Casal</li>
            <li>Familiar</li>
            <li>Online</li>
          </ul>
        </div>

        <figure className={s.figura}>
          {/* Tres fotos empilhadas: a classe `pilha` desenha as duas de tras. */}
          <div className="pilha">
            <Image
              src="/img/consultorio.webp"
              alt={
                'Alexander Barnabés sentado na poltrona marrom do consultório, ' +
                'sorrindo, com um caderno e uma caneca na mesa de apoio ao lado.'
              }
              width={1200}
              height={1063}
              sizes="(max-width: 899px) 100vw, 42vw"
              className={s.imagem}
            />
          </div>
          <figcaption className={s.legenda}>
            O consultório, no Centro de Nova Iguaçu.
          </figcaption>
        </figure>
      </div>
    </Secao>
  );
}
