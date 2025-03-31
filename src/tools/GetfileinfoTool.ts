// import { MCPTool } from "mcp-framework";
// import { z } from "zod";

// interface GetfileinfoInput {
//   message: string;
// }

// class GetfileinfoTool extends MCPTool<GetfileinfoInput> {
//   name = "GetFileInfo";
//   description = "Getfileinfo tool description";

//   schema = {
//     message: {
//       type: z.string(),
//       description: "Message to process",
//     },
//   };

//   async execute(input: GetfileinfoInput) {
//     return `Processed: ${input.message}`;
//   }
// }

// export default GetfileinfoTool;