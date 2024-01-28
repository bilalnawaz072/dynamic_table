// pages/api/column/[id].ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const tableId = req.query.tableId as string;

  console.log("tableId: ", tableId)

  if (req.method === 'GET') {
    try {
      const columns = await prisma.column.findMany({
        where: { tableId: tableId },
      });
      if (columns) {
        res.status(200).json(columns);
      } else {
        res.status(404).json({ message: 'Columns not found' });
      }
    } catch (e: any) { // Explicitly type 'e' as an error object
      res.status(500).json({ message: 'Error retrieving the column', error: e.message });
    }
  }   else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
