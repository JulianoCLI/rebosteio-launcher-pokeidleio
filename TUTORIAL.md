<div align="center">

<img src="src/ui/assets/nailo-logo.png" width="180" alt="Nailo">

# Como Usar o PIO Rebosteio (Passo a Passo)

**Guia para rodar direto do código-fonte**

</div>

Este guia é feito para quem nunca mexeu com programação ou execução de código. Rodar o launcher a partir do código aberto é simples, leva menos de 3 minutos e a parte de preparação só precisa ser feita **uma única vez**.

---

## 📦 Passo 1: Node.js (Automático no Windows!)

No Windows, você **não precisa instalar nada manualmente**: ao dar dois cliques em `Abrir Poke Idle IO.bat`, o inicializador verifica e baixa a versão oficial portátil do Node.js LTS automaticamente caso você não tenha!

Caso utilize Linux/macOS ou prefira instalar o Node.js manualmente no sistema:
1. Acesse o site oficial: **[nodejs.org](https://nodejs.org)**
2. Baixe e instale a versão **LTS** (versão 22 ou superior).

---

## 📥 Passo 2: Baixar a Pasta do Projeto

1. Na página do projeto no GitHub, clique no botão verde **Code** (localizado no canto superior direito).
2. Selecione **Download ZIP**.
3. Vá até a sua pasta de *Downloads*, clique com o botão direito no arquivo `.zip` baixado e escolha **Extrair Tudo...**.
4. Uma pasta com os arquivos do projeto será criada. Coloque-a no local que preferir (por exemplo, em sua pasta de Documentos ou Área de Trabalho).

---

## 🚀 Passo 3: Abrir o Aplicativo

1. Abra a pasta do projeto extraída.
2. Dê dois cliques no arquivo **`Abrir Poke Idle IO.bat`**.
3. **Na primeira vez que você abrir**, uma janela de terminal preta fará o download automático das dependências necessárias (isso leva cerca de 1 a 2 minutos). Em seguida, a janela do launcher se abrirá sozinha.
4. Nas próximas vezes, a janela só pisca por um instante e o launcher abre de imediato.

> 💡 **Dica de Atalho**: Para abrir o launcher com um clique direto da sua área de trabalho, clique com o botão direito em **`Abrir Poke Idle IO.bat`** e escolha **Enviar para → Área de trabalho (criar atalho)**.

> ℹ️ *Se o Windows SmartScreen exibir um alerta de "Windows protegeu o computador":* clique em **Mais informações** e depois em **Executar assim mesmo**. O app é 100% aberto e seguro, apenas não possui certificados proprietários comerciais.

### No Linux ou macOS
Abra o Terminal dentro da pasta do projeto e digite:

```bash
bash iniciar.sh
```

---

## 🎯 Passo 4: Entrar nas Contas e Farmar

1. No quadrante de cada conta, faça login normalmente com sua conta do Poke Idle IO (ou crie uma nova).
2. O desafio de verificação (**"Confirme que é humano"**) é sempre resolvido manualmente por você na tela da conta.
3. Clique no botão **👤 Treinadores** no topo, preencha o e-mail e senha das suas contas e clique em **Salvar**.
4. A partir de agora, sempre que abrir o launcher, basta clicar em **▶ Logar equipe** e todas as suas contas entrarão automaticamente!

---

## 🔄 Como Atualizar Quando Sair Versão Nova

Basta baixar o novo ZIP no GitHub e substituir os arquivos da pasta antiga. Todas as suas contas salvas, metas e preferências continuarão salvas intactas no seu computador!

---

## ❓ Dúvidas ou Problemas Comuns?

* Consulte nosso **[FAQ.md](FAQ.md)** para resoluções rápidas de tela branca, permissões de firewall ou dúvidas de desempenho.
* Para entender em detalhes o que cada botão e função faz, leia nosso **[MANUAL.md](MANUAL.md)**.
