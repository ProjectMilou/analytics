// Wraps the spawn in a Promise so you can use async/await;
const spawn = require("await-spawn");

async function callPythonScript() {
    let result = {
        error: "",
        success: {}
    };
    try {
        const script = await spawn("py", [
            "src/analytics/python/helloWorld.py"
        ]);
        result.success = { data: script.toString() };
    } catch (error) {
        result.error = error.stderr.toString();
    }
    return result;
}

exports.callPythonScript = callPythonScript;
