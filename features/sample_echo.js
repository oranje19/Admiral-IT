/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var jason = require('../resumes/jason.json')
var michael = require('../resumes/michael.json')

module.exports = function(controller) {

    let selected = "";
    let key = "";
    let key2 = false;
    let options = [["Jason", "Michael"], [], [], []];
    // let levels = [["Jason", "Michael"]]
    let keys = [selected, "", "", ""] ;
    let level = 0;

    controller.hears('begin', 'message,direct_message', async(bot, message) => {
        await bot.reply(message, {
            "text": "Welcome, my name is admiral IT... Here are my two candidates for a software engineering position...",
            "quick_replies":
                [
                    {
                        "content_type": "text",
                        "title": "Jason",
                        "payload": "jason"
                    },
                    {
                        "content_type": "text",
                        "title": "Michael",
                        "payload": "michael"
                    }
                ]
        })
        level = 0
    })

    controller.hears( 'michael|jason', 'message,direct_message', async(bot, message) => {
        if(message.text.toLowerCase().includes(`michael`) && message.text.toLowerCase().includes("jason")){
            await bot.reply(message, {
                "text": "Please select Jason or Michael",
                "quick_replies":
                    [
                        {
                            "content_type": "text",
                            "title": "Jason",
                            "payload": "jason"
                        },
                        {
                            "content_type": "text",
                            "title": "Michael",
                            "payload": "michael"
                        }
                    ]
            })
        }
        else if(message.text.toLowerCase().includes(`michael`)) {
            selected = "Michael"
            level = 1;
            options[level] = Object.keys(michael);
            
            let qReplies = options[level].map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            if(level !== 0) qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": "back"
            })
            await bot.reply(message, {
                "text": `${selected} is selected`,
                "quick_replies": qReplies
            })
        } else if(message.text.toLowerCase().includes("jason")){
            selected = "Jason"
            level = 1;
            options[level] = Object.keys(michael);
            let qReplies = options[level].map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            // console.log(qReplies)
            if(level !== 0) qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": "back"
            })
            await bot.reply(message, {
                "text": `${selected} is selected`,
                "quick_replies": qReplies
            })
        }
    })

    controller.hears('basics|profiles|work|project|education|skills|languages|interests', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            // await bot.reply(message, 'Please select Michael or Jason to proceed.')
            await bot.reply(message, {
                "text": "Please select Michael or Jason to proceed.",
                "quick_replies":
                    [
                        {
                            "content_type": "text",
                            "title": "Jason",
                            "payload": "jason"
                        },
                        {
                            "content_type": "text",
                            "title": "Michael",
                            "payload": "michael"
                        }
                    ]
            })
            level = 0;
        } else {
            let mes;
            switch(message.text.toLowerCase()){
                case "basics":
                    mes = "Basics";
                    break;
                case "profiles":
                    mes = "Profiles";
                    break;
                case "work":
                    mes = "Work";
                    break;
                case "project":
                    mes = "Project";
                    break;
                case "education":
                    mes = "Education";
                    break;
                case "skills":
                    mes = "Skills";
                    break;
                case "languages":
                    mes = "Languages";
                    break;
                case "interests":
                    mes = "Interests";
                    break;
                default:
                    mes = "Invalid";

            }
            // console.log("here")
            // await bot.reply(message, `${selected}'s basics are selected`)
            let info = selected === "Jason" ? jason : michael;
            console.log("Invalid")
            if(mes !== "Invalid") {
                options[2] = Object.keys(info[mes])
                level = 2;
            }
            let qReplies = options[level].map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            if(level !== 0) qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `back`
            })
            key = mes
            key2 = false;
            console.log(options)
            // make button to show up
            await bot.reply(message, {
                "text": `${key} is selected`,
                "quick_replies": qReplies
            })

        }
    })

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

    controller.hears('back', 'message, direct_message', async(bot, message) => {
        if(level > 0) level--;
        info = selected === "Jason" ? jason : michael;
        console.log(options, level, ";)")
        let qReplies = options[level].map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            if(level !== 0) qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `back`
            })
            let mes = "";
            if(level === 0){
                mes = `Backtracked to canidate selection`
            } else if(level === 1) {
                mes = `Backtracked to ${selected}'s option menu`
            } else if(level === 2) {
                mes = `Backtracked to ${key}`
            } else if(level === 3) {
                mes = `Backtracked to ${key2}`
            }
            await bot.reply(message, {
                "text": mes,
                "quick_replies": qReplies
            })
            console.log(options, " : ", level)
    })
    controller.hears('', 'message, direct_message', async(bot, message) => {
        console.log("hello: ", options)
        let temp = options[level];
        let new_msg = message.text.toLowerCase();
        console.log(options, " | ", level)
        let lowerCase = temp ? temp.map(option => option.toLowerCase()) : "";
        if (lowerCase.includes(new_msg)) {
            console.log(options);
            for (let i = 0; i < temp.length; i++) {
                if (new_msg === lowerCase[i]) {
                    let info = selected === 'Jason' ? jason : michael;
                    if (typeof info[key][temp[i]] === 'object' && info[key][temp[i]] !== null) {
                        level++;
                        key2 = temp[i]
                        options[level] = (Object.keys(info[key][key2]))
                        let qReplies = options[level].map(el =>
                            ({
                                "content_type": "text",
                                "title": el,
                                "payload": el
                            })
                        )
                        qReplies.push({
                            "content_type": "text",
                            "title": "&#8617",
                            "payload": `back`
                        })
                        await bot.reply(message, {
                            "text": `${key2} is selected`,
                            "quick_replies": qReplies
                        })
                    }  else {
                        if(key2){
                            let info = selected === 'Jason' ? jason : michael;
                            let qReplies = [{
                                "content_type": "text",
                                "title": "&#8617",
                                "payload": "back"
                            }]
                            console.log(key, key2, options[level][i])
                            await bot.reply(message, {
                                "text": `${info[key][key2][options[level][i]]}`,
                                "quick_replies": qReplies
                            })
                            // options.pop();
                            level++;
                        } else {
                            let info = selected === 'Jason' ? jason : michael;
                            let qReplies = [{
                                "content_type": "text",
                                "title": "&#8617",
                                "payload": "back"
                            }]
                            console.log(key, options[level][i], " hi")
                            await bot.reply(message, {
                                "text": `${info[key][options[level][i]]}`,
                                "quick_replies": qReplies
                            })
                            level++;
                            // options.pop();
                        }
                    }
                }
            }
        } else {
            // await bot.reply(message, `Input is not valid.`)
            console.log(options, level, "this is invalid tracker")
            console.log("THIS IS THE CURRENT OPTIONS",options[level])
            let qReplies = options[level] ? options[level].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
                ) : [];
            if(!qReplies || qReplies.length === 0) qReplies = [];
            tempReplies = qReplies

            console.log("This is TEMP",tempReplies)
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `back`
            })
            console.log("This is QREPLIES",qReplies)
            await bot.reply(message, {
                "text": `Input is not valid. Please select or type a valid input.`,
                "quick_replies": tempReplies
            })
        }
    })

    // controller.hears('back', )

}
