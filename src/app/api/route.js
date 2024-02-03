import pool from "../config/dbConnect";
import upload from "../utils/multer";
import { NextResponse } from "next/server";


const queryDatabase = async (query, values) => {
  const [rows] = await pool.query(query, values);
  return rows;
};

export async function GET() {
  try {
    const schools = await queryDatabase(
      "SELECT id, name, address, city, image FROM schools"
    );
    console.log("Schools fetched successfully:", schools);
    return NextResponse.json({ success: true, schools });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ success: false, error: "Database error" }, 500);
  }
}

export async function POST(req, res) {
  try {
    await upload(req, res);

    const { name, address, city, state, contact, email_id } = req.body;
    console.log(name)
    const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

    const results = await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, imagePath]
    );
    console.log("School added successfully:", results);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Server error" }, 500);
  }
}
