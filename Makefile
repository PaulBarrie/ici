include .env
export $(shell sed 's/=.*//' .env)


all: up ssl migrations
restart: 
ifdef svc
	docker-compose  stop $(svc) && docker-compose  up --build -d $(svc)
else
	docker-compose restart 
endif

ps:
	docker-compose ps


logs:
ifdef svc
	docker-compose logs -f $(svc)
else
	docker-compose logs -f
endif	

up:
ifdef svc
	docker-compose up -d --build $(svc)
else
	docker-compose up -d --build
endif

rebuild:
	 docker-compose up --build --force-recreate --no-deps

rm:
ifdef svc
	docker stop $(svc) && docker rm $(svc)
else
	docker-compose down
endif

nuke:
	docker rmi $(docker image ls -q)


nuke_docker:
	@echo "Rebuilding docker services from scratch..."

migrations: undo_migrations
	docker exec ${API_CONTAINER} sh -c "cd /home/api/src/database && ../../node_modules/.bin/sequelize db:migrate"

undo_migrations:
	docker exec ${API_CONTAINER} sh -c "cd /home/api/src/database && ../../node_modules/.bin/sequelize db:migrate:undo:all"

ssl:
	sh docker/ssl/create-cerificates.sh

fixtures:
	docker exec ${API_CONTAINER} sh -c "cd /home/api/src/database && ../../node_modules/.bin/sequelize db:seed:all"

