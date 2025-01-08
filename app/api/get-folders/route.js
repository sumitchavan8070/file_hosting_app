import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const body = await req.json();
  const folderPath = body.folderPath || ""; // Current folder path

  const basePath = path.join(process.cwd(), "public/uploads", folderPath);

  try {
    const items = await fs.readdir(basePath, { withFileTypes: true });
    const folders = [];
    const files = [];

    items.forEach((item) => {
      if (item.isDirectory()) {
        folders.push({
          name: item.name,
          path: path.join(folderPath, item.name),
        });
      } else if (item.isFile()) {
        files.push({ name: item.name, path: path.join(folderPath, item.name) });
      }
    });

    return NextResponse.json({
      folders: folders || [],
      files: files || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading directory" },
      { status: 500 }
    );
  }
}
