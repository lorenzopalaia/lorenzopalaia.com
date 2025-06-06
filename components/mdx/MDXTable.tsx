import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MDXTable({ children }: { children: React.ReactNode }) {
  // Estrai il contenuto CSV dal children
  const csvContent = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }
      // Handle React elements that contain text content
      if (
        React.isValidElement(child) &&
        child.props &&
        typeof (child.props as { children?: React.ReactNode }).children ===
          "string"
      ) {
        return (child.props as { children: string }).children;
      }
      return "";
    })
    .join("")
    .trim();

  // Parsa il CSV
  const lines = csvContent.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return null;
  }

  // Prima riga è l'header
  const headers = lines[0].split(",").map((header) => header.trim());

  // Resto sono i dati
  const rows = lines
    .slice(1)
    .map((line) => line.split(",").map((cell) => cell.trim()));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
