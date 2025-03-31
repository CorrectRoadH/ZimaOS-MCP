// import { MCPTool } from "mcp-framework";
// import { z } from "zod";

// interface MovefilesInput {
//   message: string;
// }

// class MovefilesTool extends MCPTool<MovefilesInput> {
//   name = "MoveFiles";
//   description = "Movefiles tool description";

//   schema = {
//     message: {
//       type: z.string(),
//       description: "Message to process",
//     },
//   };

//   async execute(input: MovefilesInput) {
//     return `Processed: ${input.message}`;
//   }
// }

// export default MovefilesTool;