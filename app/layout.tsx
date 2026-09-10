import type { Metadata, Viewport } from 'next';
import { Newsreader, Source_Sans_3 } from 'next/font/google';
import {
  SITE_URL,
  atendimento,
  endereco,
  profissional,
} from '@/lib/dados';
import './globals.css';

// Newsreader foi desenhada para leitura longa e conversa com a serifa
// classica do logo dele. Source Sans 3 e humanista e abre bem em 17px no
// celular, que e onde a maioria vai ler.
const titulo = Newsreader({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fonte-titulo',
});

const corpo = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--fonte-corpo',
});

const descricao =
  'Alexander Barnabés, psicólogo e psicanalista em Nova Iguaçu, RJ. ' +
  'Atendimento individual, de casal e familiar, presencial no Centro e online. ' +
  'CRP 05/55353.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Psicólogo em Nova Iguaçu | Alexander Barnabés, Psicanalista | CRP 05/55353',
    template: '%s | Alexander Barnabés',
  },
  description: descricao,
  keywords: [
    'psicólogo em Nova Iguaçu',
    'psicanalista em Nova Iguaçu',
    'psicólogo Baixada Fluminense',
    'terapia de casal Nova Iguaçu',
    'psicoterapia breve',
    // As duas entraram com o conteudo novo de 09/09/2026. Ambas descrevem o
    // que a pagina passou a dizer -- e so isso: palavra-chave que promete o
    // que o texto nao entrega derruba a pagina em vez de levantar.
    'psicólogo álcool e outras drogas Nova Iguaçu',
    'coaching de relacionamentos',
    'Alexander Barnabés',
  ],
  authors: [{ name: profissional.nomeCompleto }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: `${profissional.nome}, ${profissional.titulo}`,
    title: 'Psicólogo e Psicanalista em Nova Iguaçu | Alexander Barnabés',
    description: descricao,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt:
          'Alexander Barnabés sentado em um sofá, de blazer claro, ao lado do ' +
          'símbolo Ψ dourado e do seu nome.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psicólogo e Psicanalista em Nova Iguaçu | Alexander Barnabés',
    description: descricao,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#262626',
};

// JSON-LD do tipo Psychologist. E o que faz o Google entender que existe um
// profissional de saude atendendo nesta rua, nesta cidade, neste horario.
const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'Psychologist',
  '@id': `${SITE_URL}/#psicologo`,
  name: profissional.nomeCompleto,
  alternateName: profissional.nome,
  description: descricao,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: profissional.telefoneE164,
  email: profissional.email,
  priceRange: '$$',
  medicalSpecialty: 'Psychiatric',
  knowsLanguage: 'pt-BR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: endereco.logradouro,
    addressLocality: endereco.cidade,
    addressRegion: endereco.estado,
    postalCode: endereco.cep,
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Nova Iguaçu' },
    { '@type': 'AdministrativeArea', name: 'Baixada Fluminense' },
    { '@type': 'AdministrativeArea', name: 'Rio de Janeiro' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
  /*
   * As quatro primeiras sao abordagens e formatos clinicos, e por isso sao
   * MedicalTherapy. As tres ultimas entraram em 09/09/2026 junto com o
   * conteudo novo.
   *
   * O atendimento em alcool e outras drogas e clinico e fica como
   * MedicalTherapy. Coaching e consultoria NAO SAO: sao Service comum, e
   * declarar os dois como terapia diria ao Google uma coisa que o proprio site
   * toma o cuidado de nao dizer ao leitor.
   */
  availableService: [
    { '@type': 'MedicalTherapy', name: 'Psicanálise' },
    { '@type': 'MedicalTherapy', name: 'Psicoterapia breve' },
    { '@type': 'MedicalTherapy', name: 'Terapia de casal' },
    { '@type': 'MedicalTherapy', name: 'Terapia familiar' },
    {
      '@type': 'MedicalTherapy',
      name: 'Atendimento em álcool e outras drogas',
    },
    { '@type': 'Service', name: 'Coaching de relacionamentos' },
    { '@type': 'Service', name: 'Consultorias' },
  ],
  sameAs: [profissional.instagram],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Registro profissional',
    name: profissional.crp,
  },
  additionalProperty: {
    '@type': 'PropertyValue',
    name: 'Modalidade de atendimento',
    value: atendimento.modalidades,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${corpo.variable}`}>
      <body>
        <a className="pular" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          // O objeto e montado aqui no servidor, a partir de constantes do
          // proprio projeto. Nao entra nada vindo do usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </body>
    </html>
  );
}
