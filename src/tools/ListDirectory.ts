import { FileAPI } from "../lib/getAxios";
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface ListDirectoryInput {
  dir_path: string;
}

class ListDirectoryTool extends MCPTool<ListDirectoryInput> {
  name = "list_directory_zimaos";
  description = "Get a detailed listing of all files and directories in a specified path in Your ZimaOS. " +
          "Results clearly distinguish between files and directories with [FILE] and [DIR] " +
          "prefixes. This tool is essential for understanding directory structure and " +
          "finding specific files within a directory.";

  schema = {
    dir_path: {
      type: z.string(),
      description: "dir path in ZimaOS",
    },
  };

  async execute(input: ListDirectoryInput) {
    try {
      const res = await FileAPI().getFiles(input.dir_path, 0, 100000, 'true', 'name', 'asc')
      return res.data.content
        ?.map((file) => `${file?.is_dir ? '[DIR]' : '[FILE]'} ${file?.name}`)
        .join('\n');
    } catch (error) {
      return `get file list failed, please check the dir path, error info: ${error}`;
    }
  }
}

export default ListDirectoryTool;