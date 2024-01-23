// pages/api/table/[id].ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const tableId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const table = await prisma.table.findUnique({
        where: { id: tableId },
      });
      if (table) {
        res.status(200).json(table);
      } else {
        res.status(404).json({ message: 'Table not found' });
      }
    } catch (e: any) {
      res.status(500).json({ message: 'Error retrieving the table', error: e.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, description } = req.body;
      const updatedTable = await prisma.table.update({
        where: { id: tableId },
        data: {
          name,
          description,
        },
      });
      res.status(200).json(updatedTable);
    } catch (e: any) {
      res.status(500).json({ message: 'Error updating table', error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const table = await prisma.table.delete({
        where: { id: tableId },
      });
      res.status(200).json({ message: 'Table deleted', table });
    } catch (e: any) {
      res.status(500).json({ message: 'Error deleting table', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
