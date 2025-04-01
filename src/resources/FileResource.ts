// import { MCPResource, type ResourceContent } from "mcp-framework";
// import { FileAPI } from "../lib/getAxios";

// class FileResource extends MCPResource {
//   uri = "zimaos://File";
//   name = "File";
//   description = "File resource on Your ZimaOS";
//   mimeType = "application/json";

//   async read(): Promise<ResourceContent[]> {
//     const file_path = this.uri.split("zimaos://")[1]
//     const api = FileAPI()
//     const res = await api.getFileDownload(file_path)

//     return [
//       {
//         uri: this.uri,
//         mimeType: this.mimeType,
//         text: res.data.data,
//       },
//     ];
//   }
// }

// export default FileResource;