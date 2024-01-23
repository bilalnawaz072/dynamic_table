// pages/api/row/[id].ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const rowId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const row = await prisma.row.findUnique({
        where: { id: rowId },
      });
      if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ message: 'Row not found' });
      }
    } catch (e: any) {
      res.status(500).json({ message: 'Error retrieving the row', error: e.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { data } = req.body;
      const updatedRow = await prisma.row.update({
        where: { id: rowId },
        data: { data },
      });
      res.status(200).json(updatedRow);
    } catch (e: any) {
      res.status(500).json({ message: 'Error updating row', error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.row.delete({
        where: { id: rowId },
      });
      res.status(200).json({ message: 'Row deleted' });
    } catch (e: any) {
      res.status(500).json({ message: 'Error deleting row', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
