# Реквизиты

Сначала нужно запустить базу PostgreSQL, для этого подготовлен docker-compose.yml файл

> docker compose up -d

Затем нужно установить пакеты приложения:

> npm i

Далее нам нужно воспользоваться prisma CLI для накатывания миграции и сид-данных

> npx prisma migrate dev
> npx prisma db seed

После этого приложение будет готово к запуску на localhost:3000

> npm run dev
