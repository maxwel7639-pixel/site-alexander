import { whatsappUrl } from '@/lib/dados';
import { IconeWhatsApp } from './Icones';
import s from './BotaoWhatsApp.module.css';

type Props = {
  /** 'cheio' e o botao de ouro. 'contorno' e a versao para fundo escuro. */
  variante?: 'cheio' | 'contorno';
  children?: React.ReactNode;
  className?: string;
};

export default function BotaoWhatsApp({
  variante = 'cheio',
  children = 'Falar no WhatsApp',
  className,
}: Props) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[s.botao, s[variante], className].filter(Boolean).join(' ')}
    >
      <IconeWhatsApp className={s.icone} />
      <span>{children}</span>
    </a>
  );
}
