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
    let options = "";
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

    controller.hears( 'michael|jason', 'message,direct_message', async(bot, message) => {
        if(message.text.toLowerCase().includes(`michael`) && message.text.toLowerCase().includes("jason")){
            await bot.reply(message, {
                "text": "You can not select Jason and Michael at the same time",
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
            await bot.reply(message, `${selected} is now selected`)
        } else if(message.text.toLowerCase().includes("jason")){
            selected = "Jason"
            await bot.reply(message, `${selected} is now selected`)
        }
    })

    controller.hears('basics', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            // console.log("here")
            await bot.reply(message, `${selected}'s basics are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = Object.keys(info['basics'])
            key = "basics"
            key2 = false;
            console.log(options)
            // make button to show up

        }
    })

    controller.hears('profiles', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            // console.log("here")
            await bot.reply(message, `${selected}'s profiles are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = Object.keys(info['profiles'])
            key = "profiles"
            key2 = false;
            // console.log(options)
            // make button to show up

        }
    })

    controller.hears('work', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            await bot.reply(message, `${selected}'s work is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = Object.keys(info['work'])
            key = "work"
            key2 = false;
        }
    })

    controller.hears('project', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            await bot.reply(message, `${selected}'s project is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = Object.keys(info['project'])
            key = "project"
            key2 = false;
        }
    })

    controller.hears('education', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, `Please select Michael or Jason to proceed.`)
        } else {
            await bot.reply(message, `${selected}'s education is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            options = Object.keys(info['education'])
            key = "education"
            key2 = false;
        }
    })

    controller.hears('skills', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, `Please select Michael or Jason to proceed.`)
        } else {
            await bot.reply(message, `${selected}'s skills are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = Object.keys(info['skills'])
            key = "skills"
            key2 = false;
        }
    })

    controller.hears('languages', 'message, direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, `Please select Michael or Jason to proceed.`)
        } else {
            await bot.reply(message, `${selected}'s languages are selected`)
            let info = selected === "Jason" ? jason : michael;
            options = Object.keys(info['languages'])
            key = "languages"
            key2 = false;
        }
    })
    
    controller.hears('interests', 'message, direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            if(selected === "Jason") {
                // Iterate through Jason's interests assign to string
                let str = '';
                await bot.reply(message, `${selected}'s interests are ${str}`);
            } else {
                // Iterate through Michael's interests assign to string
                let str = '';
                await bot.reply(message, `${selected}'s interests are ${str}`);
                options = Object.keys(info['interests'])
                key = "interests"
                key2 = false;
            }
        }
    })

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

    controller.hears('', 'message, direct_message', async(bot, message) => {
        if (options.includes(message.text)) {
            for (let i = 0; i < options.length; i++) {
                // console.log(options[i]);
                // console.log(i);
                // console.log(message, message.text)
                if (message.text === options[i]) {
                    let info = selected === 'Jason' ? jason : michael;
                    if (typeof info[key][options[i]] === 'object' && info[key][options[i]] !== null) {
                        // for (let j = 0; j < options[i].length; j++) {
                            
                        // }
                        // key2 = options[i];
                        console.log(key)
                        console.log(options[i])
                        console.log(info[key][options[i]])
                        key2 = options[i]

                        options = Object.keys(info[key][key2])
                        console.log(options)
                        await bot.reply(message, `${key2} is selected.`)
                    }  else {
                        if(key2){
                            let info = selected === 'Jason' ? jason : michael;
                            await bot.reply(message, `${options[i][0].toUpperCase() + options[i].slice(1)} is ${info[key][key2][options[i]]}`)
                        } else {
                            let info = selected === 'Jason' ? jason : michael;
                            await bot.reply(message, `${options[i][0].toUpperCase() + options[i].slice(1)} is ${info[key][options[i]]}`)
                        }
                    }
                }
            }
        } else {
            await bot.reply(message, `Input is not valid.`)
        }
    })

    // controller.hears('back', )

}
