import { profissional } from '@/lib/dados';
import LivroPsi from './LivroPsi';
import BotaoWhatsApp from './BotaoWhatsApp';
import Secao from './Secao';
import { IconeEmail, IconeInstagram } from './Icones';
import s from './Contato.module.css';

export default function Contato() {
  return (
    <Secao
      id="contato"
      // O livro aberto com o Ψ, no canto onde era o traço em arco. Pedido do
      // Maxwel em 13/09/2026: primeiro subiu o divã do rodapé pra cá, depois
      // ele trocou por este desenho.
      desenho={<LivroPsi />}
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
