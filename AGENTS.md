<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->
1. Strictly use Shadcn for UI.
   1. Use the Shadcn skill under `.agents/skills/shadcn` and prompt the user to Install the appropriate MCP Server for shadcn according to their dev environment. For VSCode, use `bunx --bun shadcn@latest mcp init --client vscode` to install the Shadcn MCP Server.
2. Use ample amount of white-spacing.
3. Keep the UI Minimal and SaaS looking.
4. DO NOT CHANGE ANY OF THE STYLES FILE UNDER `/src/styles` ONLY UPDATE THE INDIVIDUAL SHADCN COMPONENT FILES.
<!-- END:project-agent-rules -->