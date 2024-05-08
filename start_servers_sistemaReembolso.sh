#!/bin/bash

# Inicia o servidor React
nohup npm run dev -- --host 10.0.0.183 --port 8006 > react_server.log 2>&1 &

# Aguarda um curto período para garantir que o servidor React tenha tempo de iniciar
sleep 10

# Inicia o servidor Laravel
nohup php artisan serve --host 0.0.0.0 --port 5178 > laravel_server.log 2>&1 &

