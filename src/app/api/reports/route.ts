import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { z } from 'zod';

// Define el esquema para validar los datos de entrada
const reportSchema = z.object({
  reporter_name: z.string().optional(),
  reporter_email: z.string().email().optional().or(z.literal('')),
  incident_type: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().optional(),
  photo_evidence: z.string().optional(), // Base64 string
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = reportSchema.parse(data);

    const {
      reporter_name,
      reporter_email,
      incident_type,
      latitude,
      longitude,
      description,
      photo_evidence,
    } = validatedData;

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `INSERT INTO citizen_reports (reporter_name, reporter_email, incident_type, latitude, longitude, description, photo_evidence, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [reporter_name, reporter_email, incident_type, latitude, longitude, description, photo_evidence]
    );
    connection.release();

    return NextResponse.json({ message: 'Report created successfully', data: result }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    try {
        const connection = await pool.getConnection();
        let query = 'SELECT id, incident_type as type, description, latitude as lat, longitude as lng, photo_evidence as image, report_timestamp as timestamp, reporter_name as author FROM citizen_reports';
        const params = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        }

        query += ' ORDER BY report_timestamp DESC';

        const [rows] = await connection.execute(query, params);
        connection.release();
        
        // Transform data to match frontend expectations
        const reports = (rows as any[]).map(row => ({
            ...row,
            lat: parseFloat(row.lat),
            lng: parseFloat(row.lng),
            location: { 
                lat: parseFloat(row.lat), 
                lng: parseFloat(row.lng) 
            },
        }));

        return NextResponse.json(reports);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
    }
}
