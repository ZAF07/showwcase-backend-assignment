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

# Start database only
start-db:
	docker-compose up db

# Starts the application locally with database container
start-local:
	docker-compose up -d db
	npm run dev