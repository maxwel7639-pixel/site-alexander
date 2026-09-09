import Image from 'next/image';
import Secao from './Secao';
import s from './ComoTrabalha.module.css';

export default function ComoTrabalha() {
  return (
    <Secao
      id="atendimento"
      etiqueta="Como ele trabalha"
      titulo="Um lugar para falar sem pressa"
      fundo="palha"
    >
      <div className={s.grade}>
        <div className={s.texto}>
          {/* TODO: o Alexander ainda nao mandou o paragrafo dele sobre quem e
              e como trabalha. Ele respondeu "sou psicologo e psicanalista e
              deixarei vcs construirem". Os textos abaixo descrevem apenas o
              que o material dele ja afirma: as abordagens, as modalidades e o
              formato. Trocar por um texto assinado por ele quando chegar. */}
          <p>
            O trabalho é conduzido pela psicanálise e pela psicoterapia breve.
            São dois caminhos diferentes, escolhidos conforme o que a pessoa
            traz e o tempo de que dispõe.
          </p>
          <p>
            O atendimento acontece em três formatos. Individual, para quem
            precisa de um espaço próprio. De casal, quando o que está
            difícil é a relação entre dois. E familiar, quando o assunto
            envolve a casa inteira.
          </p>
          <p>
            A primeira conversa serve para entender o que está acontecendo e
            combinar como seguir. Não existe assunto pequeno demais para ser
            levado à terapia.
          </p>

          <ul className={s.formatos}>
            <li>Individual</li>
            <li>Casal</li>
            <li>Familiar</li>
            <li>Online</li>
          </ul>
        </div>

        <figure className={s.figura}>
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
          <figcaption className={s.legenda}>
            O consultório, no Centro de Nova Iguaçu.
          </figcaption>
        </figure>
      </div>
    </Secao>
  );
}
