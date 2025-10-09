# Chat Agent Interface

Interface simples de chat para interagir com agentes OpenAI.

## Configuração

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure a chave da API:**

Crie um arquivo `.env` na raiz do projeto:
```
OPENAI_API_KEY=sua_chave_api_aqui
```

3. **Inicie o servidor:**
```bash
npm start
```

4. **Acesse o chat:**
Abra seu navegador em: http://localhost:3000

## Estrutura

- `server.js` - Servidor Express
- `workflow.js` - Lógica do agente OpenAI
- `public/index.html` - Interface do chat
- `.env` - Variáveis de ambiente (criar manualmente)

## Solução de Problemas

Se você receber erro 500:
1. Verifique se a chave da API está configurada corretamente no arquivo `.env`
2. Verifique os logs do console do servidor para ver o erro específico
3. Certifique-se de que tem créditos na sua conta OpenAI
4. Verifique se o modelo "gpt-5" está disponível (pode precisar mudar para "gpt-4" se não tiver acesso)
