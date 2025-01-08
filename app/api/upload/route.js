import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const folderPath = formData.get("folder");

  if (!file || !folderPath) {
    return NextResponse.json(
      { error: "File and folder path are required" },
      { status: 400 }
    );
  }

  const fullFolderPath = path.join(process.cwd(), "public/uploads", folderPath);
  const filePath = path.join(fullFolderPath, file.name);

  try {
    // Ensure that the folder exists before saving the file
    await fs.ensureDir(fullFolderPath);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({
      message: "File uploaded successfully",
      fileUrl: `/uploads/${folderPath}/${file.name}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
