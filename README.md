<div align="center">

<img src="src/ui/assets/pokeidle-logo-smooth.png" width="320" alt="PokeIdle IO">
<br>
<img src="src/ui/assets/rebosteio-logo.png" width="240" alt="PIO Rebosteio">

# PIO Rebosteio — Launcher Multi-Contas

**Trainer Workspace de alta densidade e multi-contas para Poke Idle IO.**

![Plataforma](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-43-47848F?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Auto--Setup%20%7C%20LTS-339933?style=flat-square)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=flat-square)](LICENSE)

[English](README.en.md) · [Manual](MANUAL.md) · [FAQ](FAQ.md) · [Tutorial](TUTORIAL.md) · [Mudanças](CHANGELOG.md)

</div>

> Esta é a versão que roda a partir do código-fonte. Não há executáveis proprietários ou opacos: você tem acesso total ao código, audita o que ele faz e roda diretamente na sua máquina com total transparência e segurança.

> 🔰 **Nunca mexeu com isso?** Não se preocupe! O inicializador `Abrir Poke Idle IO.bat` baixa tudo o que você precisa sozinho. Veja também nosso passo a passo em: **[TUTORIAL.md](TUTORIAL.md)**.

> ### 🔒 Seus dados de login ficam apenas no seu computador
> Login e senha são criptografados localmente pelo próprio sistema operacional (via `safeStorage` do Electron / DPAPI no Windows) e nunca trafegam para nenhum servidor ou repositório.

---

## O que é

O **PIO Rebosteio** é uma central operacional moderna projetada para gerenciar e monitorar de **1 a 4 contas simultâneas** de **Poke Idle IO** em uma única interface inteligente. Cada conta roda isolada em sua própria partição de sandbox do Electron (`persist:conta1` até `conta4`), mantendo cookies, sessões, cache e configurações completamente independentes.

O launcher se adapta à quantidade de contas que você usa: se tiver 1 conta cadastrada, abre apenas 1 janela ampla em tela cheia; se tiver 2 contas, organiza 2 janelas lado a lado; e se tiver 3 ou 4, expande a grade harmoniosamente. Se a conexão cair durante a caçada ou após manutenção dos servidores do jogo, o assistente reloga e reconecta automaticamente suas contas.

---

## Recursos Principais

### 🎮 Operação & Multi-Contas Dinâmico
* **Layout Dinâmico (1 a 4 contas)**: O aplicativo abre exatamente a quantidade de janelas correspondente às contas preenchidas no menu de Treinadores (1 conta = 1 janela cheia, 2 contas = 2 janelas lado a lado, até 4 contas).
* **Partições Isoladas**: Sandbox individual para cada conta (`persist:conta1` a `conta4`), sem vazamento de cookies ou sessões.
* **▶ Logar Equipe**: Autentica todas as contas desconectadas de uma só vez, preservando as que já estiverem farmando ativamente.
* **🦊 Autenticação com Camoufox**: Solucionador inteligente integrado em segundo plano para desafios do Cloudflare Turnstile, garantindo logins suaves e sem travamentos.
* **Auto-Reconexão Resiliente**: Recupera quedas temporárias de rede e reconecta após manutenções automaticamente.

### 🎯 Ferramentas Operacionais
* **🎯 Despachar Contas (Hunt Dispatcher)**: Selecione contas individuais ou a equipe inteira e envie para qualquer hunt do jogo com filtros ágeis de área e nível.
* **📦 Auto Supply**: Monitoramento contínuo de Pokébolas e Poções com reposição automática e verificação inteligente de saldo em ouro para evitar gastos excessivos.
* **💰 Venda Automática (Auto Sell Loot)**: Vende o loot acumulado das caçadas no servidor para manter a mochila desobstruída e maximizar o rendimento de Gold por hora.
* **◎ Hunt Analyzer**: Leitura em tempo real de estatísticas de combate, EXP/h, Gold/h, kills/h, contagem de shinies encontrados/capturados e tempo em caça.
* **👤 Menu de Treinadores**: Gerenciador simplificado de contas com limpeza de credenciais, limpeza de dados de partição e suporte a proxies dedicados por família.

### 🎨 Temas & Identidade Visual Rebosteio
* **12 Paletas de Estilo**: Absol Midnight, Creme Baunilha, Branco Puro, Branco Gelo, Chá Verde, Cinza Ardósia, Âmbar Crepúsculo, Oceano Profundo, Névoa Lavanda, Bruma Carmim, Floresta Esmeralda e Eclipse Ônix.
* **Ambientações & Biomas Pokémon**: Artes exclusivas e panoramas dedicados para Pokémon temáticos como Gengar, Mewtwo, Meganium, Alakazam, Banette, Arcanine, Umbreon, Espeon, Corsola, Eevee, Charizard e Rayquaza.

### 🍃 Economia & Desempenho
* **Modo Eco Automático**: Limita laços de animação (`requestAnimationFrame`), mantendo estabilidade térmica e consumo baixo em longas maratonas.
* **Interface Limpa (Clean HUD)**: Oculta elementos visuais dispensáveis do mapa, revelando controles apenas ao passar o mouse.
* **Minimizar para a Bandeja**: Envie para a barra de tarefas ou bandeja do Windows (Tray) mantendo o farm ativo no servidor com impacto mínimo na máquina.
* **Prevenção de Suspensão (Awake)**: Evita que o computador entre em modo de suspensão durante caçadas noturnas.

---

## Como Rodar

### No Windows (Instalação 1-Clique)
1. Baixe o projeto pelo botão verde **Code → Download ZIP** (ou clone via Git) e extraia para onde preferir.
2. Dê dois cliques em **`Abrir Poke Idle IO.bat`**.
3. **Pronto!** O inicializador verificará se o Node.js está presente. Se você não tiver o Node instalado, **ele baixará a versão oficial portátil LTS automaticamente**, instalará as dependências do Electron e abrirá o jogo direto.
4. *(Opcional)* Clique com o botão direito em `Abrir Poke Idle IO.bat` e selecione **Enviar para → Área de trabalho (criar atalho)**.

### No Linux ou macOS
Abra o terminal na pasta do projeto e execute:

```bash
bash iniciar.sh
```

Ou diretamente via Node/NPM:

```bash
npm install
npm start
```

---

## Documentação Completa

| Documento | Conteúdo |
|---|---|
| **[Manual](MANUAL.md)** | Explicação detalhada de todos os botões, menus e atalhos da interface |
| **[FAQ](FAQ.md)** | Perguntas frequentes, dicas de performance, proxies e resolução de dúvidas |
| **[Tutorial](TUTORIAL.md)** | Passo a passo ilustrado para quem nunca utilizou o aplicativo |
| **[Mudanças](CHANGELOG.md)** | Histórico de novidades e atualizações de cada versão |

---

## Segurança e Integridade

1. **Criptografia Local**: Credenciais salvas no formulário de Treinadores são protegidas pela API DPAPI nativa do Windows através do `safeStorage` do Electron.
2. **Sandbox Fechado**: Webviews rodam isoladas, restringindo navegação exclusivamente aos domínios oficiais do jogo (`pokeidle.io` e `poke.idleworld.online`).
3. **Privacidade**: O launcher não coleta dados de usuário, não possui telemetria invasiva e não possui servidores intermediários.

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.  
*Este é um projeto independente de código aberto desenvolvido pela comunidade e não possui afiliação oficial com a equipe do Poke Idle IO.*
