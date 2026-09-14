import Image from 'next/image';
import { atendimento, profissional, reconhecimentos } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import { IconeLocal, IconeRelogio } from './Icones';
import s from './Abertura.module.css';

/**
 * A abertura.
 *
 * ======================== O QUE ESTAVA FALTANDO NELA ========================
 * A primeira versao dizia que existe um psicologo. Nao dizia POR QUE ESTE. Era
 * uma coluna de texto e um retangulo com uma foto, os dois do mesmo peso,
 * centrados um ao lado do outro num campo creme chapado: nada conduzia o olho
 * e nada respondia a segunda pergunta de quem chega.
 *
 * Quem cai aqui pesquisou "psicologo em Nova Iguacu", esta fragilizado e
 * desconfiado em partes iguais, e precisa de duas coisas na primeira tela:
 * entender que ele e real e registrado, e saber como falar com ele sem ligar.
 * A segunda ja estava resolvida pelo botao. A primeira nao: a Mocao da Camara
 * Municipal, que e o que separa ele de qualquer outro psicologo da cidade,
 * morava a quatro rolagens de distancia.
 *
 * Por isso a mudanca que mais pesa aqui nao e de forma, e de conteudo: um
 * reconhecimento sobe pra primeira tela. Ele entra como FATO, em uma linha,
 * sem selo e sem alarde -- vaidade em site de psicologo afasta, e o Conselho
 * tem razao em implicar com isso. O que a linha faz e responder "ele e de
 * verdade?" antes que a pessoa precise procurar a resposta.
 *
 * ========================== A IMAGEM DE FUNDO ================================
 * Desde 13/09/2026 a abertura tem de fundo a cabeça feita de fios, com uma
 * pessoa pequena olhando pra ela (pedido do Maxwel). A cabeça ocupa a
 * esquerda, então o texto mudou pro lado direito, no vazio da imagem, e a
 * frase de apresentação passou a conversar com ela: pensamentos embaraçados.
 *
 * No celular e em tela média a imagem vira uma faixa em cima e o texto vem
 * embaixo, no creme: sobre a imagem, numa coluna estreita, ele cairia em cima
 * da cabeça ou da pessoa.
 *
 * A marca d'água do Ψ saiu daqui: por cima da imagem ela só sujaria o desenho.
 */
export default function Abertura() {
  // O primeiro da lista e a Mocao da Camara. Ler do array em vez de escrever
  // aqui evita a copia que envelhece sozinha no dia em que o texto mudar.
  const principal = reconhecimentos[0];

  return (
    <section className={s.abertura} id="topo">
      <div className={s.imagem} aria-hidden="true">
        <Image
          src="/img/abertura-cabeca-de-fios.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className={s.foto}
        />
      </div>

      <div className={s.interno}>
        <div className={s.texto}>
          <p className={s.registro}>{profissional.crp}</p>

          <h1 className={s.titulo}>{profissional.nome}</h1>

          <p className={s.papel}>
            <span>{profissional.titulo}</span>
          </p>

          {/* Conversa com a imagem de fundo sem prometer resultado: a terapia
              é o lugar de olhar, não a garantia de desfazer. */}
          <p className={s.linha}>
            Quando os pensamentos se embaraçam, a terapia é um lugar para olhar
            para eles com calma. Atendimento individual, de casal e familiar,
            presencial em Nova Iguaçu e online.
          </p>

          <BotaoWhatsApp className={s.cta}>
            Agendar pelo WhatsApp
          </BotaoWhatsApp>
        </div>

        <div className={s.lado}>
          {/*
            Logo abaixo do botao, e nao acima: quem ja decidiu falar com ele nao
            precisa ser convencido de novo, e quem hesitou acabou de encontrar o
            motivo pra voltar ao botao.
          */}
          <p className={s.prova}>
            <span className={s.provaTitulo}>{principal.titulo}</span>
            <span className={s.provaOrgao}>{principal.orgao}</span>
          </p>

          <ul className={s.dados}>
            <li>
              <IconeLocal className={s.icone} />
              <span>Centro de Nova Iguaçu, e online</span>
            </li>
            <li>
              <IconeRelogio className={s.icone} />
              <span>{atendimento.horario}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
