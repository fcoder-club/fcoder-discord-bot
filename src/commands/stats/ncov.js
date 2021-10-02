const {Command} = require("discord.js-commando");
const {MessageAttachment, MessageEmbed} = require("discord.js");
const {render, getData} = require("../../utils/ncov/ncov");

const MESSAGES = {
    COUNTRY_NOT_FOUND: "```diff\n- ERROR: Country not found\n```",
    ERROR: "```diff\n- ERROR: An error occurred\n```"
}

module.exports = class NCovCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ncov",
            description: "Show nCoV statistics",
            group: "stats",
            memberName: "ncov",
            aliases: ["covid", "corona"],
            args: [
                {
                    key: "country",
                    prompt: "country",
                    type: "string",
                    default: ""
                },
            ],
        });
    }

    run(message, args, fromPattern, result) {
        return getData(args.country)
            .then(async res => {
                if (res.status === 404) return message.reply(MESSAGES.COUNTRY_NOT_FOUND);
                if (res.status !== 200) return message.reply(`Error ${res.status}`);
                const data = res.data;
                const where = data.country ?? "Global";
                const wr = ((data.countryInfo && data.countryInfo.iso2) ?? "g").toLowerCase();
                const flag = (data.countryInfo && data.countryInfo.flag) ??
                    "https://via.placeholder.com/250x167.png?text=GLOBAL"; // default flag
                const buffer = await render(data);
                const name = `ncov-stats-${wr}.png`;
                const file = new MessageAttachment(buffer, name);
                const embed = new MessageEmbed()
                    .setColor(0x03c79b)
                    .setThumbnail(flag)
                    .setAuthor(`${where} nCoV statistics`, flag)
                    .setFooter("Last updated")
                    .setTimestamp(new Date(data.updated))
                    .attachFiles([file])
                    .setImage(`attachment://${name}`);
                return message.channel.send(embed);
            }).catch(e => {
                console.error(e);
                return message.reply(MESSAGES.ERROR);
            });
    }
};