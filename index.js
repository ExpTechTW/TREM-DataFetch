const fs = require('fs');
const path = require('path');
const axios = require('axios');

setInterval(() => {
    let data = {
        "APIkey": "https://github.com/ExpTechTW",
        "Function": "data",
        "Type": "TREM",
        "FormatVersion": 1,
    }
    axios.post('https://exptech.mywire.org:1015', data)
        .then(async function (response) {
            let Data = response.data.response
            for (let index = 0; index < Object.keys(Data).length; index++) {
                if (Object.keys(Data)[index] != "PGAList") {
                    let data = Data[Object.keys(Data)[index]]
                    let D = new Date();
                    if (!fs.existsSync(path.resolve("") + `/Fetch`)) {
                        fs.mkdirSync(path.resolve("") + `/Fetch`)
                    }
                    if (!fs.existsSync(path.resolve("") + `/Fetch/${D.getFullYear()}`)) {
                        fs.mkdirSync(path.resolve("") + `/Fetch/${D.getFullYear()}`)
                    }
                    if (!fs.existsSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}`)) {
                        fs.mkdirSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}`)
                    }
                    if (!fs.existsSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}`)) {
                        fs.mkdirSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}`)
                    }
                    if (!fs.existsSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}`)) {
                        fs.mkdirSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}`)
                    }
                    if (!fs.existsSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}/${Object.keys(Data)[index]}.log`)) {
                        fs.writeFileSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}/${Object.keys(Data)[index]}.log`, "")
                    }
                    let log = fs.readFileSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}/${Object.keys(Data)[index]}.log`)
                    let now = new Date(data.Time)
                    let Now = now.getFullYear() +
                        "/" + (now.getMonth() + 1) +
                        "/" + now.getDate() +
                        " " + now.getHours() +
                        ":" + now.getMinutes() +
                        ":" + now.getSeconds()
                    log = `${Now} | X: ${data.Ax.toFixed(2)} Y: ${data.Ay.toFixed(2)} Z: ${data.Az.toFixed(2)} | PGA: ${data.MaxPGA}\n` + log
                    fs.writeFileSync(path.resolve("") + `/Fetch/${D.getFullYear()}/${D.getMonth() + 1}/${D.getDate()}/${D.getHours()}/${Object.keys(Data)[index]}.log`, log)
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
}, 1000)