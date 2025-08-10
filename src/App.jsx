import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

export default function App() {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      storageManager: false,
      plugins: [],
    });
    return () => editor.destroy();
  }, []);

  return <div id="gjs" style={{ height: '100vh', overflow: 'hidden' }} />;
}
