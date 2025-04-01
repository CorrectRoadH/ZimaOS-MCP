# zimaos-mcp

A Model Context Protocol (MCP) server built with mcp-framework.

```json
{
  "mcpServers": {
    "zimaos-mcp-server": {
      "command": "npx",
      "args": ["zimaos-mcp"],
      "env": {
        "ZIMAOS_API_BASE": "http://[your-zimaos-host-ip]",
        "ZIMAOS_USERNAME": "[your zimaos username]",
        "ZIMAOS_PASSWORD": "[your zimaos password]"
      }
    }
  }
}
```