/**
 * Gera o OG e os icones a partir de HTML, com o Chrome.
 *
 * ========================== POR QUE UM SCRIPT, E NAO ARTE ===================
 * Porque estas imagens repetem dados que ja existem em `lib/dados.ts` -- nome,
 * titulo, CRP, cidade. Feitas a mao, elas envelhecem em silencio: no dia em que
 * o CRP ou a sala mudar, o site muda e a imagem que aparece no WhatsApp
 * continua dizendo a coisa antiga, e ninguem percebe porque ninguem olha um OG
 * depois de publicar.
 *
 * Aqui elas saem das MESMAS constantes e das mesmas fontes do site.
 *
 * COMO RODAR:  node scripts/gerar-imagens.mjs
 */
import { spawn } from 'node:child_process';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const RAIZ = resolve(import.meta.dirname, '..');

// Sai do dados.ts pra nao existir uma segunda copia destes textos.
const fonte = readFileSync(resolve(RAIZ, 'lib/dados.ts'), 'utf8');
const pega = (chave) =>
  fonte.match(new RegExp(`${chave}:\\s*'([^']+)'`))?.[1] ?? '';

const NOME = pega('nome');
const TITULO = pega('titulo');
const CRP = pega('crp');

// As cores vivem em globals.css. Mesma razao: uma fonte de verdade.
const css = readFileSync(resolve(RAIZ, 'app/globals.css'), 'utf8');
const cor = (nome) =>
  css.match(new RegExp(`--${nome}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? '#000';

const GRAFITE = cor('grafite');
const TIARA = cor('tiara');
const CREME = cor('creme-texto');
const BRONZE = cor('bronze-claro');

const FONTES =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600&' +
  'family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">';

/*
 * O retrato entra como data URI, e nao como file:///.
 *
 * A pagina do cartao e carregada por `data:text/html`, e uma pagina dessas tem
 * ORIGEM OPACA: ela nao consegue buscar file://. A primeira versao rodou, o
 * Chrome nao reclamou de nada, e o OG saiu com o icone de imagem quebrada no
 * lugar da foto. Embutido, nao ha o que buscar.
 */
const RETRATO =
  'data:image/webp;base64,' +
  readFileSync(resolve(RAIZ, 'public/img/alexander-barnabes-retrato.webp')).toString('base64');

/* ============================== O CARTAO DO OG ==============================
 * O anterior trazia o nome COMPLETO em caixa alta e a palavra "PSICANALISTA"
 * sozinha embaixo -- e logo abaixo dizia "Psicologo e Psicanalista". Duas
 * versoes do mesmo cargo na mesma imagem, e um nome que o site inteiro nao usa.
 *
 * Aqui e o nome de marca, o cargo uma vez so, e a informacao que decide o
 * clique de quem ve o link num grupo de WhatsApp: a cidade.
 * ========================================================================= */
const og = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${FONTES}
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; display: flex; background: ${GRAFITE};
         font-family: 'Source Sans 3', sans-serif; overflow: hidden; }
  .foto { width: 52%; height: 100%; object-fit: cover; object-position: 50% 22%; }
  .lado { flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: 0 58px; position: relative; }
  /* O mesmo psi de marca d'agua do site, aqui atras do texto. */
  /* Recuada e mais fraca que na primeira tentativa: a 0.05 e encostada no
     texto ela disputava com o nome, que e a unica coisa que precisa ser lida
     num quadrado de 1200px que aparece do tamanho de um selo no WhatsApp. */
  .psi { position: absolute; right: -150px; bottom: -110px;
         font-family: 'Newsreader', serif; font-size: 480px; line-height: .78;
         color: ${CREME}; opacity: .035; }
  .conteudo { position: relative; z-index: 1; }
  .marca { font-family: 'Newsreader', serif; font-size: 74px; color: ${TIARA};
           line-height: 1; margin-bottom: 26px; }
  h1 { font-family: 'Newsreader', serif; font-weight: 500; font-size: 58px;
       line-height: 1.06; color: ${CREME}; letter-spacing: -.01em; }
  .cargo { display: flex; align-items: center; gap: 14px; margin-top: 18px;
           font-family: 'Newsreader', serif; font-style: italic; font-size: 29px;
           color: ${BRONZE}; }
  .cargo::before { content: ''; width: 34px; height: 2px; background: ${TIARA}; flex: none; }
  .regra { width: 92px; height: 1px; background: ${TIARA}; opacity: .5; margin: 34px 0; }
  .lugar { font-size: 26px; color: ${CREME}; line-height: 1.45; }
  .lugar b { color: ${TIARA}; font-weight: 600; }
  .crp { margin-top: 10px; font-size: 21px; letter-spacing: .12em;
         text-transform: uppercase; color: ${BRONZE}; font-weight: 600; }
</style></head><body>
  <img class="foto" src="${RETRATO}" alt="">
  <div class="lado">
    <div class="psi">Ψ</div>
    <div class="conteudo">
      <div class="marca">Ψ</div>
      <h1>${NOME}</h1>
      <p class="cargo">${TITULO}</p>
      <div class="regra"></div>
      <p class="lugar"><b>Nova Iguaçu, RJ</b><br>Atendimento presencial e online</p>
      <p class="crp">${CRP}</p>
    </div>
  </div>
</body></html>`;

/* ================================ O ICONE ==================================
 * O anterior tinha o psi pequeno no meio de muita margem e um filete embaixo.
 * A 512px ficava elegante; a 32px, que e onde favicon vive de verdade, sobrava
 * um borrao com um risco solto do lado.
 *
 * Aqui o glifo OCUPA o quadrado e o filete sai. Tudo que nao for a forma
 * principal vira sujeira no tamanho em que a coisa e realmente vista.
 * ========================================================================= */
const icone = (lado) => `<!doctype html><html><head><meta charset="utf-8">${FONTES}
<style>
  * { margin: 0; padding: 0; }
  body { width: ${lado}px; height: ${lado}px; background: ${GRAFITE};
         display: flex; align-items: center; justify-content: center; overflow: hidden; }
  /* 0.92 do lado, e o deslocamento otico MEDIDO, nao chutado.
     Na primeira tentativa usei 0.045 e o glifo saiu alto: medido no PNG de
     512, a tinta ia de y=68 a y=388, centro em 228 contra 256 da caixa -- 28px
     acima. Somados aos 23 que ja estavam la, da 51/512. Fonte tem descida na
     caixa que o desenho nao usa, e centrar pela caixa nunca centra a tinta. */
  span { font-family: 'Newsreader', serif; font-weight: 600;
         font-size: ${lado * 0.92}px; line-height: 1; color: ${TIARA};
         transform: translateY(${lado * 0.1}px); }
</style></head><body><span>Ψ</span></body></html>`;

// ---------------------------------------------------------------------------

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => existsSync(p));

const PORTA = 9399;
const navegador = spawn(
  CHROME,
  ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORTA}`,
   `--user-data-dir=${process.env.TEMP}/cr-imagens`, 'about:blank'],
  { stdio: 'ignore' },
);
const fim = (c) => { try { navegador.kill(); } catch {} process.exit(c); };
setTimeout(() => { console.log('tempo esgotado'); fim(1); }, 120000);

await new Promise((r) => setTimeout(r, 2500));
const alvo = (await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json())
  .find((t) => t.type === 'page');
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
let id = 0;
const pend = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (pend.has(m.id)) pend.get(m.id)(m);
});
await new Promise((r) => ws.addEventListener('open', r));
const cmd = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

async function render(html, largura, altura, saida, formato) {
  await cmd('Emulation.setDeviceMetricsOverride',
    { width: largura, height: altura, deviceScaleFactor: 1, mobile: false });
  await cmd('Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(html) });
  // Espera a fonte do Google chegar. Sem isto o primeiro quadro sai em serifa
  // do sistema e o psi fica com outro desenho.
  await new Promise((r) => setTimeout(r, 2600));
  const p = formato === 'jpeg' ? { format: 'jpeg', quality: 90 } : { format: 'png' };
  const tiro = await cmd('Page.captureScreenshot', p);
  writeFileSync(resolve(RAIZ, 'public', saida), Buffer.from(tiro.result.data, 'base64'));
  console.log(`  ${saida}  ${largura}x${altura}`);
}

await render(og, 1200, 630, 'og-image.jpg', 'jpeg');
await render(icone(512), 512, 512, 'icon-512.png', 'png');
await render(icone(180), 180, 180, 'apple-touch-icon.png', 'png');
await render(icone(32), 32, 32, 'favicon-32.png', 'png');

ws.close();
fim(0);
