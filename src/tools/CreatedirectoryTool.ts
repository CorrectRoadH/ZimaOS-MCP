import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { FolderAPI } from "../lib/getAxios";

interface CreateDirectoryInput {
  path: string;
}

class CreateDirectoryTool extends MCPTool<CreateDirectoryInput> {
  name = "create_directory_zimaos";
  description = "Create a new directory or ensure a directory exists in Your ZimaOS. Can create multiple " +
  "nested directories in one operation. If the directory already exists, " +
  "this operation will succeed silently. Perfect for setting up directory " +
  "structures for projects or ensuring required paths exist.";

  schema = {
    path: {
      type: z.string(),
      description: "path to create",
    },
  };

  async execute(input: CreateDirectoryInput) {
    try {
      await FolderAPI().createFolder({
        path: input.path,
      })
      return `Successfully created directory: ${input.path}`;
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}

export default CreateDirectoryTool;