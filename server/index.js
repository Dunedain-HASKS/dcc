const cors = require("cors");
const Axios = require("axios");
const express = require("express");

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {

    const { code, language, input } = req.body;

    const languageMap = {
        "c": { language: "c", version: "10.2.0" },
        "cpp": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "java": { language: "java", version: "15.0.2" }
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    const data = {
        "language": languageMap[language].language,
        "version": languageMap[language].version,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": input
    };

    const config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    Axios(config)
        .then((response) => {
            res.json(response.data.run);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: "Something went wrong" });
        });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
