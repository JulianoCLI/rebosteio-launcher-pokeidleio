<div align="center">

<img src="src/ui/assets/pokeidle-logo-smooth.png" width="260" alt="PokeIdle IO">
<br>
<img src="src/ui/assets/rebosteio-by-nailo.png" width="240" alt="PIO Rebosteio by Nailo">

# Manual do Usuário — PIO Rebosteio

**Launcher Multi-Contas para Poke Idle IO**

</div>

Guia completo e direto de como operar o launcher, seus controles e ferramentas integradas. Se você procura solucionar um erro específico ou dúvida rápida, consulte também o **[FAQ](FAQ.md)**.

---

## Painel em destaque e zoom

Com duas ou mais contas abertas, clique em **◫** no cabeçalho de uma conta para deixá-la maior à esquerda, mantendo as demais empilhadas à direita. Clique novamente para voltar à grade. Arraste o divisor entre as colunas para ajustar a largura; um duplo clique restaura 68%. Também é possível focar o divisor com Tab e ajustar pelas setas. A conta em destaque e a largura ficam salvas.

O destaque usa o layout Grade. Ao expandir uma conta, abrir a Lista ou ativar o Simples, o divisor fica oculto e volta ao retornar às janelas.

Os controles **−**, **+** e a porcentagem no cabeçalho ajustam o zoom de cada conta (50% a 200%). Clique na porcentagem para restaurar 100%. Para ajustar todas as contas ligadas, use **Ctrl + +**, **Ctrl + −**, **Ctrl + 0** ou **Ctrl + roda do mouse**, inclusive com o jogo em foco. No macOS, os atalhos também usam Cmd. Cada conta mantém seu próprio zoom salvo.

## 🧭 Barra Superior (Topbar)

A barra superior organiza os controles centrais do launcher e acesso rápido às ferramentas operacionais:

| Botão / Elemento | O que faz |
|---|---|
| **▶ Logar equipe** | Loga de uma só vez, utilizando as credenciais salvas, todas as contas que estiverem fora do jogo. Contas que já estiverem caçando/farmando ativamente permanecem conectadas. |
| **👤 Treinadores** | Cadastra e edita o e-mail e senha de cada conta (criptografados com segurança local via DPAPI). O botão 🗑 limpa o formulário; o botão 🧹 limpa o cache de partição daquela conta caso ocorra algum travamento de interface do jogo. |
| **⟳ Atualizar tudo** | Recarrega os painéis das contas conectadas, ignorando cache de página (útil se o jogo atualizar a versão web ou travar uma tela antiga). |
| **📊 Painel** | Abre a barra lateral dedicada com métricas detalhadas, histórico de combate, drops e inventário de uma conta selecionada (ou a soma de todas na aba Σ). |
| **🍃 Simples** | Ativa o modo de alta economia: oculta a renderização gráfica do jogo e exibe apenas estatísticas em tempo real, reduzindo drasticamente o consumo de CPU. |
| **📐 IVs** | Abre a calculadora de IV integrada (JustPokédex). Passe o mouse sobre qualquer Pokémon no jogo para que os valores sejam lidos automaticamente. |
| **🎨 Temas** | Seletor visual completo: alterne entre o Absol Midnight clássico, 12 paletas de cores refinadas e temas exclusivos ilustrados com biomas e personagens. |
| **☰ Opções** | Menu de configurações avançadas: Hunt Analyzer, Tierlist analítica, Otimizador de Ditto, Alertas Discord/Windows, Venda Protegida, Modo Eco e diagnósticos. |

> ⌨️ **Atalhos de teclado rápidos** (quando o foco estiver no launcher e sem modais abertos):  
> **H** Hunts · **C** Modo Simples · **L** Limpar tela de combate · **R** Atualizar tudo · **T** Treinadores · **G** Tierlist · **D** Ditto · **O** Menu Opções · **M** Menu do jogo · **E** Alternar Modo Eco · **A** Alternar Alertas e Sons do Jogo.

---

## 📊 Painel Lateral (Sidebar de Métricas)

Permite acompanhar individualmente os dados de cada conta ativa ou consolidar a equipe inteira na aba **Σ**.

Na **engrenagem (⚙)** localizada no topo do painel, você pode personalizar a ordem dos cartões e quais seções devem ser exibidas:

* **📌 Itens fixados**: Permite fixar itens essenciais (ex: Ultra Balls, poções, pedras de evolução) para acompanhar o estoque de todas as contas simultaneamente. Na engrenagem, busque o item pelo nome e marque-o.
* **🎯 Alvo shiny**: Monitore uma caçada específica. Ao selecionar a espécie desejada, o card indicará se o shiny já apareceu na sessão atual, se foi capturado com sucesso e quantas pokébolas foram gastas na tentativa.
* **📦 Drops e Lucro**: Exibe a lista de itens saqueados no farm com valor estimado a preço de NPC e taxa de Gold/hora.

---

## 🍃 Modo Simples (Dashboard Multi-Contas)

Projetado para períodos longos de farm sem sobrecarregar a placa de vídeo ou processador. A exibição do canvas dos jogos é pausada (mantendo apenas o ciclo de 1 FPS para receber os dados do servidor), exibindo um painel com métricas consolidadas:

* **Hoje**: Ouro obtido, experiência ganha, monstros derrotados e capturas totais do dia, com barra de metas e exportação para planilhas CSV.
* **Hunts recomendadas**: Ranking dinâmico de eficiência. Ordene por **Sugerido** e selecione o Pokémon líder atacante em **"caçar com"**. O cálculo considera vantagens de tipo, dano medido, TMs equipados e a forma ideal caso haja um Ditto no time.
* **Capturas e Shinies**: Histórico de encontros com filtros por IV, qualidade, data e conta.
* **Times e Poder**: Exibe o time titular de cada treinador com seus respectivos IVs, qualidade e projeção de poder para níveis futuros.
* **Inventário consolidado**: Soma de itens da mochila pessoal e do depósito compartilhado de todas as 4 contas.
* **Gráficos de Tendência**: Curvas de desempenho de Gold/h e XP/h em tempo real.

---

## 🏆 Tierlist Analítica de Espécies (Atalho: G)

Classifica todas as espécies do jogo com notas relativas de 0 a 100 baseadas na eficiência de farm.

* **Seletor XP/h vs. Gold/h**: Alterne se a prioridade do cálculo é ganho de experiência ou geração de gold via drops para NPCs.
* **Filtro por Nível do Treinador**: Ajusta os cálculos exatamente para o seu nível (até o nível 3000), listando apenas os locais onde seu personagem pode acessar e onde o dano é viável.
* **Chip 🎯 Pokémon**: Permite selecionar um membro do seu próprio time para descobrir instantaneamente quais são as melhores hunts do jogo para ele.
* **Modo com TM**: Leva em consideração o impacto de dano do TM elemental (disparo em área a cada 10s) e do AoE TM no ritmo de abates.
* **Calibração Automática**: O launcher mede continuamente o dano real desferido pelo seu líder em combate e ajusta a fórmula da tierlist com base no desempenho real da sua conta, sem depender apenas de números teóricos.

---

## ✨ Otimizador de Ditto (Atalho: D)

Ferramenta indispensável para treinadores que farmam com **Ditto Comum** ou **Shiny Ditto**:

* **Por Hunt**: Mostra qual espécie o Ditto deve copiar para obter a maior taxa de abates em cada mapa específico.
* **Por Tipo**: Aponta a melhor espécie de cada elemento (Fogo, Água, Planta, etc.) para transformar seu Ditto e qual a caçada recomendada para ela.
* Considera automaticamente os debuffs oficiais do jogo (penalidades de ataque de transformações de Ditto) e respeita as limitações de espécies que não podem ser copiadas (chefes de Orre, Nightmare, Lendários e Megas).

---

## 🛡 Proteções e Segurança Integrada

* **Venda Protegida**: Exige confirmação explícita ao vender acidentalmente Pokémon shiny, qualidade Lendária ou itens de alto valor. Você também pode trancar itens específicos com o **🔒 Cadeado de Venda**.
* **Alertas Sonoros, Sons do Jogo e Webhook Discord**: Alterna todos os sons nativos da configuração do jogo (Sound Mode, som de shiny, captura e drops de boss) e notificações de radar, queda de conta ou suprimentos baixos.
* **Salvamento Criptografado**: Todas as credenciais de login são salvas utilizando as chaves seguras do próprio Windows (DPAPI) via `safeStorage` do Electron, sem qualquer envio externo.
