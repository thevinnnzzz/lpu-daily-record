import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<"ALL" | "LPU" | "NON_LPU">(
    "ALL"
  );

  // Empty array for now - will be replaced with real data from database
  const records: any[] = [];

  const filteredData = records.filter((record) => {
    const matchesSearch =
      record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.thesisTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? record.date === dateFilter : true;
    const matchesUserType =
      userTypeFilter === "ALL" ? true : record.userType === userTypeFilter;
    return matchesSearch && matchesDate && matchesUserType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by name or thesis title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={userTypeFilter}
          onChange={(e) =>
            setUserTypeFilter(e.target.value as "ALL" | "LPU" | "NON_LPU")
          }
          className="px-3 py-2 border rounded-md"
        >
          <option value="ALL">All Users</option>
          <option value="LPU">LPU Students</option>
          <option value="NON_LPU">Non-LPU Students</option>
        </select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Student Number</TableHead>
              <TableHead>Program/Department</TableHead>
              <TableHead>School Name</TableHead>
              <TableHead>Thesis Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.userType}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.studentNumber || "-"}</TableCell>
                <TableCell>{record.programDepartment || "-"}</TableCell>
                <TableCell>{record.schoolName || "-"}</TableCell>
                <TableCell>{record.thesisTitle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;