import {
  Command,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { CheckCircle2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TableMenuProps {
  id: string;
}

export default function TableMenu({ id }: TableMenuProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div>
      <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
        <PopoverTrigger>
          <MoreHorizontal className="w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
          <CommandItem>
              <Link href={`/tables/${id}/columns/create`}>Add Columns</Link>
            </CommandItem>
            <CommandItem>
              <Link href={`/tables/edit/${id}`}>Update</Link>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setDeleteDialogOpen(true);
              }}
              className="aria-selected:text-destructive text-destructive aria-selected:bg-destructive/10"
            >
              Delete
            </CommandItem>
          </Command>
        </PopoverContent>
      </Popover>
      <DeleteConfirmation
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        id={id}
      />
    </div>
  );
}

function DeleteConfirmation({ open, setOpen, id }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    console.log("Deleting table", id);
    setLoading(true);
    setSuccess(false);
    axios
      .delete(`api/table/${id}`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        alert(error.text);
        setLoading(false);
        setSuccess(false);
        setError(error);
      });
  };

  return (
    <AlertDialog open={open} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </AlertDialogCancel>
          {!error && !success && !loading && (
            <AlertDialogAction onClick={handleDelete}>
              Confirm
            </AlertDialogAction>
          )}
          {error && !success && !loading && (
            <p className=" text-destructive"> {error}</p>
          )}
          {loading && !success && !error && (
            <AlertDialogAction disabled={true}>Deleting...</AlertDialogAction>
          )}
          {success && !loading && !error && (
            <AlertDialogAction>
              Deleted <CheckCircle2 className="w-4 h-4 ml-2" />
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
