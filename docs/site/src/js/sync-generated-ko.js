// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require("path");

const CONTENT_ROOT = path.join(__dirname, "../../../content");
const KO_ROOT = path.join(
  __dirname,
  "../../../i18n/ko/docusaurus-plugin-content-docs/current",
);

const GENERATED_GROUPS = [
  "snippets/console-output",
  "references/framework",
  "references/sui-api/sui-graphql/alpha/reference",
  "references/sui-api/sui-graphql/beta/reference",
];

const GENERATED_FILES = ["references/awesome-sui.mdx"];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isDocFile(file) {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

function copyFileByRelativePath(relPath) {
  const source = path.join(CONTENT_ROOT, relPath);
  const target = path.join(KO_ROOT, relPath);
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function collectDocsRecursively(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const docs = [];
  const stack = [dir];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      const fullPath = path.join(cur, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && isDocFile(entry.name)) {
        docs.push(path.relative(CONTENT_ROOT, fullPath));
      }
    }
  }
  return docs.sort();
}

function main() {
  let copied = 0;

  for (const relFile of GENERATED_FILES) {
    const source = path.join(CONTENT_ROOT, relFile);
    if (!fs.existsSync(source)) {
      continue;
    }
    copyFileByRelativePath(relFile);
    copied += 1;
  }

  for (const group of GENERATED_GROUPS) {
    const absGroup = path.join(CONTENT_ROOT, group);
    const docs = collectDocsRecursively(absGroup);
    for (const relPath of docs) {
      copyFileByRelativePath(relPath);
      copied += 1;
    }
  }

  console.log(`✅ Synced generated docs to ko i18n: ${copied} files`);
}

main();
