import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { StorageAPI } from "../lib/getAxios";

interface ListAllowedDirectoriesInput {
  message: string;
}

class ListAllowedDirectoriesTool extends MCPTool<ListAllowedDirectoriesInput> {
  name = "list_allowed_directories_zimaos";
  description = "Returns the list of directories that this server is allowed to access in ZimaOS. " +
  "Use this to understand which directories are available before trying to access files.";

  // 这里有一个问题是，如果上面是空的，生成出来有问题
  schema = {
    message: {
      type: z.string(),
      description: "anything",
    },
  };

  async execute(input: ListAllowedDirectoriesInput) {
    try {
      const storageList = await StorageAPI().getAllStorages()
      return `Allowed directories:\n${storageList.data?.map(
        (storage) => {
        return storage.path
      }
    ).join("\n")}`
    } catch (error) {
      return `get allowed directories failed, error info: ${error}`;
    }
  }
}

export default ListAllowedDirectoriesTool;