<div align="center">

<img src="src/ui/assets/rebosteio-by-nailo.png" width="240" alt="PIO Rebosteio by Nailo">

# FAQ — Perguntas Frequentes

**PIO Rebosteio · Launcher para Poke Idle IO**

</div>

---

## 🛠 Instalação e Atualização

### Atualizar o launcher apaga minhas configurações e contas salvas?
**Não.** Todos os seus dados de login, preferências e histórico ficam salvos no seu diretório de perfil local do usuário (`%APPDATA%\pionailo` ou `%APPDATA%\pokegrid`), completamente desacoplados da pasta do código. Você pode atualizar ou substituir os arquivos da pasta do projeto sem perder nada.

### Como faço backup das minhas configurações?
Basta copiar a pasta `%APPDATA%\pionailo` (ou `%APPDATA%\pokegrid`). As preferências, histórico e metas serão preservados. As senhas são criptografadas com chaves atreladas à sua conta do Windows (via DPAPI do Electron); portanto, ao migrar de computador físico, será necessário preencher as senhas novamente uma única vez no formulário de Treinadores.

### O Windows Defender ou navegador dizem que o app é "desconhecido" ou "vírus"
São avisos comuns de segurança do ecossistema Windows:
1. **"O Windows protegeu seu computador" (SmartScreen)**: É o aviso padrão para programas de código aberto sem certificado digital comercial pago (certificados corporativos custam milhares de reais anuais e este projeto é 100% gratuito e comunitário). Como o código é aberto, você pode auditá-lo diretamente. Para prosseguir: clique em **Mais informações** e depois em **Executar assim mesmo**.
2. **"Download não seguro / falso positivo"**: Scripts `.bat` ou executáveis de Electron que realizam downloads locais de pacotes podem ocasionalmente gerar alertas de heurística (falsos positivos). Os arquivos deste projeto têm taxa zero de detecção real em motores de verificação de integridade.

### No Linux o app avisa sobre sandbox do Chromium
Distribuições recentes (como Ubuntu 24.04+) limitam o namespace de usuário para o sandbox do Chromium. Se o Electron relatar erro de sandbox, aplique as permissões recomendadas ao `chrome-sandbox`:
```bash
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```
Ou, como último recurso:
```bash
npm start -- --no-sandbox
```

### O `Abrir Poke Idle IO.bat` abre e fecha rapidamente e a janela não aparece
Siga este diagnóstico passo a passo:
1. **Controle Inteligente de Aplicativos (Windows 11)**: Em **Segurança do Windows → Controle de aplicativos e do navegador**, se estiver configurado como "Ativado", ele bloqueia binários do Electron não assinados comercialmente.
2. **Versão do Node.js**: Abra o terminal ou CMD na pasta do launcher e execute `node -v`. O Electron 43 requer Node.js **22.12 ou superior**. Se sua versão for mais antiga, atualize a versão LTS em [nodejs.org](https://nodejs.org).
3. **Reinstalação limpa das dependências**: No terminal dentro da pasta, execute:
   ```bash
   npm install
   npm start
   ```
   Qualquer eventual mensagem de erro detalhada será exibida no console para fácil diagnóstico.

---

## 🎮 Operação e Uso Diário

### Onde vejo a melhor recomendação de hunt para o meu time?
Vá em **🍃 Simples → seção Hunts**. Ordene a lista por **Sugerido** e selecione em **"caçar com"** o Pokémon líder do seu time. Se você tiver um Ditto, a ferramenta indicará automaticamente qual a melhor transformação elemental para ele em cada mapa.

### Tenho um Shiny Ditto: onde caço e em que Pokémon devo transformar?
Abra o menu **☰ Opções → ✨ Ditto** (ou pressione o atalho **D**).
* Selecione se é **Shiny** ou **Comum**, o nível do Ditto e o nível da conta.
* A aba **Por hunt** lista os mapas em ordem de rendimento com a respectiva forma ideal.
* A aba **Por tipo** indica o melhor atacante de cada elemento para transformar e o respectivo habitat sugerido.

### Como reduzir o consumo de CPU e RAM no computador?
Quase todo o consumo vem da renderização gráfica do canvas do jogo (especialmente com 4 janelas abertas simultaneamente). Para máxima economia:
1. **Ative o 🍃 Modo Simples**: Reduz a renderização para apenas 1 FPS para receber pacotes e exibe um painel analítico leve, liberando até 80% do uso de CPU.
2. **Minimize para a Bandeja**: Ao minimizar ou fechar para o Tray, o launcher entra automaticamente em estado de economia de recursos.
3. **Mantenha o ⚡ Modo Eco ligado**: Limita laços contínuos de animação a 15 FPS estáveis.
4. **Feche o 📊 Painel lateral** quando não estiver inspecionando contas ativamente, pois a aba consolidada Σ realiza varreduras frequentes de telemetria.

### Nas opções do próprio jogo, o que ajuda no desempenho?
Nas configurações internas do jogo (ícone de engrenagem no rodapé de cada conta), acesse a aba **Vídeo**:
* **Modo Leve**: Ativado (reduz a resolução de texturas e mantém o cenário estático).
* **Modo de Batalha**: Cartas (remove animações 3D contínuas dos personagens em combate).

### Como desabilitar ou ocultar o chat do jogo?
No menu **☰ Opções**, alterne o botão **💬 Chat** entre oculto e visível. Manter o chat oculto libera espaço de tela e evita consumo desnecessário de DOM.

### Não consigo alterar a Pokébola no Auto-Helper
O botão **🧼 Limpar jogo** oculta elementos flutuantes para deixar a tela limpa. Basta passar o cursor do mouse sobre o canto onde o Auto-Helper fica localizado para que ele reapareça instantaneamente.

### Como exportar os logs e estatísticas das caçadas?
Acesse **🍃 Simples → seção Hoje → "⬇ Hunts"**. O launcher gerará planilhas `.csv` completas de histórico de caçadas e drops detalhados, compatíveis com Excel, LibreOffice e Google Planilhas.

### O ouro da sessão é diferente do Hunt Analyzer interno do jogo?
O launcher lê as métricas oficiais diretamente da telemetria do servidor. Lembre-se que o Hunt Analyzer do jogo vem por padrão configurado com a opção *"Considerar preço dos itens no Mercado"*, enquanto o launcher calcula os ganhos a **preço fixo de venda para NPC**. Para igualar os números, desmarque a opção de preço de mercado no jogo.

---

## 🔒 Segurança e Fair Play

### O launcher resolve captchas automaticamente?
**Não.** O PIO Rebosteio respeita rigorosamente as diretrizes da comunidade: o captcha (*"Confirme que é humano"*) deve ser sempre resolvido pelo jogador caso solicitado. O app não utiliza automação de cliques para burlar jogabilidade ativa.

### Minha conta utiliza autenticação de dois fatores (2FA). Como funciona?
Funciona perfeitamente. O launcher preenche automaticamente o login e senha e aguarda; o jogo então solicitará o código do seu autenticador no painel para você digitar manualmente.

### Minha conta faz login pelo botão do Google. Como conecto?
Navegadores embutidos em aplicativos de terceiros não completam o fluxo OAuth do Google por motivos de segurança do próprio Google. Para utilizar sua conta no launcher:
1. Em seu navegador normal, acesse [pokeidle.io/app](https://pokeidle.io/app) e faça login com o Google.
2. Acesse **Configurações → Minha Conta**.
3. Na aba **Senha**, defina uma senha própria para sua conta.
4. Na aba **Geral**, confirme o endereço de e-mail registrado.
5. Pronto! Agora basta cadastrar esse e-mail e sua nova senha no formulário **👤 Treinadores** do launcher.

---

## 🤝 Projeto e Comunidade

### O projeto é gratuito?
**Sim, 100% gratuito e open-source sob licença MIT.**
Caso queira apoiar o desenvolvimento contínuo, custos de infraestrutura e novas funcionalidades, utilize o botão **Ajude o projeto** no topo do aplicativo ou contribua diretamente via chave oficial.
