# Refatoração dos Estilos CSS

## Resumo das Mudanças

Este documento descreve a refatoração realizada para separar os estilos CSS inline em arquivos isolados.

## Estrutura de Arquivos CSS Criados

### `/src/styles/global.css`

- Estilos globais e reset CSS
- Classes utilitárias para cores, espaçamentos, flexbox, etc.
- Substitui o antigo `index.css`

### `/src/styles/Layout.css`

- Estilos específicos do componente Layout
- Header, navegação, informações do usuário, botão de logout

### `/src/styles/Login.css`

- Estilos da página de login
- Container, card, formulário, inputs, botões

### `/src/styles/Home.css`

- Estilos da página inicial
- Estados autenticado e não autenticado
- Cards, botões de ação

### `/src/styles/Users.css`

- Estilos da página de gerenciamento de usuários
- Tabela, formulário de criação, botões de ação
- Badges de perfil (admin/usuário)

### `/src/styles/UserEdit.css`

- Estilos da página de edição de usuário
- Formulário de edição, campos de exibição
- Botões de ação

### `/src/styles/ProtectedRoute.css`

- Estilos do componente de rota protegida
- Estado de carregamento

## Componentes e Páginas Atualizados

### Componentes

- `Layout.js` - Substituído estilos inline por classes CSS
- `ProtectedRoute.js` - Substituído estilos inline por classes CSS

### Páginas

- `Login.js` - Substituído estilos inline por classes CSS
- `Home.js` - Substituído estilos inline por classes CSS
- `Users.js` - Substituído estilos inline por classes CSS
- `UserEdit.js` - Substituído estilos inline por classes CSS

## Benefícios da Refatoração

1. **Separação de Responsabilidades**: Estilos separados da lógica JavaScript
2. **Manutenibilidade**: Mais fácil de manter e modificar estilos
3. **Reutilização**: Classes CSS podem ser reutilizadas
4. **Performance**: CSS é mais eficiente que estilos inline
5. **Organização**: Estrutura mais clara e organizada
6. **Escalabilidade**: Facilita a adição de novos estilos

## Classes Utilitárias Disponíveis

### Cores

- `.text-primary`, `.text-success`, `.text-danger`, etc.
- `.bg-primary`, `.bg-success`, `.bg-danger`, etc.

### Espaçamentos

- `.mb-0`, `.mb-10`, `.mb-15`, `.mb-20`, `.mb-30`
- `.mt-0`, `.mt-10`, `.mt-15`, `.mt-20`, `.mt-30`
- `.p-0`, `.p-10`, `.p-15`, `.p-20`, `.p-30`

### Flexbox

- `.d-flex`, `.flex-column`
- `.justify-content-center`, `.justify-content-between`
- `.align-items-center`
- `.gap-10`, `.gap-15`, `.gap-20`

### Outros

- `.w-100`, `.h-100`, `.min-h-100vh`
- `.border`, `.border-radius`, `.border-radius-lg`
- `.shadow`, `.cursor-pointer`, `.cursor-not-allowed`

## Como Usar

1. Importe o arquivo CSS necessário no componente:

```javascript
import "../styles/ComponentName.css";
```

2. Use as classes CSS nos elementos:

```javascript
<div className="component-class">Conteúdo</div>
```

3. Para classes utilitárias, importe o global.css (já importado no index.js):

```javascript
<div className="d-flex justify-content-center align-items-center">
  Conteúdo centralizado
</div>
```
