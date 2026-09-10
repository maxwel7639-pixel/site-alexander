import Image from 'next/image';
import { atendimento, profissional, reconhecimentos } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import MarcaFundo from './MarcaFundo';
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
 */
export default function Abertura() {
  // O primeiro da lista e a Mocao da Camara. Ler do array em vez de escrever
  // aqui evita a copia que envelhece sozinha no dia em que o texto mudar.
  const principal = reconhecimentos[0];

  return (
    <section className={s.abertura} id="topo">
      {/*
        A mesma marca de todas as secoes. Ela nasceu aqui, com um psi so; virou
        componente quando passou a valer pro site inteiro.
      */}
      <MarcaFundo />

      <div className={s.interno}>
        <div className={s.texto}>
          <p className={s.registro}>{profissional.crp}</p>

          <h1 className={s.titulo}>{profissional.nome}</h1>

          <p className={s.papel}>{profissional.titulo}</p>

          <p className={s.linha}>
            Escuta para quem está passando por um momento difícil. Atendimento
            individual, de casal e familiar em Nova Iguaçu, no Centro, e também
            online.
          </p>

          <BotaoWhatsApp className={s.cta}>
            Agendar pelo WhatsApp
          </BotaoWhatsApp>

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

        {/*
          A moldura existe pra foto parar de ser um retangulo colado no fundo. E
          um passe-partout deslocado, desenhado com pseudo-elemento: a foto fica
          POSTA sobre a pagina em vez de impressa nela, e nao custa um byte de
          imagem.
        */}
        <div className={s.moldura}>
          <div className={s.foto}>
            <Image
              src="/img/alexander-barnabes-retrato.webp"
              alt={
                'Alexander Barnabés sentado em um sofá, de blazer branco e ' +
                'calça mostarda, com a mão no queixo, olhando para a câmera.'
              }
              width={1296}
              height={864}
              // `preload` substituiu o `priority`, depreciado no Next 16.
              preload
              sizes="(max-width: 899px) 100vw, 46vw"
              className={s.imagem}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
