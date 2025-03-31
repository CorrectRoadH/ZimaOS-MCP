import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { FileAPI } from "../lib/getAxios";

interface GetFileInfoInput {
  path: string;
}

class GetFileInfoTool extends MCPTool<GetFileInfoInput> {
  name = "get_file_info_zimaos";
  description = "Retrieve detailed metadata about a file or directory in ZimaOS. Returns comprehensive " +
  "information including size(contains the size of the file or directory), is_dir, file item " +
  "This tool is perfect for understanding file characteristics " +
  "without reading the actual content. Only works within allowed directories.";


  schema = {
    path: {
      type: z.string(),
      description: "Path to the file or directory",
    },
  };

  async execute(input: GetFileInfoInput) {
    try {
      const fileInfo = await FileAPI().getFileOrFolderStats([input.path])
      return `File info: ${JSON.stringify(fileInfo.data.data)}`;
    } catch (error) {
      return `get file info failed, please check the path, error info: ${error}`;
    }
  }
}

export default GetFileInfoTool;