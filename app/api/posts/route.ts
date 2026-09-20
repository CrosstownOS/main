import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export const dynamic = "force-static"

export function GET() {
  return NextResponse.json(getAllPosts().slice(0, 3))
}
