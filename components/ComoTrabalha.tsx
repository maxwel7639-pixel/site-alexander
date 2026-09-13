import FotoProfundidade from './FotoProfundidade';
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
      lateral={
        /*
          A foto de 13/09/2026, com o fundo refeito no ChatGPT. O FUNDO NÃO É A
          SALA DELE, por isso não há legenda chamando de consultório: a sala de
          verdade está em "O espaço".

          Aparece INTEIRA (é panorâmica) e fica AO LADO do título, parada
          enquanto o texto rola -- pedidos do Maxwel no mesmo dia. Ver a prop
          `lateral` em Secao.tsx.
        */
        <figure className={s.figura}>
          <FotoProfundidade
            src="/img/alexander-consultorio-poltrona.webp"
            alt={
              'Alexander Barnabés sentado em uma poltrona de couro, sorrindo, ' +
              'de camisa listrada e com os óculos na mão.'
            }
            largura={2000}
            altura={1116}
            sizes="(max-width: 899px) 100vw, 56vw"
          />
        </figure>
      }
    >
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
    </Secao>
  );
}
