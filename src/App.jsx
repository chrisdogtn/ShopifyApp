import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import basicBlocks from 'grapesjs-blocks-basic';
import { saveAs } from 'file-saver';
import { generateThemeZip } from './themeGenerator';
import { fetchProducts } from './shopify';

export default function App() {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      storageManager: false,
      plugins: [basicBlocks],
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Tablet', width: '768px' },
          { name: 'Mobile', width: '320px' },
        ],
      },
    });

    editor.Panels.addButton('options', {
      id: 'export-theme',
      className: 'fa fa-download',
      command: 'export-theme',
      attributes: { title: 'Export Shopify Theme' },
    });

    editor.Commands.add('export-theme', {
      run: async (ed) => {
        const zip = await generateThemeZip(ed);
        saveAs(zip, 'shopify-theme.zip');
      },
    });

    // Example of live store integration
    fetchProducts().then((prods) => {
      console.log(`Loaded ${prods.length} products from store`);
    }).catch(console.error);

    return () => editor.destroy();
  }, []);

  return <div id="gjs" style={{ height: '100vh', overflow: 'hidden' }} />;
}
