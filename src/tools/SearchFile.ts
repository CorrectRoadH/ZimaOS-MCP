import { MCPTool } from "mcp-framework";
import { z } from "zod";

import { SearchAPI } from "../lib/getAxios";

interface SearchFileInput {
  content_or_filename: string;
}

class SearchFileTool extends MCPTool<SearchFileInput> {
  name = "search_file_zimaos";
  description = "Recursively search for files and directories matching a pattern and file content in Your ZimaOS. " +
  "Searches through all subdirectories from the starting path. The search " +
  "is case-insensitive and matches partial names. Returns full paths to all " +
  "matching items. Great for finding files when you don't know their exact location. ";

  schema = {
    content_or_filename: {
      type: z.string(),
      description: "content to search",
    },
  };

  async execute(input: SearchFileInput) {

    try {
      const res = await SearchAPI().searchFile({
        keyword: input.content_or_filename,
        dir: ''
      })
    
      if (res.data.data?.hits?.length === 0) {
        return "No matches found in ZimaOS";
      }

      return res.data.data?.hits?.map((hit) => `${hit._source?.dir}/${hit._source?.name}`).join('\n');
    } catch (error) {
      return `Error: ${error}`;
    }
  }
}

export default SearchFileTool;