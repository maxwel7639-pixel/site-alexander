import Image from 'next/image';
import { qualificacoes, reconhecimentos } from '@/lib/dados';
import Secao from './Secao';
import { SimboloPsi } from './Icones';
import s from './Formacao.module.css';

export default function Formacao() {
  return (
    <Secao
      id="formacao"
      etiqueta="Formação e reconhecimento"
      titulo="O que está registrado"
      fundo="palha"
    >
      <div className={s.grade}>
        <div>
          <h3 className={s.subtitulo}>Formação</h3>
          <ul className={s.qualificacoes}>
            {qualificacoes.map((item) => (
              <li key={item}>
                <SimboloPsi className={s.psi} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className={s.subtitulo}>Reconhecimento</h3>
          <ul className={s.reconhecimentos}>
            {reconhecimentos.map((item) => (
              <li key={item.titulo} className={s.reconhecimento}>
                <strong>{item.titulo}</strong>
                <span className={s.orgao}>{item.orgao}</span>
                <span className={s.detalhe}>{item.detalhe}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className={s.figura}>
          <Image
            src="/img/mocao-camara-nova-iguacu.webp"
            alt={
              'Alexander Barnabés no plenário da Câmara Municipal de Nova ' +
              'Iguaçu, ao lado de um vereador, segurando a Moção emoldurada. ' +
              'Atrás deles, as letras Poder Legislativo na parede de madeira.'
            }
            width={1400}
            height={933}
            sizes="(max-width: 899px) 100vw, 48vw"
            className={s.imagem}
          />
          <figcaption className={s.legenda}>
            Recebendo a Moção de Congratulações e Aplausos no plenário da Câmara
            Municipal de Nova Iguaçu, processo nº 881/2023.
          </figcaption>
        </figure>
      </div>
    </Secao>
  );
}
