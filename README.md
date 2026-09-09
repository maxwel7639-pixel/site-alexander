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

O ouro Tiara tem um papel só no site: marcar o que é clicável.

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
