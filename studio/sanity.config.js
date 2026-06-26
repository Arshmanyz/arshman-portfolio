import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { productType } from './schemaTypes/product.js';
import { resourceType } from './schemaTypes/resource.js';
import { siteSettingsType } from './schemaTypes/siteSettings.js';

export default defineConfig({
  name: 'default',
  title: 'Arshman Portfolio',
  projectId: 'j5cki43u',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  vite: {
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/dist/**', '**/.sanity/**']
      }
    }
  },
  schema: {
    types: [productType, resourceType, siteSettingsType]
  }
});
