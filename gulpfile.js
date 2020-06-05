let gulp = require('gulp')
let { series } = require('gulp')
let fs = require('fs')
let ts = require("gulp-typescript")

function clean(cb) {
    let tsp = ts.createProject("tsconfig.json")
    let outFile = tsp.config.compilerOptions.outFile
    if (outFile) {
        outFile = outFile.substring(0, outFile.indexOf('/', 2))
    }
    else {
        outFile = tsp.config.compilerOptions.outDir
    }
    if (outFile == "./" || outFile == null) {
        console.warn('【注意】请检查tsconfig.json配置，企图清空项目!')
    }
    else {
        deleteall(outFile)
    }
    cb()
}

function deleteall(path) {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            let curPath = path + "/" + file
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath)
            } else { // delete file
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

function build() {
    let tsp = ts.createProject("tsconfig.json")

    return tsp.src()
        .pipe(tsp())
        .pipe(gulp.dest("./dist"))
}

function test(cb) {
    let tsp = ts.createProject("tsconfig.json")
    let outFile = tsp.config.compilerOptions.outFile
    if (outFile && fs.existsSync(outFile)) {
        fs.appendFile(outFile, "\n\n//entry\npsd2ugui.main()", cb)
    }
    else {
        cb()
    }
}


exports.clean = clean
exports.build = build
exports.test = test
exports.default = series(clean, build)
