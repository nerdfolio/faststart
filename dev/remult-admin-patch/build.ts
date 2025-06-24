import fs from 'node:fs'

// Do some string replacement magic both to clean it and
// to work around a bug in @rollup/plugin-commonjs where huge strings are not treated as string
//
const html = fs.readFileSync('tmp/index.html', 'utf8')
  .split("\n")
  .map(line => line.trim()).join("")
  .replaceAll("'", "__SQ__")
  .replaceAll('"', "'")
  .replaceAll("__SQ__", '"')
  .replaceAll("``", "''")
  .replaceAll("typeof", "__TYPEOF__")

fs.writeFileSync(
  './get-remult-admin-html_1.ts',
  `export function getHtml(){
  return ${JSON.stringify(html)}.replaceAll("__TYPEOF__", "typeof")
}`,
  'utf8',
)
