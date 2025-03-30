import fs from "fs"
import path from "path"

const generateIndex = (dirPath) => {
  // console.log("Reading files from:", dirPath)

  // Read the contents of the directory
  const files = fs.readdirSync(dirPath)
  // console.log("Files found:", files)

  const exportStatements = []

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file)
    const stat = fs.lstatSync(fullPath)

    // Prevent recursion on directories that already have an index.js
    if (stat.isDirectory() && file !== "index.js") {
      // console.log(`Entering directory: ${fullPath}`)
      generateIndex(fullPath) // Recurse into the subdirectory
    } else if (
      file !== "index.js" &&
      (file.endsWith(".js") || file.endsWith(".jsx"))
    ) {
      const fileName = file.replace(/\.(js|jsx)$/, "") // Remove the .js or .jsx extension
      exportStatements.push(`export * from "./${fileName}";`)
    }
  })

  // If we found export statements, create the index.js file
  if (exportStatements.length > 0) {
    const indexFileContent = exportStatements.join("\n")
    const indexPath = path.join(dirPath, "index.js")

    // Avoid writing index.js multiple times in the same directory
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, indexFileContent)
      // console.log(`index.js created successfully at ${dirPath}`)
    } else {
      // console.log(`index.js already exists at ${dirPath}`)
    }
  } else {
    // console.log(`No JavaScript or JSX files found to export in ${dirPath}`)
  }
}

// Start from the root src directory
generateIndex("./src")
