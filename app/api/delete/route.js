import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";

export async function POST(req) {
  const { targetPath, type } = await req.json();

  if (!targetPath || !type) {
    return NextResponse.json(
      { error: "Target path and type are required" },
      { status: 400 }
    );
  }

  const absolutePath = path.join(process.cwd(), "public/uploads", targetPath);

  try {
    if (type === "folder") {
      await fs.remove(absolutePath); // Remove folder
    } else if (type === "file") {
      await fs.unlink(absolutePath); // Remove file
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting target" },
      { status: 500 }
    );
  }
}
