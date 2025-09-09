//  mockProdServer.ts

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
// You can use the import.meta.glob function to import all
// 导入所有的 mock 模块
import mockModules from '../mock/index';

// console.log('mockModules', mockModules);

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
