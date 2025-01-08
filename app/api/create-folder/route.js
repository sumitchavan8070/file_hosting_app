// import { NextResponse } from "next/server";
// import path from "path";
// import fs from "fs-extra";

// export async function POST(req) {
//   const body = await req.json();
//   const folder = body.folder;

//   if (!folder) {
//     return NextResponse.json(
//       { error: "Folder name is required" },
//       { status: 400 }
//     );
//   }

//   const folderPath = path.join(process.cwd(), "public/uploads", folder);

//   if (fs.existsSync(folderPath)) {
//     return NextResponse.json(
//       { message: "Folder already exists" },
//       { status: 400 }
//     );
//   }

//   await fs.ensureDir(folderPath);
//   return NextResponse.json({ message: "Folder created successfully" });
// }

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const body = await req.json();
  const folderPath = body.folder;

  if (!folderPath) {
    return NextResponse.json(
      { error: "Folder path is required" },
      { status: 400 }
    );
  }

  const fullPath = path.join(process.cwd(), "public/uploads", folderPath);

  try {
    // Recursively create nested directories
    await fs.ensureDir(fullPath);
    return NextResponse.json({ message: "Folder(s) created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating folder(s)" },
      { status: 500 }
    );
  }
}
