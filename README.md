<div align="center">

<img src="src/ui/assets/pokeidle-logo-smooth.png" width="320" alt="PokeIdle">
<br>
<img src="src/ui/assets/nailo-logo.png" width="210" alt="by Nailo">

# PIO Rebosteio — Pokemon Theme Based Launcher

**Trainer Workspace de alta densidade e multi-contas para Poke Idle World.**

![Plataforma](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-43-47848F?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A522.12-339933?style=flat-square)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=flat-square)](LICENSE)

[English](README.en.md) · [Manual](MANUAL.md) · [FAQ](FAQ.md) · [Tutorial](TUTORIAL.md) · [Mudanças](CHANGELOG.md)

</div>

> Esta é a versão que roda a partir do código-fonte. Não há executáveis proprietários ou opacos: você tem acesso total ao código, audita o que ele faz e roda diretamente na sua máquina com total transparência e segurança.

> 🔰 **Nunca mexeu com isso?** Veja nosso guia passo a passo ilustrado: **[TUTORIAL.md](TUTORIAL.md)** (ou abra o arquivo `COMO USAR.txt` na pasta raiz).

> ### 🔒 Seus dados de login ficam apenas no seu computador
> Login e senha são criptografados localmente pelo próprio sistema operacional (via `safeStorage` do Electron / DPAPI no Windows) e nunca trafegam para nenhum servidor ou repositório.

---

## O que é

O **PIO Nailo (Absol Launcher)** é uma central operacional para gerenciar e monitorar até **quatro contas simultâneas** de Poke Idle World em uma única janela. Cada conta roda isolada em sua própria partição de sandbox do Electron (`persist:conta1` até `conta4`), mantendo cookies, sessões e configurações individuais.

Se a conexão cair durante a caçada ou após uma manutenção do jogo, o assistente reloga automaticamente com as credenciais salvas sem necessidade de intervenção manual. O launcher respeita as regras do jogo: não joga por você, não automatiza caças e não resolve captchas — apenas fornece uma interface unificada, métricas consolidadas e recursos de qualidade de vida.

---

## Recursos Principais

### 🎮 Operação e Conectividade
* **Multi-Contas Isoladas**: Gerencie de 1 a 4 contas com partições limpas e isoladas.
* **▶ Logar Equipe**: Loga todas as contas desconectadas de uma só vez, preservando as contas que já estiverem farmando.
* **Auto-Reconexão**: Recupera sessões expiradas ou quedas de conexão automaticamente.
* **Bandeja e Janela Oculta**: Minimize para a bandeja do sistema (Tray) com consumo mínimo de recursos.
* **Atalhos Rápidos**: Atalhos de teclado dedicados para cada ferramenta operacional.

### 🍃 Economia e Desempenho
* **Modo Simples**: Pausa a renderização gráfica 3D/2D do mapa (caindo para 1 FPS de telemetria) e apresenta apenas números, drops, metas e inventário, liberando até 80% de CPU.
* **Modo Eco Automático**: Limita laços desnecessários de animação (`requestAnimationFrame`) mantendo estabilidade térmica para longas horas de caçada.
* **Otimização em Segundo Plano**: Ao minimizar ou fechar para a bandeja, os jogos entram automaticamente em modo leve sem interromper o farm no servidor.

### 🎨 Temas e Identidade Visual Absol
* **Absol Midnight (Padrão)**: Interface atmosférica em tons de noite, azul profundo e prata, com panorama e arte de cutout dedicados.
* **12 Paletas de Estilo**: Absol Midnight, Creme Baunilha, Branco Puro, Branco Gelo, Chá Verde, Cinza Ardósia, Âmbar Crepúsculo, Oceano Profundo, Névoa Lavanda, Bruma Carmim, Floresta Esmeralda e Eclipse Ônix.
* **Temas Exclusivos Integrados**: Artes exclusivas e ambientações para Pokémon como Gengar, Mewtwo, Meganium, Alakazam, Banette, Arcanine, Umbreon, Espeon, Corsola, Eevee, Charizard e Rayquaza, além de suporte a biomas dinâmicos.

### 📊 Ferramentas e Análises
* **🏆 Tierlist Analítica**: Avaliação em tempo real de todas as espécies por **XP/h** ou **Gold/h** (loot calculado a preço de NPC), com filtros de nível, qualidade, IVs e suporte a TMs elementais e AoE.
* **✨ Calculadora de Ditto**: Recomendações precisas de melhores hunts e transformações ideais para Ditto Comum e Shiny Ditto.
* **📐 Calculadora de IVs**: Integração com JustPokédex para leitura rápida ao passar o mouse sobre o Pokémon.
* **🎒 Auto-Supply Offline**: Monitoramento e abastecimento de pokébolas e poções com sprites offline empacotados localmente.
* **🛡 Venda Protegida**: Cadeado de segurança para evitar venda acidental de shinies, itens raros ou Pokémon valiosos.
* **🔔 Alertas Inteligentes**: Notificações no Windows e webhooks para Discord quando shinies aparecem, suprimentos acabam ou sessões caem.

---

## Como Rodar

### Pré-requisito
Você precisa ter o **Node.js** (versão LTS recomendada: 22.12 ou superior) instalado em seu computador.
Baixe gratuitamente em: **[nodejs.org](https://nodejs.org)**

### No Windows
1. Baixe o código pelo botão verde **Code → Download ZIP** e extraia a pasta onde preferir.
2. Dê dois cliques em **`Abrir Poke Idle IO.bat`**.
3. Na primeira execução, ele verificará o ambiente, instalará as dependências necessárias e abrirá a janela do launcher automaticamente.
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
| **[Manual](MANUAL.md)** | Explicação detalhada de todos os botões, seções e recursos da interface |
| **[FAQ](FAQ.md)** | Perguntas frequentes, dicas de performance, migração e resolução de dúvidas |
| **[Tutorial](TUTORIAL.md)** | Passo a passo didático para quem nunca utilizou apps via código |
| **[Mudanças](CHANGELOG.md)** | Histórico de novidades e correções de cada versão |

---

## Segurança e Integridade

1. **Criptografia Local**: Credenciais salvas no formulário de Treinadores são protegidas pela API DPAPI nativa do Windows através do `safeStorage` do Electron.
2. **Sandbox Fechado**: Webviews rodam isoladas, restringindo navegação exclusivamente aos domínios oficiais do jogo (`pokeidle.io` e `poke.idleworld.online`).
3. **Privacidade**: O launcher não coleta dados de usuário, não possui telemetria de marketing e não possui servidores intermediários.

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.  
*Este é um projeto independente de código aberto desenvolvido pela comunidade e não possui afiliação oficial com a equipe do Poke Idle World.*
