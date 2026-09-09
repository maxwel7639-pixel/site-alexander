// Conteudo real do Alexander, levantado em 08/09/2026 a partir do material
// que ele mandou. Nada aqui e inventado. O que falta esta marcado com TODO.

/*
 * ================= ESTE ENDERECO NAO E COSMETICO ==========================
 * Ele manda no canonical, no og:image, no @id e no `url` do JSON-LD, no
 * sitemap.xml e na linha de Sitemap do robots.txt. Errado, todos apontam pro
 * lugar errado ao mesmo tempo.
 *
 * E estava errado. Ate 09/09/2026 ele dizia `site-alexander.vercel.app`, que
 * NAO E DESTE PROJETO: aquele subdominio ja pertence a outra conta da Vercel e
 * serve um curso de edicao de video. O nome estava tomado, entao a Vercel deu
 * a este projeto o sufixo `-mu`.
 *
 * O estrago, medido: /og-image.jpg naquele dominio devolvia 404, ou seja
 * nenhum link deste site abria com imagem no WhatsApp; e o canonical, o @id e
 * o sitemap declaravam ao Google um dominio de terceiro.
 *
 * PENDENTE: dominio proprio. `.vercel.app` num site de profissional de saude
 * e fraco pra confianca e pra busca local, e o dia em que ele comprar um, esta
 * linha e a unica que muda.
 * ========================================================================== */
export const SITE_URL = 'https://site-alexander-mu.vercel.app';

export const profissional = {
  nome: 'Alexander Barnabés',
  nomeCompleto: 'Alexander de Paula Barnabés',
  titulo: 'Psicólogo e Psicanalista',
  crp: 'CRP 05/55353',
  telefone: '(21) 96498-3557',
  telefoneE164: '+5521964983557',
  email: 'drbarnabess@hotmail.com',
  instagram: 'https://instagram.com/psicologoalexanderbarnabes',
  instagramHandle: '@psicologoalexanderbarnabes',
};

const mensagemWhatsApp =
  'Oi, vim pelo site e gostaria de agendar uma consulta.';

export const whatsappUrl = `https://wa.me/5521964983557?text=${encodeURIComponent(
  mensagemWhatsApp,
)}`;

export const endereco = {
  // PENDENCIA: o numero da sala tem tres versoes no material dele.
  // Cartao de visita impresso e contrato MX-0908 dizem Sala 605.
  // Post de contato mais recente diz sala 704.
  // Post "onde estamos" nao traz sala nenhuma.
  // Decisao de 08/09/2026: publicar so a rua ate ele confirmar, porque
  // endereco errado manda paciente pra porta errada.
  // TODO: confirmar a sala com o Alexander e acrescentar aqui.
  logradouro: 'Rua Coronel Francisco Soares, 71',
  bairro: 'Centro',
  cidade: 'Nova Iguaçu',
  estado: 'RJ',
  cep: '26220-030',
  referencia: 'Prédio do Laboratório Dr. Emerson',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Francisco+Soares%2C+71%2C+Centro%2C+Nova+Igua%C3%A7u%2C+RJ%2C+26220-030',
};

export const atendimento = {
  horario: 'Segunda a sexta, das 7h às 19h',
  horarioCurto: '7h às 19h',
  modalidades: 'Presencial em Nova Iguaçu e online',
};

// Os temas vem dos posts que ele mesmo ja escreveu. Nenhum foi acrescentado.
export const temas = [
  {
    titulo: 'Ansiedade',
    texto:
      'Quando a preocupação passa a ocupar o dia inteiro e o corpo não desliga.',
  },
  {
    titulo: 'Depressão',
    texto:
      'Tristeza profunda que se prolonga, com perda de interesse pelo que antes dava prazer.',
  },
  {
    titulo: 'Relacionamentos',
    texto:
      'Conflitos que se repetem, frustração recorrente e distância de quem está perto.',
  },
  {
    titulo: 'Terapia de casal',
    texto:
      'Um espaço para os dois falarem e serem ouvidos, com alguém de fora mediando.',
  },
  {
    titulo: 'Procrastinação',
    texto:
      'Adiar o que precisa ser feito e conviver com a cobrança que vem depois.',
  },
  {
    titulo: 'Decisões difíceis',
    texto:
      'Momentos de escolha em que pensar junto com alguém ajuda a enxergar melhor.',
  },
  {
    titulo: 'Aprender a dizer não',
    texto:
      'Colocar limites sem se sentir culpado por isso.',
  },
];

// Os quatro sinais estao transcritos exatamente como ele publica no card dele.
export const sinais = [
  'Você não consegue superar uma tristeza',
  'Você está constantemente desanimado',
  'Você deseja tomar uma decisão importante',
  'Você está enfrentando dificuldades nos relacionamentos',
];

// PENDENCIA resolvida em 08/09/2026: ele tem dois cards com listas que nao
// batem. Um traz Teologo, Coaching e PNL, o outro traz Hipnologo. Publicamos
// apenas o que aparece nas DUAS listas, para nao criar uma terceira versao.
// TODO: quando ele disser qual lista vale, acrescentar os itens que faltam.
export const qualificacoes = [
  'Psicólogo',
  'Psicanalista',
  'Professor de Psicanálise',
  'Especializado em Psicoterapia Breve',
  'Técnico em Saúde Mental',
];

export const reconhecimentos = [
  {
    titulo: 'Moção de Congratulações e Aplausos',
    orgao: 'Câmara Municipal de Nova Iguaçu',
    detalhe:
      'Processo nº 881/2023, por indicação do vereador Maurício Morais Lopes.',
  },
  {
    titulo: 'Certificado de Qualidade 2025',
    orgao: 'Otimiza Pesquisas',
    detalhe:
      'Categoria Psicólogo e Psicanalista, Nova Iguaçu, Rio de Janeiro.',
    // TODO: o arquivo que veio nomeado como certificado e, na verdade, a foto
    // do verso do cartao de visita. Pedir ao Alexander a foto do certificado.
  },
];

// Comentarios publicos do perfil dele no Google, republicados por ele no
// Instagram. Transcritos sem alteracao. Publicacao autorizada em 08/09/2026.
export const depoimentos = [
  {
    nome: 'Niuan Lucas',
    texto:
      'Excelente profissional, super recomendo. Estava passando por um momento muito difícil e o psicólogo Alexander me acolheu e ajudou a resolver a situação.',
  },
  {
    nome: 'Francisco Xavier',
    texto:
      'Sou extremamente grato ao suporte que o dr. meu deu quando mais precisei. Foram meses difíceis e intensos de terapia, mas que eu pudesse entender e alcançar a paz. Gratidão eterna a esse grande homem.',
  },
];

export const navegacao = [
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#temas', label: 'Temas' },
  { href: '#formacao', label: 'Formação' },
  { href: '#local', label: 'Onde fica' },
  { href: '#contato', label: 'Contato' },
];
