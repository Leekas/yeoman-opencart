test:
 npm test

coverage:
 jscoverage --no-highlight lib lib-cov
 YOURPACKAGE_COVERAGE=1 ./node_modules/.bin/mocha test -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
 rm -rf lib-cov

.PHONY: test