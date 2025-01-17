const Table = ({ data }) => {
  console.log("Table data:", data);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mt-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Schedules</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No schedules added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2 text-left font-semibold">Batch ID</th>
                <th className="border px-4 py-2 text-left font-semibold">Mentor Name</th>
                <th className="border px-4 py-2 text-left font-semibold">Start Time</th>
                <th className="border px-4 py-2 text-left font-semibold">End Time</th>
                <th className="border px-4 py-2 text-left font-semibold">Room No</th>
                <th className="border px-4 py-2 text-left font-semibold">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {data.map((batch, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-4 py-2">{Array.isArray(batch.batchNo) ? batch.batchNo.join(", ") :batch.batchNo}</td>
                  <td className="border px-4 py-2">{batch.MentorName}</td>
                  <td className="border px-4 py-2">{batch.StartTime}</td>
                  <td className="border px-4 py-2">{batch.EndTime}</td>
                  <td className="border px-4 py-2">{batch.RoomNo}</td>
                  <td className="border px-4 py-2">
                    {batch.subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
// {Array.isArray(batch.subject) ? batch.subject.join(", ") : "N/A"}