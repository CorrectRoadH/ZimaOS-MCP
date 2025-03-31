import yaml  # 添加这一行导入yaml模块
import os  # 添加这一行导入os模块

def generate_schema(method_item):
    schema = {}
    # for param in method_item['parameters']:
    #     schema[param['name']] = {
    #         'type': param['schema']['type'],
    #         'description': param['description']
    #     }
    return str(schema)

def generate_input_interface(method_item,yaml_data):
    interface_lines = []

    parameters = method_item.get('parameters', [])
    for param in parameters:
        interface_lines.append(f"{param['name']}: {param['schema']['type']};")
    
    request_body = method_item.get('requestBody', {})
    if request_body.get('$ref'):
      define_body = yaml_data['components']['requestBodies'][request_body['$ref']]
      for param in define_body['content']['application/json']['schema']['properties']:
        interface_lines.append(f"{param['name']}: {param['schema']['type']};")
    elif request_body.get('content'):
      for param in request_body['content']['application/json']['schema']['properties']:
        interface_lines.append(f"{param['name']}: {param['schema']['type']};")
    return "{" + "\n  ".join(interface_lines) + "}"

def generate_tool(openapi_file):
    with open(openapi_file, 'r') as file:
        openapi_data = yaml.safe_load(file)
    
    for path, path_item in openapi_data["paths"].items():
        for method, method_item in path_item.items():
            input_interface = generate_input_interface(method_item, openapi_data)
            tool_name = method_item['operationId']

            with open(f"src/tools/{method_item['operationId']}.ts", "w") as file:
                file.write(f"""import {{ MCPTool }} from "mcp-framework";
import {{ z }} from "zod";
import {{ Configuration, TaskApi }} from '@icewhale/icewhale-files-openapi'
import axios from "axios";

function getHostAndToken() {{
  const host = process.env.ZIMAOS_API_BASE
  const token = process.env.ZIMAOS_API_TOKEN
  return {{ host, token }}
}}

interface {method_item['operationId']}Input {{
  src: string;
  dst: string;
}}

class {method_item['operationId']}Tool extends MCPTool<{method_item['operationId']}Input> {{
  name = "{method_item['operationId']}";
  description = "{method_item.get('summary',method_item.get('description'))}";

  schema = {
    {generate_schema(method_item)}
  };

  async execute(input: {method_item['operationId']}Input) {{
    const {{ host, token }} = getHostAndToken()
    try {{
      const req = axios.create({{
        baseURL: `${{host}}/v2_1/files`,
        headers: {{
          'Authorization': token
        }}
      }})

    const config = new Configuration({{}})
    const api = new TaskApi(config, '', req)
    const res = await api.copyFileOrFolder()
      return ``;
    }} catch (error) {{
      return `${{error}}`;
    }}
  }}
}}

export default {method_item['operationId']}Tool;""")


if __name__ == "__main__":
    path = ["/Users/ctrdh/Code/ZimaOS-MCP/IceWhale-OpenAPI/icewhale-files/openapi.yaml"]
    for p in path:
        generate_tool(p)