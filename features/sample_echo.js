/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import * as jason from '../resumes/jason.json';
// import { michael } from '../resumes/michael.js';
var jason = require('../resumes/jason.json')
var michael = require('../resumes/michael.json')

module.exports = function(controller) {

    let selected = "";
    let key = "";
    let key2 = false;
    let options;
    // export let buttonSet = "names"

    // controller.hears('test','message,direct_message', async(bot, message) => {
    //     await bot.reply(message, jason["work"][0]["company"]);
    // });

    // controller.hears('sample','message,direct_message', async(bot, message) => {
    //     await bot.reply(message, 'I heard a sample message.');
    // });

    // document.addEventListener("DOMContentLoaded", function () {
        // let buttonReplies = document.getElementById("button_replies");
        // console.log(buttonReplies)
    // })

    // let buttonReplies = document.getElementById("button_replies");
    // console.log(buttonReplies)

    // const buttonReplies = document.querySelector('#button_replies')

    // buttonReplies.addEventListener('DOMContentLoaded', function() {
    //     console.log(buttonReplies)
    //     console.log("It goes through!")
    // })


    // botkit.hears(['hello'], 'message', async (bot, message) => {
    //     await bot.beginDialog('welcome');
    // });

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
    })

    controller.hears( 'michael|jason', 'message,direct_message', async(bot, message) => {
        if(message.text.toLowerCase().includes(`michael`) && message.text.toLowerCase().includes("jason")){
            await bot.reply(message, {
                "text": "Please select Michael or Jason",
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
            let vars = Object.keys(michael);
            let qReplies = vars.map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": "jason michael"
            })
            await bot.reply(message, {
                "text": `${selected} is selected`,
                "quick_replies": qReplies
            })
        } else if(message.text.toLowerCase().includes("jason")){
            selected = "Jason"
            let vars = Object.keys(jason);
            let qReplies = vars.map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            // console.log(qReplies)
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": "jason michael"
            })
            await bot.reply(message, {
                "text": `${selected} is selected`,
                "quick_replies": qReplies
            })
        } 
    })

    controller.hears('basics', 'message,direct_message', async(bot, message) => {
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
        } else {
            // console.log("here")
            // await bot.reply(message, `${selected}'s basics are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = [Object.keys(info['Basics'])]
            let qReplies = options[options.length-1].map(el => 
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Basics"
            key2 = false;
            console.log(options)
            // make button to show up
            await bot.reply(message, {
                "text": `${key} is selected`,
                "quick_replies": qReplies
            })

        }
    })

    controller.hears('profiles', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // console.log("here")
            // await bot.reply(message, `${selected}'s profiles are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = [Object.keys(info['Profiles'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Profiles"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} are selected`,
                "quick_replies": qReplies
            })
            // console.log(options)
            // make button to show up
            

        }
    })

    controller.hears('work', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // await bot.reply(message, `${selected}'s work is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = [Object.keys(info['Work'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Work"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} is selected`,
                "quick_replies": qReplies
            })
        }
    })

    controller.hears('project', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // await bot.reply(message, `${selected}'s project is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = [Object.keys(info['Project'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Project"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} is selected`,
                "quick_replies": qReplies
            })
        }
    })

    controller.hears('education', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // await bot.reply(message, `${selected}'s education is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = [Object.keys(info['Education'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Education"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} is selected`,
                "quick_replies": qReplies
            })
        }
    })

    controller.hears('skills', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // await bot.reply(message, `${selected}'s skills are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = [Object.keys(info['Skills'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Skills"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} are selected`,
                "quick_replies": qReplies
            })
        }
    })

    controller.hears('languages', 'message, direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // await bot.reply(message, `${selected}'s languages are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = [Object.keys(info['Languages'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
            )
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            key = "Languages"
            key2 = false;
            await bot.reply(message, {
                "text": `${key} are selected`,
                "quick_replies": qReplies
            })
        }
    })
    
    controller.hears('interests', 'message, direct_message', async(bot, message) => {
        if (selected === '') {
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
        } else {
            // if(selected === "Jason") {
            //     // Iterate through Jason's interests assign to string
            //     let str = '';
            //     await bot.reply(message, `${selected}'s interests are ${str}`);
            // } else {
            //     // Iterate through Michael's interests assign to string
            //     let str = '';
            //     await bot.reply(message, `${selected}'s interests are ${str}`);
            //     options = Object.keys(info['interests'])
            // }
            let info = selected === "Jason" ? jason : michael;
            options = [Object.keys(info['Interests'])]
            let qReplies = options[options.length-1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
                )
                qReplies.push({
                    "content_type": "text",
                    // we can add a back/prev button on title 
                    "title": "&#8617",
                    "payload": `${selected}`
                })
                key = "Interests"
                key2 = false;
                await bot.reply(message, {
                    "text": `${key} is selected`,
                    "quick_replies": qReplies
                })
            }
    })

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

    controller.hears('', 'message, direct_message', async(bot, message) => {
        console.log("hello: ", options)
        let temp = options[options.length - 1].length;
        // console.log("this is", temp)
        // console.log(options)
        let new_msg = message.text.toLowerCase();
        let lowerCase = options[options.length-1].slice(0).map(option => option.toLowerCase())
        if (lowerCase.includes(new_msg)) {
            console.log(options);
            for (let i = 0; i < temp; i++) {
                // console.log(options[i]);
                // console.log(i);
                // console.log(message, message.text)
                if (new_msg === lowerCase[i]) {
                    let info = selected === 'Jason' ? jason : michael;
                    if (typeof info[key][options[options.length-1][i]] === 'object' && info[key][options[options.length-1][i]] !== null) {
                        // for (let j = 0; j < options[i].length; j++) {
                            
                        // }
                        // key2 = options[i];
                        console.log(key)
                        console.log(options[i])
                        console.log(info[key][options[i]])
                        key2 = options[options.length-1][i]

                        options.push(Object.keys(info[key][key2]))
                        console.log(options)
                        // await bot.reply(message, `${key2} is selected.`)
                        let qReplies = options[options.length-1].map(el =>
                            ({
                                "content_type": "text",
                                "title": el,
                                "payload": el
                            })
                        )
                        qReplies.push({
                            "content_type": "text",
                            // we can add a back/prev button on title 
                            "title": "&#8617",
                            "payload": `${key}`
                        })
                        // key = key2
                        // key2 = false;
                        console.log(options)
                        // make button to show up
                        await bot.reply(message, {
                            "text": `${key2} is selected`,
                            "quick_replies": qReplies
                        })
                    }  else {
                        if(key2){
                            let info = selected === 'Jason' ? jason : michael;
                            // await bot.reply(message, `${options[i][0].toUpperCase() + options[i].slice(1)} is ${info[key][key2][options[i]]}`)
                            let qReplies = [{
                                "content_type": "text",
                                "title": "&#8617",
                                "payload": key2
                            }]
                            await bot.reply(message, {
                                // `${options[options.length-1][i][0].toUpperCase() + options[options.length-1][i].slice(1)} is
                                "text": `${info[key][key2][options[options.length-1][i]]}`,
                                "quick_replies": qReplies
                            })
                            options.pop();
                        } else {
                            let info = selected === 'Jason' ? jason : michael;
                            // await bot.reply(message, `${options[i][0].toUpperCase() + options[i].slice(1)} is ${info[key][options[i]]}`)
                            let qReplies = [{
                                "content_type": "text",
                                "title": "&#8617",
                                "payload": key
                            }]
                            await bot.reply(message, {
                                // `${options[options.length-1][i][0].toUpperCase() + options[options.length-1][i].slice(1)} is `
                                "text": `${info[key][options[options.length-1][i]]}`,
                                "quick_replies": qReplies
                            })
                            options.pop();
                        }
                    }
                }
            }
        } else {
            // await bot.reply(message, `Input is not valid.`)
            let qReplies = options[options.length - 1].map(el =>
                ({
                    "content_type": "text",
                    "title": el,
                    "payload": el
                })
                )
            if(!qReplies || qReplies.length === 0) qReplies = [
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
                ];
            tempReplies = qReplies

            console.log("This is TEMP",tempReplies)
            qReplies.push({
                "content_type": "text",
                // we can add a back/prev button on title 
                "title": "&#8617",
                "payload": `${selected}`
            })
            console.log("This is QREPLIES",qReplies)
            // key = "Interests"
            // key2 = false;
            await bot.reply(message, {
                "text": `Input is not valid. Please select or type a valid input.`,
                "quick_replies": tempReplies
            })
        }
    })

    // controller.hears('back', )

}
