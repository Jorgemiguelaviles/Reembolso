# S I S T E M A  R E E M B O O L S O

## Requerimentos
- PHP 8.3.1 ou superior
- Banco de dados: MySQL,
- Servidor Web (por exemplo: Apache, Nginx, IIS)

## Framework
O Sistema Reemboolso utiliza o Laravel, o melhor framework PHP atualmente, como base.

## Instalação
1. Instale o Composer e o Npm.
2. Clone o repositório: `git clone LucasdeSDuarte/SistemaReembolso`.
3. Acesse a pasta Sistema sistemaReembolso: `cd sistema_reembolso`>     
4. Instale as dependências: `composer install ; npm install ; npm run production`.
5. Crie o arquivo de configuração de variáveis de ambiente: `cp .env.production .env`.
6. Configure as variáveis de ambiente e a conexão com o banco de dados no arquivo `.env`.
7. Execute os seeders: `php artisan migrate:fresh --seed`.
8. Execute `php artisan key:generate`.
9. Inicie o servidor: `php artisan serve`.
10. Acesse o Sistema Reemboolso no navegador: [http://localhost:8000](http://localhost:8000) ou na URL que você configurar.
11. Faça login com as seguintes credenciais:
    - **Login:** admin@admin.com
    - **Senha:** admin

## Dependências de front-end
Ao atualizar dependências de front-end ou alterar arquivos CSS ou JS, siga estas instruções:

1. Certifique-se de ter o Node e o NPM instalados.
2. Execute `npm install`.
3. Execute o comando abaixo para compilar o React: `npm run dev`.
   Este comando irá gerar os arquivos React minificados dentro da pasta `public`.

## Contribuindo
Por favor, seja muito claro em suas pull requests. As pull requests podem ser rejeitadas sem motivo.

Ao contribuir com código para o Sistema Reemboolso, siga os padrões de codificação PSR-2. A regra de ouro é: Imite o código existente.

## Changelog
Consulte o [Changelog](Changelog) para obter mais informações sobre todas as atualizações.

## Segurança
Se você descobrir algum problema relacionado à segurança, envie um email para lukazduarte@gmail.com ao invés de usar o issue tracker.

## Licença

O framework Laravel é software de código aberto licenciado sob a [licença MIT](https://opensource.org/licenses/MIT).
