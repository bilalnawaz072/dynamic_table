"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"

export default function EditTable({ params }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [tableLoading, setTableLoading] = useState(true);

  const updateTable = () => {
    console.log("Creating table");
    console.log(name, description);
    if (!name) {
      alert("Name cannot be empty");
      return;
    }
    if (!description) {
      alert("Description cannot be empty");
      return;
    }
    setLoading(true);
    axios
      .put(`/api/table/${params.id}`, { name, description })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSuccess("Table update");
        setTimeout(() => {
          resetForm();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error updating table");
      });
  };

  const resetForm = () => {
    setError(null);
    setSuccess(null);
    setLoading(false);
    window.location.href="/tables"
  };

  useEffect(() => {
    // console.log(params.id)
    setTableLoading(true);
    axios
      .get(`/api/table/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
        setTableLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching table");
        setTableLoading(false);
      });
  }, [params.id]);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col space-y-3 w-[50vw] ">
        <div className="flex flex-row justify-end">
          <Link
            href={"/tables"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            View Tables
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center">Update Table</h1>
        <div className="w-full">
          <Label htmlFor="table-name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="table-name"
            type="text"
            placeholder="Table Name"
            disabled={tableLoading}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="table-description">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="table-description"
            className="min-h-[13rem]"
            placeholder="Description"
            disabled={tableLoading}
          />
        </div>
        {!error && !success && (
          <div className="w-full flex flex-row justify-end">
            {!loading && !tableLoading && (
              <Button onClick={updateTable}>Update</Button>
            )}
            {loading && !tableLoading && (
              <Button disabled={true}>Updating...</Button>
            )}
            {tableLoading && <Button disabled={true}>Fetching table...</Button>}
          </div>
        )}
        {error && <p className="text-destructive text-center">{error}</p>}
        {success && (
          <div className="w-full flex flex-row justify-end">
            <Button>
              {success} <CheckCircle2 className="ml-2 w-4 h-4" />{" "}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
