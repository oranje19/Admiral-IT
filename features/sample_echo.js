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

    controller.hears('test','message,direct_message', async(bot, message) => {
        await bot.reply(message, jason["work"][0]["company"]);
    });

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    controller.hears( 'michael|jason', 'message,direct_message', async(bot, message) => {
        if(message.text.toLowerCase().includes(`michael`) && message.text.toLowerCase().includes("jason")){
            await bot.reply(message, `Michael and Jason can not be selected at the same time`)
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
            console.log(options)
            // make button to show up

        }
    })

    controller.hears('work', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            await bot.reply(message, `${selected}'s work is selected.`)
            let info = selected === 'Jason' ? jason : michael;
            
        }
    })

    controller.hears('project', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            await bot.reply(message, `${selected}'s project is selected.`)
        }
    })

    controller.hears('education', 'message,direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, `Please select Michael or Jason to proceed.`)
        } else {
            await bot.reply(message, `${selected}'s education is selected.`)
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
        }
    })

    controller.hears('languages', 'message, direct_message', async(bot, message) => {
        if (selected === '') {
            await bot.reply(message, 'Please select Michael or Jason to proceed.')
        } else {
            if(selected === 'Jason') {
                // interate through Jason's languages and fluency assign to string
                
            } else {
                
            }
            await bot.reply(message, `${selected}' speaks...`)
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
                        key2 = options[i]
                        await bot.reply(message, `${key2} is selected.`)
                    }  else {
                        if(key2){
                            let info = selected === 'Jason' ? jason : michael;
                            await bot.reply(message, `${selected}'s ${options[i]} is ${info[key][key2][options[i]]}`)
                        } else {
                            let info = selected === 'Jason' ? jason : michael;
                            await bot.reply(message, `${selected}'s ${options[i]} is ${info[key][options[i]]}`)
                        }
                    }
                }
            }
        }
    })

    // controller.hears('back', )

}
