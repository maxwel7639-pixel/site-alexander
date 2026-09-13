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
            {/*
              Foto de 13/09/2026: a do consultório com o fundo refeito no
              ChatGPT, a pedido dele ("não daria para colocar um fundo
              melhor?"). O FUNDO NÃO É A SALA DELE -- é um ambiente gerado. Por
              isso a legenda que dizia "O consultório, no Centro de Nova
              Iguaçu" saiu: a sala de verdade está na seção "O espaço", e o
              site não pode mostrar como consultório um lugar onde o paciente
              nunca vai entrar.
            */}
            <Image
              src="/img/alexander-consultorio-poltrona.webp"
              alt={
                'Alexander Barnabés sentado em uma poltrona de couro, sorrindo, ' +
                'de camisa listrada e com os óculos na mão.'
              }
              width={2000}
              height={1116}
              sizes="(max-width: 899px) 100vw, 42vw"
              className={s.imagem}
            />
          </div>
        </figure>
      </div>
    </Secao>
  );
}
