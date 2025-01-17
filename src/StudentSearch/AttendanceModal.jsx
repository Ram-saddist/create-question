import React from "react";

const AttendanceModal = ({ isOpen, onClose, attendance }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-black mb-6 text-center">
          Attendance Details
        </h3>

        {/* Attendance Table */}
        <div className="overflow-y-auto max-h-96">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                  Batch No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                  Course
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-black font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
  {attendance.map((record, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
    >
      <td className="border border-gray-300 px-4 py-2">{record.batchNo || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{record.course || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{record.datetime || "N/A"}</td>
      <td
        className={`border border-gray-300 px-4 py-2 font-semibold ${
          (record.status || "").toLowerCase() === "present"
            ? "text-green-600 bg-green-50"
            : "text-red-600 bg-red-50"
        }`}
      >
        {record.status || "N/A"}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal