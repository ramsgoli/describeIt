build:
	npm run build && docker build -t ramsgoli/reactor . && rm -rf dist

run:
	docker run --rm -p 80:8080 ramsgoli/reactor:latest

dev:
	export NODE_ENV=0 && npm run dev
