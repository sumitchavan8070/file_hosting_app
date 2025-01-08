import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const body = await req.json();
  const { oldFilePath, newFileName } = body;

  if (!oldFilePath || !newFileName) {
    return NextResponse.json(
      { error: "Both old file path and new file name are required" },
      { status: 400 }
    );
  }

  const oldFileFullPath = path.join(
    process.cwd(),
    "public/uploads",
    oldFilePath
  );
  const newFileFullPath = path.join(
    process.cwd(),
    "public/uploads",
    path.dirname(oldFilePath),
    newFileName
  );

  try {
    await fs.rename(oldFileFullPath, newFileFullPath); // Renaming the file
    return NextResponse.json({
      message: "File renamed successfully",
      newFilePath: newFileFullPath,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error renaming file" }, { status: 500 });
  }
}
