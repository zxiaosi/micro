//  mockProdServer.ts

import { createProdMockServer } from 'vite-plugin-mock/client';

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
// You can use the import.meta.glob function to import all
import testModule from '../mock/production/getRoutes';

export function setupProdMockServer() {
  createProdMockServer([...testModule]);
}
