const {Command} = require("discord.js-commando");

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
                    key: "member",
                    prompt: "member",
                    type: "member",
                },
                {
                    key: "nick",
                    prompt: "nick",
                    type: "string",
                    default: "",
                },
            ]
        });
    }

    run(message, args, fromPattern, result) {
        return args.member.setNickname(args.nick).then(() => message.reply("Done"));
    }
}