import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['approved', 'rejected']),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
  }

  try {
    const data = await request.json();
    const { status } = updateStatusSchema.parse(data);

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE citizen_reports SET status = ? WHERE id = ?',
      [status, id]
    );
    connection.release();

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Report status updated successfully' });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid status provided', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update report status' }, { status: 500 });
  }
}
