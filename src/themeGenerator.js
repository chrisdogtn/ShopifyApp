import JSZip from 'jszip';

// Generate a minimal Shopify theme ZIP from the current GrapesJS editor state
export async function generateThemeZip(editor) {
  const zip = new JSZip();

  // Gather HTML and CSS from editor
  const html = editor.getHtml();
  const css = editor.getCss();

  // Basic theme files
  zip.file(
    'layout/theme.liquid',
    `<!doctype html>\n<html lang="en">\n<head>\n  {{ content_for_header }}\n  <link rel="stylesheet" href="{{ 'theme.css' | asset_url }}">\n</head>\n<body>\n  {{ content_for_layout }}\n  <script src="{{ 'theme.js' | asset_url }}"></script>\n</body>\n</html>`
  );

  // Page template using the editor markup
  zip.file(
    'templates/index.liquid',
    html
  );

  // Assets collected from editor
  zip.file('assets/theme.css', css);
  zip.file('assets/theme.js', '');

  // Minimal settings file
  zip.file('config/settings_schema.json', '[]');

  return zip.generateAsync({ type: 'blob' });
}
