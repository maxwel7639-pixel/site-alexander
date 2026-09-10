# Site do Alexander Barnabés

Site institucional de Alexander Barnabés, psicólogo e psicanalista em Nova
Iguaçu, Rio de Janeiro. CRP 05/55353.

O objetivo do site é reunir num endereço só o trabalho que hoje está espalhado
em posts do Instagram, e aparecer para quem pesquisa "psicólogo em Nova Iguaçu".
A conversão é uma só: o botão de WhatsApp.

## Como rodar

```
npm install
npm run dev
```

O build de produção sai estático inteiro, sem função de servidor.

```
npm run build
```

## Stack

Next.js com App Router, TypeScript e CSS Modules. Sem Tailwind e sem biblioteca
de componentes. Imagens pelo `next/image`. Fontes pelo `next/font`, servidas do
próprio domínio.

## Onde mexer no conteúdo

Todo o texto, os dados de contato, o endereço, os temas, os depoimentos e as
qualificações estão em `lib/dados.ts`. Nenhum componente tem texto de conteúdo
escrito dentro dele, com exceção dos parágrafos da seção "como ele trabalha",
que estão marcados com TODO à espera do texto que o Alexander vai escrever.

## Identidade visual

A paleta é a que o próprio Alexander escolheu no aplicativo da Coral: Tiara,
Palha, Bronze Palm Springs e Folha de Mate, mais o grafite do logo dele. Os
tokens estão em `app/globals.css`, com a razão de contraste anotada em cada um.

Dois deles foram corrigidos em 09/09/2026, contra os pixels de
`public/marca/logo-psi.jpg` e da amostra que ele mandou:

- **Tiara** era `#c9a227` e passou a ser `#bf9a70`, que é o dourado do Ψ do
  logo dele medido no arquivo. Os dois ouros lado a lado na mesma página liam
  como erro de impressão.
- **Folha de Mate** era `#5e5f43`, um oliva escuro, e passou a ser `#c0b8a0`,
  o cáqui claro da amostra. O token não tinha um único uso no projeto; agora é
  o fundo da seção de serviços.

O ouro Tiara tem um papel só no site: marcar o que é clicável.

`scripts/gerar-imagens.mjs` lê o Tiara e o grafite direto do CSS para pintar o
`og-image.jpg` e os favicons. Mexeu na cor, roda o script.

A marca dele tem duas metades e as duas estão no site: o **Ψ**, que é a marca
d'água atrás de todas as seções, e o **divã** do cartão de visita
(`public/marca/diva.png`), que aparece ao lado do nome no cabeçalho e no
rodapé. O cartão inteiro (`cartao-diva.jpg`) fica no repositório só como
referência e **não entra na página**: tem e-mail, telefone e endereço queimados
na imagem.

### A largura de 1120px

O cabeçalho mostra a navegação e o botão de WhatsApp a partir de 1120px; abaixo
disso quem carrega o botão é a barra fixa do rodapé. Um dos dois aparece por
vez, e o número vive em três arquivos — `Cabecalho.module.css`,
`BarraFixa.module.css` e o `padding-bottom` do `Rodape.module.css`. Mudar um só
deixa a tela sem nenhum botão ou com dois.

Tipografia: Newsreader nos títulos e Source Sans 3 no corpo. O corpo nunca fica
abaixo de 17px, porque parte do público lê no celular com a vista cansada.

## Pendências com o cliente

Estão marcadas como TODO no código, todas em `lib/dados.ts`:

1. **O número da sala.** O material dele traz três versões. O cartão impresso e
   o contrato dizem Sala 605, um post diz sala 704 e o post "onde estamos" não
   traz sala nenhuma. O site publica só a rua até ele confirmar, porque endereço
   errado manda paciente para a porta errada.
2. **A lista de qualificações.** Ele tem dois cards com listas que não batem.
   Um traz Teólogo, Coaching e PNL, o outro traz Hipnólogo. O site publica
   apenas o que aparece nas duas, para não criar uma terceira versão.
3. **O parágrafo dele.** Ele ainda não escreveu o texto sobre quem é e como
   trabalha. A seção está estruturada e o texto atual descreve apenas o que o
   material dele já afirma.
4. **A foto do Certificado de Qualidade 2025.** O arquivo que veio com esse nome
   é, na verdade, a foto do verso do cartão de visita. O certificado é citado no
   texto, mas não há imagem dele.
5. **O período no CAPS-AD.** Ele mandou o nome do serviço e o lugar, e não os
   anos. O site diz "atuou", que é passado sem fingir precisão.
6. **As frases de coaching e consultoria.** Ele mandou os dois nomes e mais
   nada. As frases publicadas descrevem só o que os dois termos significam, e
   não prometem resultado, preço nem duração.

## Regras que não podem ser quebradas

O Conselho Federal de Psicologia veda promessa de resultado. Não pode entrar no
site nenhuma variação de "cura", "garantimos", "em X sessões você",
"resultados rápidos", "transforme sua vida" ou número de eficácia. Também não
entra caso clínico, nem anonimizado.

## Deploy

Vercel. O projeto precisa se chamar `site-alexander`, com hífen. Projeto com
ponto no nome fica sem o domínio `.vercel.app`, e o site sobe sem endereço.

Todo commit sai com a autoria `maxwel7639@gmail.com`. Commit com outro e-mail
volta BLOCKED da Vercel, sem dizer o motivo.
