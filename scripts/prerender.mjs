// Pre-render the home page in both languages into static HTML so the first paint does not
// wait for JavaScript. The client hydrates it (src/main.tsx). Run after both Vite builds.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const [url, file] of [
  ['/', 'dist/index.html'],
  ['/en', 'dist/en/index.html'],
]) {
  const { html, lang, dir, title, description } = render(url)
  const page = template
    .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${lang}" dir="${dir}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${url}">${html}</div>`)
  await mkdir(dirname(resolve(root, file)), { recursive: true })
  await writeFile(resolve(root, file), page)
  console.log(`prerendered ${url} -> ${file} (${(page.length / 1024).toFixed(0)} KiB)`)
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
