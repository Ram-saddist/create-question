import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CurriculumTable = ({ selectedBatch, curriculumData }) => {
  const [mentorData, setMentorData] = useState([]);

  useEffect(() => {
    if (curriculumData && curriculumData.length > 0) {
      setMentorData(
        curriculumData.map((item, index) => ({
          dayOrder: index + 1,
          topic: item.topic,
          topicsToCover: item.topicsToCover || "",
          completed: false,
          videoUrl: "",
        }))
      );
    } else {
      setMentorData([]);
    }
  }, [curriculumData]);

  const handleUpdate = (index, field, value) => {
    const updatedData = [...mentorData];
    updatedData[index][field] = value;
    setMentorData(updatedData);
  };

  const handleSubmit = () => {
    const incompleteFields = mentorData.filter(
      (item) => !item.completed || !item.videoUrl.trim()
    );

    if (incompleteFields.length > 0) {
      Swal.fire({
        title: "Incomplete Fields",
        text: "Please ensure all topics are marked as completed and video URLs are filled.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    Swal.fire({
      title: "Submission Successful",
      text: "Mentor data has been submitted successfully!",
      icon: "success",
      confirmButtonText: "Great!",
    });

    console.log("Mentor Data Submitted:", mentorData);
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      {mentorData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border-b-2 border-gray-600">Day Order</th>
                <th className="p-3 border-b-2 border-gray-600">Topic</th>
                <th className="p-3 border-b-2 border-gray-600">Topics to Cover</th>
                <th className="p-3 border-b-2 border-gray-600">Completed</th>
                <th className="p-3 border-b-2 border-gray-600">Video URL</th>
              </tr>
            </thead>
            <tbody>
              {mentorData.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 border-b border-gray-600">{item.DayOrder}</td>
                  <td className="p-3 border-b border-gray-600">{item.Topics}</td>
                  <td className="p-3 border-b border-gray-600">
                    {item.TopicsToCover}
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300"
                      checked={item.completed}
                      onChange={(e) =>
                        handleUpdate(index, "completed", e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-3 border-b border-gray-600">
                    <input
                      type="text"
                      value={item.videoUrl}
                      className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) =>
                        handleUpdate(index, "videoUrl", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
              onClick={handleSubmit}
            >
              Submit to Student Courses
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Please select a batch to view the curriculum.</p>
      )}
    </div>
  );
};

export default CurriculumTable;
