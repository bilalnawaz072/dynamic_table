import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import TableMenu from "./tableMenu";

interface TableCardProps {
  table: any;
}

export default function TableCard({ table }: TableCardProps) {
  return (
    <Card  className="w-full break-inside-avoid" >
      <CardHeader className="p-3 ">
        <CardTitle className="flex justify-between items-center">
          <span className="font-bold">{table.name}</span>
          <TableMenu id={table.id} />
        </CardTitle>

        <CardDescription>{table.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
