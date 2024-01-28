"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultDataTypes } from "../dataType";
import { TagInput } from "@/components/ui/tag-input";

export default function CreateColumn({ params }: any) {
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState("");
  const [value, setValue] = useState<any>("");
  const [defaultValues, setDefaultValues] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createColumn = () => {
    console.log("Creating column");
    // console.log(name, dataType, data);
    if (!name) {
      alert("Name cannot be empty");
      return;
    }
    if (!dataType) {
      alert("DataType cannot be empty");
      return;
    }

    setLoading(true);

    const dataRefined = dataType === "array" ? defaultValues.map((dt:any) => dt.text) : defaultValues
    axios
      .post("/api/column", { name, dataType, data:{
        defaultValues: dataRefined,
        value: value
      }, tableId: params.tableId })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSuccess("Column created");
        setTimeout(() => {
          resetForm();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error creating column");
      });
  };

  const resetForm = () => {
    setName("");
    setDataType("");
    // setData({});
    setError(null);
    setSuccess(null);
    setLoading(false);
    // window.location.href="/tables"
  };


  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col space-y-4 w-[50vw] ">
        <div className="flex flex-row justify-between">
          <Link
            href={"/tables"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            View Tables
          </Link>

          <Link
            href={`/tables/${params.tableId}/columns`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            View Columns
          </Link>

        </div>
        <h1 className="text-3xl font-bold text-center">Create Column</h1>
        <div className="w-full space-y-2">
          <Label htmlFor="column-name">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="column-name"
            type="text"
            placeholder="Column Name"
          />
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <Label htmlFor="column-type">DataType</Label>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-fit space-x-3">
              <SelectValue placeholder="Select Type" id="column-type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(defaultDataTypes).map((type, i) => (
                <SelectItem key={i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {dataType && defaultDataTypes[dataType].type === "array" && (
          <div className="w-full space-y-2">
            <Label htmlFor="data">Possible Data</Label>
            {dataType && defaultDataTypes[dataType].type === "array" ? (
              <TagInput
              className="w-full"
                placeholder={`Add default ${dataType}(s)`}
                tags={defaultValues}
                setTags={setDefaultValues}
              />
            ) : (
              ""
            )}
          </div>
        )}

        {dataType &&
          defaultDataTypes[dataType].type === "array" &&
          defaultValues.length > 0 && (
            <div className="w-full flex flex-row justify-between items-center">
              <Label>Select default value</Label>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger className="w-fit space-x-3">
                  <SelectValue placeholder="Select Type" id="column-type" />
                </SelectTrigger>
                <SelectContent>
                  {defaultValues?.map((val: any, i: number) => (
                    <SelectItem key={i} value={val.text}>
                      {val.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

        {/* {dataType && defaultValues.length > 0 && (
          <div className="w-full space-y-2">
            <Label htmlFor="data">Selected Data</Label>
            {dataType && defaultDataTypes[dataType].type === "string" ? (
              <Input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder={`Add ${dataType}`}
              />
            ) : defaultDataTypes[dataType].type === "number" ? (
              <Input
                value={value}
                type="number"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            ) : defaultDataTypes[dataType].type === "array" ? (
              ""
            ) : (
              ""
            )}
          </div>
        )} */}

        {!error && !success && (
          <div className="w-full flex flex-row justify-end pt-6">
            {!loading && <Button onClick={createColumn}>Create</Button>}
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
