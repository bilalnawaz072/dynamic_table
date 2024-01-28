"use client";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableCard from "./tableCard";
import { Loader2 } from "lucide-react";

export default function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/table")
      .then((res) => {
        setTables(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError("Error fetching tables");
      });
  }, []);

  

  return (
    <div className="flex flex-col items-center justify-center pt-4 space-y-3 max-w-[80vw] overflow-hidden mx-auto ">
      <div className="flex w-full justify-end ">
        <Link
          href={"/tables/create"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Create Table
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center">Tables</h1>

      <div className="flex flex-row items-center justify-center ">
        <div className=" xs:columns-1 md:columns-2  xl:columns-3 3xl:columns-4 gap-4 space-y-4 max-w-[80vw]">
          {!loading &&
            !error &&
            tables?.map((data: any, i: number) => (
              <TableCard key={i} table={data} />
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-6 ">
        {loading && !error && <Loader2 className="w-6 h-6 animate-spin" />}
        {error && !loading && <div className="text-destructive">{error}</div>}
      </div>
    </div>
  );
}
