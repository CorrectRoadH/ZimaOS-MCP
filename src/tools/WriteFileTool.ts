import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { FileAPI } from "../lib/getAxios";

interface WriteFileInput {
  path: string;
  content: string;
}

class WriteFileTool extends MCPTool<WriteFileInput> {
  name = "write_file_zimaos";
  description = "Write a file in ZimaOS. " +
  "Use with caution as it will overwrite existing files without warning. " +
  "Handles text content with proper encoding. Only works within allowed directories.";

  schema = {
    path: {
      type: z.string(),
      description: "Path to the file in ZimaOS",
    },
    content: {
      type: z.string(),
      description: "Content to write to the file",
    },
  };

  async execute(input: WriteFileInput) {
    try {
      await FileAPI().postCreateFile({
        path: input.path,
      })
      await FileAPI().putFile({
        path: input.path,
        content: input.content,
      })
      return `Write file success, file path: ${input.path}`;
    } catch (error) {
      return `Write file failed, error info: ${error}`;
    }
  }
}

export default WriteFileTool;