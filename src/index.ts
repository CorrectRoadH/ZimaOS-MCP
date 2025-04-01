import { MCPServer } from "mcp-framework";

// 实现一个登录功能
const host = process.env.ZIMAOS_API_BASE
const url = `${host}/v1/users/login`
const username = process.env.ZIMAOS_USERNAME
const password = process.env.ZIMAOS_PASSWORD
const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
})
if (res.status !== 200) {
    throw new Error(res.statusText)
}

const data = await res.json()
const token = data.data.token.access_token
process.env.ZIMAOS_API_TOKEN = token;


const server = new MCPServer();

server.start();