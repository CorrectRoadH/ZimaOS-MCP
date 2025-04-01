import { MCPPrompt } from "mcp-framework";
import { z } from "zod";

interface AnalyzeDiskInput {
  message: string;
}

class AnalyzeDiskPrompt extends MCPPrompt<AnalyzeDiskInput> {
  name = "analyze-disk";
  description = "Analyze File Usage";

  schema = {
    message: {
      type: z.string(),
      description: "Message to process",
      required: true,
    },
  };

  async generateMessages({ message }: AnalyzeDiskInput) {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: "call get_file_info_zimaos tool to get the file or folder size info",
        },
      },
    ];
  }
}

export default AnalyzeDiskPrompt;