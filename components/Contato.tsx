import Image from 'next/image';
import { marca, profissional } from '@/lib/dados';
import BotaoWhatsApp from './BotaoWhatsApp';
import Secao from './Secao';
import { IconeEmail, IconeInstagram } from './Icones';
import s from './Contato.module.css';

export default function Contato() {
  return (
    <Secao
      id="contato"
      // O divã do cartão dele, no lugar do traço em arco desde 13/09/2026: saiu
      // do rodapé, onde ficava pequeno embaixo do nome, e subiu pra cá. A
      // tinta dele (#9d9876) dá 5,18:1 sobre o grafite, então vai sem véu.
      desenho={
        <Image
          src={marca.diva.src}
          alt=""
          width={marca.diva.largura}
          height={marca.diva.altura}
          sizes="300px"
        />
      }
      etiqueta="Contato"
      titulo="Dar o primeiro passo é só mandar uma mensagem"
      fundo="escuro"
    >
      <p className={s.introducao}>
        Não precisa saber explicar direito o que está sentindo. É só escrever, e
        a conversa começa por aí.
      </p>

      <BotaoWhatsApp className={s.principal}>
        {profissional.telefone} no WhatsApp
      </BotaoWhatsApp>

      <ul className={s.secundarios}>
        <li>
          <a
            href={profissional.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
          >
            <IconeInstagram className={s.icone} />
            <span>{profissional.instagramHandle}</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${profissional.email}`} className={s.link}>
            <IconeEmail className={s.icone} />
            <span>{profissional.email}</span>
          </a>
        </li>
      </ul>
    </Secao>
  );
}
