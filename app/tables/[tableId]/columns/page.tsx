"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { defaultDataTypes } from "./dataType";

export default function ViewColumns({ params }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    console.log(params.tableId);
    setLoading(true);
    axios
      .get(`/api/column/byTable/${params.tableId}`)
      .then((res) => {
        console.log(res.data);

        setColumns(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setError("Error Getting Columns");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {columns.map((column:any, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{column.name}</CardTitle>
            <CardDescription>{column.dataType}</CardDescription>
          </CardHeader>
          <CardContent>
            {defaultDataTypes[column.dataType].type === "array" ? 
            "map" : 
            "string"}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
