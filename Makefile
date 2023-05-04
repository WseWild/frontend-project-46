install-deps:
	npm ci
gendiff:
	node gendiff.js
publish: 
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test