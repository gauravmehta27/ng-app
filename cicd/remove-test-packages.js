// @ts-check

const path = require('path');
const fs = require('fs');
const package_file = require('../package.json');
try {
    const package_json = path.resolve(__dirname, '..', 'package.json');

    if (process.env.NODE_ENV == 'CYPRESS') {
        delete package_file.devDependencies["jest"];
        delete package_file.devDependencies["jest-junit"];
        delete package_file.devDependencies["jest-serializer-vue"];
        delete package_file.devDependencies["jest-transform-stub"];
    }
    if (process.env.NODE_ENV == 'production') {
        delete package_file.devDependencies["karma"];
        delete package_file.devDependencies["karma-chrome-launcher"];
        delete package_file.devDependencies["karma-coverage-istanbul-reporter"];
        delete package_file.devDependencies["karma-jasmine"];
        delete package_file.devDependencies["karma-jasmine-html-reporter"];
        delete package_file.devDependencies["karma-junit-reporter"];
        delete package_file.devDependencies["karma-mocha-reporter"];
        delete package_file.devDependencies["karma-phantomjs-launcher"];
        delete package_file.devDependencies["lighthouse"];
    }
    if (process.env.NODE_ENV == 'UNIT') {
        delete package_file.devDependencies["lighthouse"];
    }
    fs.writeFileSync(
        package_json,
        JSON.stringify(package_file, null, 4), {
            encoding: 'utf-8'
        });
    console.log(`adjusted package.json for running....`, process.env.NODE_ENV);

} catch (e) {
    console.log(e);

}
