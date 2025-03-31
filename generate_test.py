import yaml
from generate import generate_input_interface
import pytest


def test_generate_interface():
    openapi_file = '/Users/ctrdh/Code/ZimaOS-MCP/IceWhale-OpenAPI/icewhale-files/openapi.yaml'
    with open(openapi_file, 'r') as file:
        openapi_data = yaml.safe_load(file)

        copy_item = openapi_data["paths"]['/task/copy']

        input_interface = generate_input_interface(copy_item,openapi_data)        
        
        # 验证工具名称是否正确
        assert input_interface == """{
            src: string;
            dst: string;
            user_select: string;
        }"""
        

# def test_generate_interface_with_invalid_input():
#     # 测试空输入
#     with pytest.raises(ValueError):
#         generate_input_interface(None)
    
#     # 测试无效的路径项
#     with pytest.raises(KeyError):
#         generate_input_interface({})
