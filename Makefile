# Makefile for Chort Dungeon

CLIENT_DIR := chortDungeon/client
SERVER_DIR := chortDungeon/server

.PHONY: help setup setup-client setup-server run run-client run-server

help:
	@echo "Available commands:"
	@echo "  make setup         - Install dependencies for both client and server"
	@echo "  make setup-client  - Install dependencies for the client only"
	@echo "  make setup-server  - Install dependencies for the server only"
	@echo "  make run           - Display instructions on how to run the project"
	@echo "  make run-client    - Start the React client"
	@echo "  make run-server    - Start the Node.js server"

setup: setup-client setup-server
	@echo ""
	@echo "========================================================"
	@echo "Setup complete!"
	@echo "Please create and configure the '.env' file in: $(SERVER_DIR)"
	@echo "Using following variables:"
	@echo "OPENAI_API_KEY=your_openai_api_key_here"
	@echo "MONGODB_URI=your_mongodb_uri_here"
	@echo "========================================================"

setup-client:
	@echo "Installing client dependencies..."
	npm install --prefix $(CLIENT_DIR)

setup-server:
	@echo "Installing server dependencies..."
	npm install --prefix $(SERVER_DIR)

run:
	@echo "To run the project, please open two separate terminal windows:"
	@echo "  Terminal 1: make run-server"
	@echo "  Terminal 2: make run-client"

run-client:
	@echo "Starting the React client..."
	npm start --prefix $(CLIENT_DIR)

run-server:
	@echo "Starting the Node server..."
	cd $(SERVER_DIR) && npx nodemon index.js
