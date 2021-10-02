const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require("path");
const {SQLiteProvider, CommandoClient} = require("discord.js-commando");

(async () => {
    if (!process.env.BOT_TOKEN) {
        console.error("Cannot login without token!");
        process.exit(1);
    }
    const client = new CommandoClient({
        commandPrefix: '^',
        owner: ["390496098051162114"]
    });
    console.log("Registering commands...");
    client.registry
        .registerGroups([
            ["stats", "Statistics"],
            ["util", "Utilities"],
            ["manager", "Manager"],
        ])
        .registerDefaultTypes()
        .registerCommandsIn(path.join(__dirname, "commands"))
    ;
    client.registry.commands.forEach((k, v) => console.log(`Command ${v} has been registered`));
    client.setProvider(sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
    }).then(db => new SQLiteProvider(db))).catch(console.error);
    console.log("Logging in...");
    try {
        await client.login(process.env.BOT_TOKEN);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    console.log(`Logged in as ${client.user.tag}`);
})();
