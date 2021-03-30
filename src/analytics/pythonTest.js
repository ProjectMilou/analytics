const pythonSpawner = require("./python/python");

pythonSpawner.callPythonScript().then((result) => {
    console.log(result);
});
