// pages/api/column/[id].ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const columnId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const column = await prisma.column.findUnique({
        where: { id: columnId },
      });
      if (column) {
        res.status(200).json(column);
      } else {
        res.status(404).json({ message: 'Column not found' });
      }
    } catch (e: any) { // Explicitly type 'e' as an error object
      res.status(500).json({ message: 'Error retrieving the column', error: e.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, dataType } = req.body;
      const updatedColumn = await prisma.column.update({
        where: { id: columnId },
        data: {
          name,
          dataType,
          // Assuming data is not updated here
        },
      });
      res.status(200).json(updatedColumn);
    } catch (e : any) {
      res.status(500).json({ message: 'Error updating column', error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.column.delete({
        where: { id: columnId },
      });
      res.status(200).json({ message: 'Column deleted' });
    } catch (e: any) {
      res.status(500).json({ message: 'Error deleting column', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
