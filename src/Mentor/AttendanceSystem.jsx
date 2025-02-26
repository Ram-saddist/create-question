import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {  Save, FileSpreadsheet,Eye} from "lucide-react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.min.js';
import { useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";

const mockSubjects = [
  "SelectSubject",
  "Python",
  "MySQL",
  "Flask",
  "Frontend",
  "SoftSkills",
  "Aptitude",
  "CoreJava",
  "AdvancedJava",
];
const mockBatches = ["SelectBatch", "PFS-100","PFS-101", "PFS-102",'JFS-100', "JFS-101", "JFS-102"];


export default function AttendanceSystem() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDate] = useState(new Date());
  const [filteredBatches, setFilteredBatches] = useState(mockBatches);
  const [students, setStudents] = useState([]);
  const [counts, setCounts] = useState({ total: 0, present: 0, absent: 0 });

  useEffect(() => {
    if (selectedSubject === "CoreJava" || selectedSubject === "AdvancedJava") {
      setFilteredBatches(["SelectBatch", "JFS-100","JFS-101", "JFS-102"]);
    } else if (selectedSubject === "Python" || selectedSubject ==='Flask') {
      setFilteredBatches(["SelectBatch", "PFS-100", "PFS-101","PFS-102"]);
    } else {
      setFilteredBatches(mockBatches); // Show all batches for other subjects
    }
    setSelectedBatch(""); // Reset the selected batch
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedBatch.length > 0 && selectedSubject && selectedSubject !== "SelectSubject") {
      console.log("Fetching students for:", selectedBatch, selectedSubject);
       fetchStudents(selectedBatch, selectedSubject); // Uncomment for actual API call
    }
  }, [selectedBatch, selectedSubject]);

  const location = localStorage.getItem('location')

  const fetchStudents = async (batches, subject) => {
   const payload = {batches, subject,location};
   console.log(payload)
    try {
     const response = await axios.post(
         `${process.env.REACT_APP_BACKEND_URL}/api/v1/attend`,
         payload
       );

       console.log(response)

       if (response.status === 200) {
        if (selectedBatch && selectedBatch !== "SelectBatch") {
          const initialStudents = response.data.students_data.map((student) => ({
            ...student,
            status: "absent",
            remarks: "",
          }));
          setStudents(initialStudents);
        } else {
          setStudents([]);
        }
       } else {
         console.error("Failed to fetch students:", response.statusText);
       }
     
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  

  useEffect(() => {
    const total = students.length;
    const present = students.filter((s) => s.status === "present").length;
    setCounts({ total, present, absent: total - present });
  }, [students]);

  const toggleAttendance = (studentId) => {
    setStudents(
      students.map((student) =>
        student.studentId === studentId
          ? { ...student, status: student.status === "present" ? "absent" : "present" }
          : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents(students.map((student) => ({ ...student, status: "present" })));
  };

  const updateRemarks = (studentId, remarks) => {
    setStudents(
      students.map((student) =>
        student.studentId === studentId ? { ...student, remarks } : student
      )
    );
  };

  const saveAttendance = async () => {

    const now = new Date();

    const year = now.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    // let hours = now.getHours();
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // const seconds = String(now.getSeconds()).padStart(2, '0');
    // const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // hours = hours % 12 || 12; 
    const location =localStorage.getItem('location')
    console.log(location)
    const dateTime = `${year}-${month}-${day}`
    const checkDate =`${year}-${month}-${day}`
    console.log("Date:", checkDate);
    const payload = {
      subject: selectedSubject,
      batch: selectedBatch,
      datetime: dateTime,
      location:location,
      students: students.map(({ studentId, name, email, status, remarks }) => ({
        studentId,
        name: name || email, 
        status,
        remarks,
      })),
    };
    
console.log(payload)

    try {
      const checkResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/attendcheck`,
        { subject: selectedSubject, batch: selectedBatch, date: checkDate }
      );
     console.log("hello----",checkResponse.data.Message)
      if (checkResponse.status === 200 && checkResponse.data.Message==='existed') {
        Swal.fire({
          title: 'Attendance Already Submitted',
          text: `Attendance for ${selectedBatch} on ${selectedDate.toLocaleDateString()} has already been saved.`,
          icon: 'info',
        });
        return; 
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/attendance`,
        payload
      );
  
      if (response.status === 200) {
        Swal.fire({
          title: 'Attendance Successfully Saved',
          icon: 'success',
        });
        setSelectedSubject('');
        setSelectedBatch('');
        console.log("Attendance saved successfully:", response.data);
      } else {
        console.error("Failed to save attendance:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };
  

  const exportToExcel = () => {
    console.log("Exporting to Excel...", students);
    const data = students.map(({ studentId, name, email, status, remarks }) => ({
      "Student ID": studentId,
      "Student Name": name || email, // Use name if available, otherwise fallback to email
      Status: status,
      Remarks: remarks,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(
      wb,
      `Attendance_${selectedBatch}_${selectedDate.toISOString().split("T")[0]}.xlsx`
    );
  };

  const viewAttendance = () => {
    navigate("/attendancedata");
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 ml-0 md:ml-2 mr-2 mt-4">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Attendance Management
            </h1>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Select Subject</h2>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Subject..." />
                </SelectTrigger>
                <SelectContent>
                  {mockSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Batch Selection */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Select Batch</h2>
              <Select
                value={selectedBatch}
                onValueChange={setSelectedBatch}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Batch..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredBatches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold">Date & Time</h2>
            <div className="rounded-md border p-3 text-gray-700">
              {selectedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              {selectedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </div>
          </CardContent>
        </Card>

        </div>

         <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Student Attendance</h2>
            <div className="flex gap-2">
              <Button onClick={markAllPresent} disabled={!selectedBatch}>
                Mark All Present
              </Button>
              <Button onClick={exportToExcel} disabled={!selectedBatch}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
              <Button onClick={viewAttendance}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Attendance
                </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name ? student.name : student.email}</TableCell>
                  <TableCell>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={student.status === "present"}
                        onChange={() => toggleAttendance(student.studentId)}
                      />
                      <div
                        className={`w-14 h-7 rounded-full relative transition-colors duration-300 ease-in-out ${
                          student.status === "present" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {/* Circle */}
                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                          student.status === "present" ? "translate-x-7" : "translate-x-0"
                        }`}></div>
                      </div>
                    </label>
                   
                  </div>
                </TableCell>



                  <TableCell>
                    <Input
                      placeholder="Add remarks..."
                      value={student.remarks}
                      onChange={(e) => updateRemarks(student.studentId, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total Students: {counts.total} |
              Present: <span className="text-green-600">{counts.present}</span> |
              Absent: <span className="text-red-600">{counts.absent}</span>
            </div>
            <Button onClick={saveAttendance} disabled={!selectedBatch}>
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      

      </div>
        
    </div>
  );
}
