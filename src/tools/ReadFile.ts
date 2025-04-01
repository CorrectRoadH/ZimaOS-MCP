import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { FileAPI } from "../lib/getAxios";

interface GetfilecontentInput {
  file_path: string;
}

class ReadFile extends MCPTool<GetfilecontentInput> {
  name = "read_file_from_zimaos";
  description = "Read the complete contents of a file from ZimaOS. " +
          "Handles various text encodings and provides detailed error messages " +
          "if the file cannot be read. Use this tool when you need to examine " +
          "the contents of a single file.";

  schema = {
    file_path: {
      type: z.string(),
      description: "file path in ZimaOS",
    },
  };

  async execute(input: GetfilecontentInput) { 
    try {
      const api = FileAPI()
      const res = await api.getFileDownload(input.file_path)
      return `${res.data.data}`;
    } catch (error) {
      return `Failed to read resource: ${error}`;
    }
  }
}

export default ReadFile;