import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { FileAPI } from "../lib/getAxios";

interface EditFileInput {
  path: string;
  content: string;
}

class EditFileTool extends MCPTool<EditFileInput> {
  name = "edit_file_zimaos";
  description = "Edit a file in ZimaOS. " +
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

  async execute(input: EditFileInput) {
    try {
      const res = await FileAPI().putFile({
        path: input.path,
        content: input.content,
      })
      return `Edit file success, file path: ${input.path}`;
    } catch (error) {
      return `Edit file failed, error info: ${error}`;
    }
  }
}

export default EditFileTool;