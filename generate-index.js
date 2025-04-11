import fs from "fs"
import path from "path"

const generateIndex = (dirPath) => {
  const files = fs.readdirSync(dirPath)
  const exportStatements = []

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file)
    const stat = fs.lstatSync(fullPath)

    if (stat.isDirectory()) {
      generateIndex(fullPath)
    } else if (
      file !== "index.js" &&
      (file.endsWith(".js") || file.endsWith(".jsx"))
    ) {
      const fileName = file.replace(/\.(js|jsx)$/, "")
      exportStatements.push(`export * from "./${fileName}";`)
    }
  })

  if (exportStatements.length > 0) {
    const indexPath = path.join(dirPath, "index.js")
    const indexFileContent = exportStatements.join("\n") + "\n"

    // Always write/overwrite index.js to keep it fresh
    fs.writeFileSync(indexPath, indexFileContent)
    console.log(`✅ Updated index.js at ${dirPath}`)
  }
}

// Run it on your src folder
generateIndex("./src")
