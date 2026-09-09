import Abertura from '@/components/Abertura';
import BarraFixa from '@/components/BarraFixa';
import Cabecalho from '@/components/Cabecalho';
import ComoTrabalha from '@/components/ComoTrabalha';
import Contato from '@/components/Contato';
import Depoimentos from '@/components/Depoimentos';
import Formacao from '@/components/Formacao';
import Local from '@/components/Local';
import QuandoProcurar from '@/components/QuandoProcurar';
import Rodape from '@/components/Rodape';
import Temas from '@/components/Temas';

export default function Pagina() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <ComoTrabalha />
        <Temas />
        <QuandoProcurar />
        <Formacao />
        <Depoimentos />
        <Local />
        <Contato />
      </main>
      <Rodape />
      <BarraFixa />
    </>
  );
}
