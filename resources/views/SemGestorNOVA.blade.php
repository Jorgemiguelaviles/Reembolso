<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template de Email</title>
    <style>
        /* Estilos para garantir uma exibição adequada em dispositivos móveis */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h1 style="color: #333333;">Sistema de Reembolso WEB</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; line-height: 1.5; color: #666666;">Olá,</p>

                <p style="font-size: 16px; line-height: 1.5; color: #666666;">A solicitação do {{ $usuario }} foi cancelada.</p>
		<p style="font-size: 16px; line-height: 1.5; color: #666666;">
    Link para acesso:
    <a href="http://alpinacloud.com.br:5170/login" style="color: #007bff; text-decoration: none; font-weight: bold;">
        Acessar o sistema aqui
    </a>
</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #333333; padding: 20px; text-align: center;">
                <p style="font-size: 14px; color: #ffffff;">© 2024 Alpina. Todos os direitos reservados.</p>
            </td>
        </tr>
    </table>
</body>
</html>
