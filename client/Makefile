build:
	npm run build && docker build -t ramsgoli/describeit . && rm -rf dist

run:
	docker run --rm -p 80:8080 ramsgoli/describeit:latest

dev:
	WEBPACK=1 NODE_ENV=development npm run dev
