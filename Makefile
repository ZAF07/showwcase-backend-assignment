# Start docker in detahced mode
start-d:
	docker-compose up -d

# Stop docker in detached mode
stop-d:
	docker-compose stop

# Start docker containers
start: 
	docker-compose up

# Remove all containers
down: 
	docker-compose down

# Start database container only
start-db:
	docker-compose up db

# Starts the application locally with database container
start-local-d:
	docker-compose up -d db
	npm run dev

# Starts locally (you own database required)
start-local:
	npm run dev

build: npm-build start

npm-build:
	npm run build

test: clear-test-cache
	npx jest --detectOpenHandles

clear-test-cache: 
	npx jest --clearCache