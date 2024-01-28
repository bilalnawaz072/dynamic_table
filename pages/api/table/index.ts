

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'GET') {
    try {
        const tables = await prisma.table.findMany();
        res.status(200).json(tables);
    } catch (e) {
        const error = e as Error;
        res.status(500).json({ message: 'Error retrieving tables', error: error.message });
    }
} else if (req.method === 'POST') {
    try {
      const { name, description } = req.body;
      const newTable = await prisma.table.create({
        data: {
          name,
          description
        },
      });
      res.status(201).json(newTable);
    } catch (e: any) {
      res.status(500).json({ message: 'Error creating table', error: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
