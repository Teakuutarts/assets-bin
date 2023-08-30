// server/src/index.js
const { missing, ThrowableRouter, withParams } = require("itty-router-extras");
const apollo = require("./handlers/apollo");
const index = require("./handlers/index");
const paste = require("./handlers/paste");
const playground = require("./handlers/playground");

const router = ThrowableRouter();

router.get("/", index);

router.all("/graphql", playground);

router.all("/__graphql", apollo);

router.get("/:uuid", withParams, paste);

router.all("*", () => missing("Not found"));

addEventListener("fetch", (event) => {
    event.respondWith(router.handle(event.request));
});

/*
idfk
here's what I am using
https://developers.cloudflare.com/workers/wrangler/workers-kv/
https://dash.cloudflare.com/08bdc2d0dc5f6cb17428fab0ae3ad915/workers/kv/namespaces
https://jerrynsh.com/how-to-build-a-pastebin-clone-for-free/
https://github.com/ai/nanoid?ref=jerrynsh.com
Example: https://github.com/ngshiheng/paste-story/releases/tag/paste-story-server-v1.0.2
*/