import Image from 'next/image';
import { atendimento, endereco } from '@/lib/dados';
import Secao from './Secao';
import { IconeLocal, IconeRelogio } from './Icones';
import s from './Local.module.css';

export default function Local() {
  return (
    <Secao
      id="local"
      etiqueta="Onde fica"
      titulo="No Centro de Nova Iguaçu"
      fundo="palha"
    >
      <div className={s.grade}>
        <div>
          <p className={s.aviso}>
            Quem chega de ônibus procura o prédio, não o número. É o prédio do
            Laboratório Dr. Emerson, com o letreiro azul na fachada.
          </p>

          <address className={s.endereco}>
            <p className={s.linha}>
              <IconeLocal className={s.icone} />
              <span>
                {endereco.logradouro}
                <br />
                {endereco.bairro}, {endereco.cidade}, {endereco.estado}
                <br />
                CEP {endereco.cep}
                <br />
                <em className={s.referencia}>{endereco.referencia}</em>
              </span>
            </p>
            {/* TODO: acrescentar o numero da sala aqui quando o Alexander
                confirmar qual e. Ver a nota em lib/dados.ts. */}
            <p className={s.linha}>
              <IconeRelogio className={s.icone} />
              <span>
                {atendimento.horario}
                <br />
                {atendimento.modalidades}
              </span>
            </p>
          </address>

          <a
            href={endereco.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.mapa}
          >
            Abrir no Google Maps
          </a>
        </div>

        <figure className={s.figura}>
          <Image
            src="/img/fachada-laboratorio-dr-emerson.webp"
            alt={
              'Fachada do prédio na Rua Coronel Francisco Soares, com os ' +
              'letreiros azuis do Laboratório Dr. Emerson sobre a entrada.'
            }
            width={992}
            height={744}
            sizes="(max-width: 899px) 100vw, 44vw"
            className={s.imagem}
          />
          <figcaption className={s.legenda}>
            A fachada, para você reconhecer da calçada.
          </figcaption>
        </figure>
      </div>
    </Secao>
  );
}
