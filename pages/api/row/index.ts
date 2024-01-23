// pages/api/row/index.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const rows = await prisma.row.findMany();
      res.status(200).json(rows);
    } catch (e:any) {
      res.status(500).json({ message: 'Error retrieving rows', error: e.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { data, columnId, tableId } = req.body;
      const newRow = await prisma.row.create({
        data: {
          data,
          columnId,
          tableId,
        },
      });
      res.status(201).json(newRow);
    } catch (e:any) {
      res.status(500).json({ message: 'Error creating row', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
