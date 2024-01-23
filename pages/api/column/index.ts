// pages/api/column/index.ts

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const columns = await prisma.column.findMany();
      res.status(200).json(columns);
    } catch (e: any) {
      res.status(500).json({ message: 'Error retrieving columns', error: e.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, dataType, tableId } = req.body;
      const newColumn = await prisma.column.create({
        data: {
          name,
          dataType,
          data: {}, // Assuming empty object to start with
          tableId,
        },
      });
      res.status(201).json(newColumn);
    } catch (e: any) {
      res.status(500).json({ message: 'Error creating column', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
