const { Command } = require("discord.js-commando");

module.exports = class Nick extends Command {
    constructor(client) {
        super(client, {
            name: "nick",
            memberName: "nick",
            clientPermissions: ["MANAGE_NICKNAMES"],
            userPermissions: ["MANAGE_NICKNAMES"],
            description: "Change nickname",
            group: "manager",
            args: [
                {
                    key: "name",
                    prompt: "name",
                    type: "string",
                    default: "",
                },
                {
                    key: "code",
                    prompt: "code",
                    type: "string",
                    default: "",
                },
            ],
        });
    }

    run(message, args, fromPattern, result) {
        let nameArr = args.name.split("-");
        nameArr = nameArr.map((name) => name.charAt(0).toUpperCase() + name.slice(1));

        let codeArr = args.code.split("");
        codeArr = codeArr.map((code) => code.charAt(0).toUpperCase() + code.charAt(1).toUpperCase() + code.slice(2));

        message.reply(nameArr.join(" ") + " - " + codeArr.join(""));
        return;
        message.member
            .setNickname(args.name.replaceAll("-", " ") + " - " + args.code)
            .then(() => message.reply("Done"));
    }
};
