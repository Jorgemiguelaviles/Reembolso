<?php

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\ServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | Nome da Aplicação
    |--------------------------------------------------------------------------
    |
    | Este valor é o nome da sua aplicação. Ele é usado quando o
    | framework precisa inserir o nome da aplicação em uma notificação ou
    | em qualquer outro local conforme necessário pela aplicação ou seus pacotes.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Ambiente da Aplicação
    |--------------------------------------------------------------------------
    |
    | Este valor determina o "ambiente" no qual sua aplicação está atualmente
    | sendo executada. Isso pode determinar como você prefere configurar vários
    | serviços que a aplicação utiliza. Configure isso no seu arquivo ".env".
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Modo de Depuração da Aplicação
    |--------------------------------------------------------------------------
    |
    | Quando sua aplicação está em modo de depuração, mensagens de erro detalhadas com
    | pilhas de rastreamento serão exibidas em cada erro que ocorrer na sua
    | aplicação. Se desabilitado, uma página de erro genérica simples será exibida.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | URL da Aplicação
    |--------------------------------------------------------------------------
    |
    | Esta URL é usada pelo console para gerar corretamente URLs ao usar
    | a ferramenta de linha de comando Artisan. Você deve configurar isso
    | como a raiz da sua aplicação para que seja usada ao executar tarefas do Artisan.
    |
    */

    'url' => env('APP_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL'),

    /*
    |--------------------------------------------------------------------------
    | Fuso Horário da Aplicação
    |--------------------------------------------------------------------------
    |
    | Aqui você pode especificar o fuso horário padrão para sua aplicação, que
    | será usado pelas funções de data e hora do PHP. Nós já definimos um padrão
    | sensato para você usar imediatamente.
    |
    */

    'timezone' => 'America/Sao_Paulo',

    /*
    |--------------------------------------------------------------------------
    | Configuração de Localização da Aplicação
    |--------------------------------------------------------------------------
    |
    | O local da aplicação determina o local padrão que será usado
    | pelo provedor de serviços de tradução. Você pode definir este valor
    | para qualquer um dos locais que serão suportados pela aplicação.
    |
    */

    'locale' => 'pt-BR',

    /*
    |--------------------------------------------------------------------------
    | Local de Reserva da Aplicação
    |--------------------------------------------------------------------------
    |
    | O local de reserva determina o local a ser usado quando o atual
    | não estiver disponível. Você pode alterar o valor para corresponder a qualquer
    | uma das pastas de idiomas fornecidas pela sua aplicação.
    |
    */

    'fallback_locale' => 'pt_BR',

    /*
    |--------------------------------------------------------------------------
    | Local do Faker
    |--------------------------------------------------------------------------
    |
    | Este local será usado pela biblioteca Faker PHP ao gerar dados falsos
    | para seeds do seu banco de dados. Por exemplo, isso será usado para obter
    | números de telefone localizados, informações de endereço e mais.
    |
    */

    'faker_locale' => 'pt_BR',

    /*
    |--------------------------------------------------------------------------
    | Chave de Criptografia
    |--------------------------------------------------------------------------
    |
    | Esta chave é usada pelo serviço de criptografia Illuminate e deve ser configurada
    | como uma string aleatória de 32 caracteres, caso contrário, essas strings criptografadas
    | não serão seguras. Por favor, faça isso antes de implantar uma aplicação!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Driver do Modo de Manutenção
    |--------------------------------------------------------------------------
    |
    | Estas opções de configuração determinam o driver usado para determinar e
    | gerenciar o status de "modo de manutenção" do Laravel. O driver "cache"
    | permitirá controlar o modo de manutenção em várias máquinas.
    |
    | Drivers suportados: "file", "cache"
    |
    */

    'maintenance' => [
        'driver' => 'file',
        // 'store' => 'redis',
    ],

    /*
    |--------------------------------------------------------------------------
    | Provedores de Serviços Carregados Automaticamente
    |--------------------------------------------------------------------------
    |
    | Os provedores de serviços listados aqui serão carregados automaticamente
    | quando a aplicação for solicitada. Sinta-se à vontade para adicionar seus próprios
    | serviços a esta matriz para conceder funcionalidade expandida à sua aplicação.
    |
    */

    'providers' => ServiceProvider::defaultProviders()->merge([
        /*
         * Provedores de Serviços de Pacotes...
         */

        /*
         * Provedores de Serviços da Aplicação...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
    ])->toArray(),

    /*
    |--------------------------------------------------------------------------
    | Aliases de Classes
    |--------------------------------------------------------------------------
    |
    | Este array de aliases de classes será registrado quando esta aplicação
    | for iniciada. No entanto, sinta-se à vontade para registrar quantos desejar
    | já que os aliases são carregados "lazy" para não prejudicar o desempenho.
    |
    */

    'aliases' => Facade::defaultAliases()->merge([
        // 'Example' => App\Facades\Example::class,
    ])->toArray(),

];
