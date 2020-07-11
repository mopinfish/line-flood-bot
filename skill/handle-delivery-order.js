"use strict";

module.exports = class SkillHandleDeliveryOrder {

    constructor(){
        this.required_parameter = {
            menu: {
                message_to_confirm: {
                    type: "template",
                    altText: "出前のメニューは松、竹、梅の3種類になっとりますけどどちらにしましょっ？",
                    template: {
                        type: "buttons",
                        text: "ご注文は？",
                        actions: [
                            {type: "message", label: "ラーメン", text: "ラーメン"},
                            {type: "message", label: "うどん", text: "うどん"},
                            {type: "message", label: "そば", text: "そば"}
                        ]
                    }
                },
                parser: async (value, bot, event, context) => {
                    if (["ラーメン", "うどん", "そば"].includes(value)) {
                        return value;
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `あいよっ！${value}ね。`
                    });
                }
            },
            address: {
                message_to_confirm: {
                    type: "text",
                    text: "どちらにお届けしましょっ？"
                },
                parser: async (value, bot, event, context) => {
                    if (typeof value == "string"){
                        return value;
                    } else if (typeof value == "object" && value.type == "location"){
                        return value.address;
                    }

                    throw new Error();
                }
            }
        }
    }

    async finish(bot, event, context){
        await bot.reply({
            type: "text",
            text: `あいよっ。じゃあ${context.confirmed.menu}を30分後くらいに${context.confirmed.address}にお届けしますわ。おおきに。`
        });
    }

}