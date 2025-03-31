import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { StorageAPI } from "../lib/getAxios";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ListAllowedDirectoriesInput {
  // 空接口，因为不需要任何输入
}

class ListAllowedDirectoriesTool extends MCPTool<ListAllowedDirectoriesInput> {
  name = "list_allowed_directories_zimaos";
  description = "Returns the list of directories that this server is allowed to access in ZimaOS. " +
  "Use this to understand which directories are available before trying to access files.";

  schema = z.object({});  // 使用空对象schema

  async execute(input: ListAllowedDirectoriesInput) {
    const storageList = await StorageAPI().getAllStorages()
    return `Allowed directories:\n${storageList.data?.map(
      (storage) => {
        return storage.path
      }
    ).join("\n")}`
  }
}

export default ListAllowedDirectoriesTool;