import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";

import {
  FaUpload,
  FaFileExcel,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";

const CurriculumManagement = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dayOrder, setDayOrder] = useState("");
  const [topic, setTopic] = useState("");
  const [topicsToCover, setTopicsToCover] = useState([]);
  const [curriculumData, setCurriculumData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [filterSubject, setFilterSubject] = useState("Python");
  const [filteredData, setFilteredData] = useState([]);
  const [showExcelUploadTab, setShowExcelUploadTab] = useState(false);
  const [excelData,setExcelData] = useState([])

  const location = localStorage.getItem('location')

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        subject: "Python",
        dayOrder: "Day-1",
        topic: "Python Introduction",
        topicsToCover: "Data Types, int, float",
        location
      },
    ];
  
    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  
    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Curriculum_Template.xlsx");
  };
  
 
  const fetchCurriculumData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/syllabus`,{
        params: {
        location,
      }});
      if (response.status === 200 && response.data?.data) {
        const formattedData = response.data.data.map((item) => ({
          ...item,
          topicsToCover: item.topicsToCover || [],
        }));
        setCurriculumData(formattedData);
        setFilteredData(formattedData.filter((data) => data.subject === "Python"));
        setShowTable(true);
      } else {
        setCurriculumData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching curriculum data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch curriculum data. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchCurriculumData();
  }, []);

  const handleAddTopicToList = (newTopic) => {
    if (newTopic.trim() !== "") {
      setTopicsToCover((prevTopics) => [...prevTopics, newTopic]);
    }
  };

  const handleFilterChange = (subject) => {
    setFilterSubject(subject);
    if (subject) {
      const filtered = curriculumData.filter((data) => data.subject === subject);
      setFilteredData(filtered);
    } else {
      setFilteredData(curriculumData);
    }
  };

  const handleAddTopic = async () => {
    if (!selectedSubject.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Subject",
        text: "Please select a subject.",
      });
      return;
    }
    if (!dayOrder.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Day Order",
        text: "Please enter a valid Day Order.",
      });
      return;
    }
    if (!topic.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Topic",
        text: "Please enter a valid Topic.",
      });
      return;
    }
    if (topicsToCover.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Topics",
        text: "Please add at least one topic to cover.",
      });
      return;
    }

    const newCurriculum = {
      subject: selectedSubject,
      dayOrder,
      topic,
      topicsToCover,
      location
    };
   console.log(newCurriculum)
    try {
      Swal.fire({
        title: "Adding Curriculum",
        text: "Please wait while we add the curriculum...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/syllabus`, newCurriculum);
 console.log(newCurriculum)
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Curriculum Added",
          text: "The curriculum has been added successfully!",
        });
        fetchCurriculumData();
        setCurriculumData((prevData) => [...prevData, { ...newCurriculum, topicsToCover }]);
        setShowTable(true);
        setSelectedSubject("");
        setDayOrder("");
        setTopic("");
        setTopicsToCover([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: "Failed to add curriculum. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding curriculum:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the curriculum. Please try again later.",
      });
    }
  };

  const subjects = [
    "Python",
    "MySQL",
    "Flask",
    "Frontend",
    "SoftSkills",
    "Aptitude",
    "CoreJava",
    "AdvancedJava",
  ];

  const handleExcelUploadClick = () => {
    setShowExcelUploadTab(!showExcelUploadTab);
  };


  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please choose a file to upload.",
      });
      return;
    }
  
    const fileExtension = file.name.split(".").pop().toLowerCase();
  
    if (!["xlsx", "xls", "csv"].includes(fileExtension)) {
      Swal.fire({
        title: "Invalid File Type",
        text: "Only Excel or CSV files are supported.",
        icon: "error",
      });
      return;
    }
  
    try {
      if (fileExtension === "csv") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvContent = event.target.result;
          const parsedData = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true,
          });
  
          if (parsedData.data.length > 0) {
            const formattedData = parsedData.data.map((row) => ({
              subject: row["subject"] || "",
              dayOrder: row["dayorder"] || "",
              topic: row["topic"] || "",
              topicsToCover: row["topicstocover"]
                ? row["topicstocover"].split(",").map((item) => item.trim())
                : [],
            }));
            console.log("Parsed Data (CSV):", formattedData);
            Swal.fire({
              icon: "success",
              title: "File Uploaded Successfully",
              text: `${formattedData.length} rows processed. try to do submit`,
            });
          } else {
            Swal.fire({
              title: "Invalid CSV File",
              text: "The file is empty or missing headers.",
              icon: "error",
            });
          }
        };
        reader.readAsText(file);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = new Uint8Array(event.target.result);
          const workbook = XLSX.read(content, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
          if (rows.length > 1) {
            const headers = rows[0].map((header) => header.toLowerCase().trim());
            const formattedData = rows.slice(1).map((row) => ({
              subject: row[headers.indexOf("subject")]?.toString() || "",
              dayOrder: row[headers.indexOf("dayorder")]?.toString() || "",
              topic: row[headers.indexOf("topic")]?.toString() || "",
              topicsToCover: row[headers.indexOf("topicstocover")]
                ? row[headers.indexOf("topicstocover")].split(",").map((item) => item.trim())
                : [],
                location: row[headers.indexOf("location")]?.toString() || "",
            }));
            console.log("Parsed Data (Excel):", formattedData);
            setExcelData(formattedData)
            Swal.fire({
              title: "File Uploaded Successfully",
              text: `${formattedData.length} rows processed.`,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Invalid Excel File",
              text: "The file is empty or missing headers.",
              icon: "error",
            });
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while uploading the file. Please try again.",
      });
    }
  };
  

  const handleSubmitExcel = async () => {
     console.log(excelData)
    try {


      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/syllabus`, excelData);
    console.log(response)
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "File Uploaded Successfully",
          text: "The file has been uploaded and is being processed.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an issue uploading the file. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while uploading the file. Please try again.",
      });
    }
  };


  return (
    <div className=" bg-gradient-to-b from-blue-100 to-white">
    <div className="p-6 max-w-5xl mx-auto">
       <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Curriculum Management
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
        onClick={handleExcelUploadClick}
        className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 ${
          !showExcelUploadTab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
        >
           <FaUser />
          Manual Entry
        </button>

        <button
          onClick={handleExcelUploadClick}
          className={`px-6 py-2 border rounded-md transition duration-300 text-lg font-medium flex items-center gap-2 ${
            showExcelUploadTab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
           <FaFileExcel />
          Excel Upload
        </button>
       
      </div>

      {!showExcelUploadTab?( <>
     
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Select Subject</h3>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Choose a Technology Subject:
        </label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">-- Select a Technology Subject --</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Add Curriculum Details</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="dayOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Day Order:
            </label>
            <input
              id="dayOrder"
              type="text"
              value={dayOrder}
              onChange={(e) => setDayOrder(e.target.value)}
              placeholder="Day Order (e.g., Day-1)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic:
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic (e.g., Intro to Python)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-2 min-w-[250px]">
            <label htmlFor="topicsToCover" className="block text-sm font-medium text-gray-700 mb-2">
              Topics to Cover:
            </label>
            <input
              id="topicsToCover"
              type="text"
              placeholder="Topics to Cover (Press Enter)"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleAddTopicToList(e.target.value.trim());
                  e.target.value = "";
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddTopic}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {topicsToCover.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-600 mb-2">Topics to Cover:</h4>
            <ul className="list-disc list-inside text-gray-800">
              {topicsToCover.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showTable && curriculumData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Curriculum Data</h3>

          <div className="mb-4">
            <label htmlFor="filterSubject" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject:
            </label>
            <select
              id="filterSubject"
              value={filterSubject}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Show All Subjects --</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Day Order</th>
                  <th className="py-3 px-4 text-left">Topic</th>
                  <th className="py-3 px-4 text-left">Topics to Cover</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 border">{data.subject}</td>
                    <td className="py-3 px-4 border">{data.DayOrder}</td>
                    <td className="py-3 px-4 border">{data.Topics}</td>
                    <td className="py-3 px-4 border">
                      <ul className="list-disc list-inside">
                        {(data.TopicsToCover || []).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </>):(<div className="bg-white shadow-md rounded-lg p-6 mb-4">
         
                  <div className="flex justify-center gap-4 mb-4 text-center items-center">
                    <span className="text-red-600"> Demo template for uploade Excel File
                    </span>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={handleDownloadTemplate}
                    >
                      <FaDownload /> Download Template
                    </button>
                  </div>
                
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Upload Excel</h3>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
          <FaUpload className="text-black mr-2" />
          <input
            id="excelUpload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
            className="flex-1 px-2 py-1 text-gray-800 outline-none"
          />
        </div>
          <button
            onClick={handleSubmitExcel}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>)}
     

    </div>
    </div>
  );
};

export default CurriculumManagement;
