import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import Table from "./Table";
import Select from "react-select";
import Swal from "sweetalert2";
import { useUniqueBatches } from "../contexts/UniqueBatchesContext";

const BatchScheduler = () => {
  const [batchno, setBatchno] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState(""); // Separate state for start date
  const [endDate, setEndDate] = useState("");
  const [mentors, setMentors] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [scheduleData,setScheduleData] = useState([])
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [loadingMentors, setLoadingMentors] = useState(false);
  const location = localStorage.getItem("location");
  const { batches, fetchBatches } = useUniqueBatches();

  const techStackSubjects = {
    vijayawada: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
    hyderabad: ["Python Full Stack (PFS)", "Java Full Stack (JFS)", "Data Science", "Data Analytics"],
    bangalore: ["Java Full Stack (JFS)"],
  };

  const mockSubjects = {
    "Python Full Stack (PFS)": ["Python", "Flask", "Frontend", "MySQL", "SoftSkills", "Aptitude"],
    "Java Full Stack (JFS)": ["CoreJava", "AdvancedJava", "Frontend", "MySQL", "SoftSkills", "Aptitude"],
    "Data Science": ["Data Science"],
    "Data Analytics": ["Data Analytics"],
  };

  const mockBatches = {
    Python: ["Python Full Stack (PFS)"],
    CoreJava: ["Java Full Stack (JFS)"],
    AdvancedJava: ["Java Full Stack (JFS)"],
    Flask: ["Python Full Stack (PFS)"],
    Frontend: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
    MySQL: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
    SoftSkills: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
    Aptitude: ["Python Full Stack (PFS)", "Java Full Stack (JFS)"],
    "Data Science": ["Data Science"],
    "Data Analytics": ["Data Analytics"],
  };

  const handleTechStackChange = (value) => {
    setSelectedTechStack(value);
    setAvailableSubjects(mockSubjects[value] || []);
    setSelectedSubject("");
    setSelectedBatches([]); // Clear batches when tech stack changes
  };

  const fetchMentors = async () => {
    setLoadingMentors(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/schedule`, {
        params: { location },
      });
      console.log(response)
      setScheduleData(response.data.schedule_data)
      setMentors(response.data.mentor_data || []);
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch mentors. Please try again.",
      });
    } finally {
      setLoadingMentors(false);
    }
  };

  const fetchBatchData = async () => {
    setLoadingBatches(true);
    try {
      await fetchBatches(location);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch batches. Please try again.",
      });
    } finally {
      setLoadingBatches(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([fetchMentors(), fetchBatchData()]);
  };

  console.log(selectedBatches.map(each=>each.value))
  const handleAddBatch = async () => {
    if (
      !startDate || !endDate ||
      !selectedTechStack ||
      !selectedSubject ||
      !startTime ||
      !endTime ||
      !roomNo ||
      !mentorName ||
      !selectedBatches.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields before submitting!",
      });
      return;
    }

    const newBatch = {

      batchno: selectedBatches.map((batch) => batch.value),
      mentorName,
      startDate,
      endDate,
      startTime: formatTo12Hour(startTime),
      endTime: formatTo12Hour(endTime),
      roomNo: parseInt(roomNo, 10),
      techStack: selectedTechStack,
      subjects: selectedSubject,
      location,
      //batches: selectedBatches.map((batch) => batch.value), // Extract selected batch values
    };
    console.log("data batch number",newBatch)
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/schedule`, newBatch);
      Swal.fire({
        icon: "success",
        title: "Batch Added",
        text: "The batch has been successfully added!",
      });
      fetchBatchData();
      setShowTable(true);
      setBatchno("");
      setMentorName("");
      setStartTime("");
      setEndTime("");
      setStartDate("");
      setEndDate("");
      setRoomNo("");
      setSelectedTechStack("");
      setSelectedSubject("");
      setSelectedBatches([]);
    } catch (error) {
      console.log("from batch creation",error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data.error || "Failed to add batch. Please try again.",
      });
    }
  };

  const formatTo12Hour = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute < 10 ? "0" + minute : minute} ${ampm}`;
  };



  // Filter batches based on the selected subject
  const filteredBatches = selectedSubject
    ? batches.filter((batch) => mockBatches[selectedSubject]?.includes(batch.Course))
    : [];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Batch Scheduler</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Batch Details</h2>
          <div className="flex items-end gap-4">
            <Dropdown
              label="Tech Stack"
              options={techStackSubjects[location] || []}
              value={selectedTechStack}
              onChange={handleTechStackChange}
            />
            <Dropdown
              label="Subject"
              options={availableSubjects}
              value={selectedSubject}
              onChange={(value) => setSelectedSubject(value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Schedule Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="flex flex-col">
    <label htmlFor="batchSelect" className="text-gray-700 font-medium mb-2">
      Select Batches
    </label>
    <Select
      id="batchSelect"
      isMulti
      options={filteredBatches.map((batch) => ({ value: batch.Batch, label: batch.Batch }))}
      value={selectedBatches}
      onChange={(selectedOptions) => setSelectedBatches(selectedOptions || [])}
      isLoading={loadingBatches}
      placeholder="Select Batches"
    />
  </div>

  <div className="flex flex-col">
   
    <Dropdown
      label="Mentor Name"
      options={
        loadingMentors
          ? ["Loading..."]
          : mentors
              .filter((mentor) => mentor.Designation === selectedTechStack)
              .map((mentor) => mentor.name)
      }
      value={mentorName}
      onChange={(value) => setMentorName(value)}
    />
  </div>

  <div className="flex flex-col">
   
    <InputField
      id="roomNumber"
      label="Room Number"
      value={roomNo}
      onChange={(e) => setRoomNo(e.target.value.replace(/\D/g, ""))}
      placeholder="Enter Room Number"
    />
  </div>
</div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-gray-700 font-medium mb-2">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            className="border rounded-lg px-3 py-2"
            value={startTime}
            onChange={(e) => {
              const inputTime = e.target.value;
              setStartTime(inputTime);

              // Add 90 minutes to the start time
              const [hours, minutes] = inputTime.split(":").map(Number);
              const startDate = new Date();
              startDate.setHours(hours, minutes);
              const endDate = new Date(startDate.getTime() + 90 * 60000); // Add 90 minutes in milliseconds

              const endHours = String(endDate.getHours()).padStart(2, "0");
              const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
              setEndTime(`${endHours}:${endMinutes}`);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-gray-700 font-medium mb-2">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            className="border rounded-lg px-3 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
            <label htmlFor="startDate" className="text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="border rounded-lg px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="border rounded-lg px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

        
      </div>


        <button
          onClick={handleAddBatch}
          className="block w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Schedule
        </button>
      </div>
      {showTable && <Table data={scheduleData} />}
    </div>
  );
};

export default BatchScheduler;
