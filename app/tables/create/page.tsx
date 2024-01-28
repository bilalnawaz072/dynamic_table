"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateTable() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createTable = () => {
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
      .post("/api/table", { name, description })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSuccess("Table created");
        setTimeout(() => {
          resetForm();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error creating table");
      });
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setError(null);
    setSuccess(null);
    setLoading(false);
    window.location.href="/tables"
  };

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
        <h1 className="text-3xl font-bold text-center">Create Table</h1>
        <div className="w-full">
          <Label htmlFor="table-name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="table-name"
            type="text"
            placeholder="Table Name"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="table-description">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="table-description"
            className=" min-h-[13rem]"
            placeholder="Description"
          />
        </div>
        {!error && !success && (
          <div className="w-full flex flex-row justify-end">
            {!loading && <Button onClick={createTable}>Create</Button>}
            {loading && <Button disabled={true}>Creating...</Button>}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
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
