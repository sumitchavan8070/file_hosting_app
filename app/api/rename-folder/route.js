import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const body = await req.json();
  const { oldFolderPath, newFolderName } = body;

  if (!oldFolderPath || !newFolderName) {
    return NextResponse.json(
      { error: "Both old folder path and new folder name are required" },
      { status: 400 }
    );
  }

  const oldFolderFullPath = path.join(
    process.cwd(),
    "public/uploads",
    oldFolderPath
  );
  const newFolderFullPath = path.join(
    process.cwd(),
    "public/uploads",
    path.dirname(oldFolderPath),
    newFolderName
  );

  try {
    // Rename the folder
    await fs.rename(oldFolderFullPath, newFolderFullPath);
    return NextResponse.json({
      message: "Folder renamed successfully",
      newFolderPath: newFolderFullPath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error renaming folder" },
      { status: 500 }
    );
  }
}
