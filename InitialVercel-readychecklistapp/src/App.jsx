
import React, { useState } from 'react';

const questions = [
  "Are all patch panels and terminations clearly labeled",
  "Are all network cable runs Category 5e or greater.",
  "Is the appliance clearly labeled with the Device Name and IP on the front panel?",
  "Are cables neat and tidy?",
  "Is the MDF or IDF temperature controlled?",
  "Is the location free from trash and e-waste?",
  "Are the UPSs free of errors?",
  "Are there temperature probes connected?",
  "Is the UPS(s) connectable?",
  "Is the power outlet undamaged?",
  "Are the LAN ports on the critical devices undamaged?",
  "Is the Patch Panel free from damage?",
  "Are there errors visually indicated on the front of the server(s)?",
  "Can you connect and login to the switch(s)?",
  "Is the firewall licensing current?",
  "Are there visual indicators of errors on the front of the firewall?",
  "Is the BCDR server free from errors?",
  "Are backups happening without errors?",
  "Can you connect and login to the IMM, iDRAC or other Lights Out Management?",
  "Are the server's keyboard and mouse good and working.",
  "Is there a working server monitor connected?",
  "Is the MDF/IDF areas free from rain, fire or other environmental issues?",
  "Is access to the MDF restricted?",
  "Is access to remote IDFs restricted?",
  "If present, are POE injectors working?",
  "Check the modem(s). Are they free from visual error indicators?",
  "Are critical network infrastructure labeled?",
  "Are there suitable number of pictures in our documentation",
  "Is the Network Switch(es) clearly labeled with the Device Name and IP on the front panel?",
  "Is wireless hardware sufficient to properly cover the intended usage area",
  "Are UPS devise present on the workstations?",
  "Are the cables neatly organized?",
  "Are the ports on the workstation/dock/laptop/wall jack loose or damaged?",
  "Are all computers powering on?",
  "Are all monitors powering on, free of defects and working correctly?",
  "Are all onsite printers working?",
  "Are all keyboards and mice working?",
  "If applicable, are all docking stations working as designed and with glitching screens",
  "Are all workstations labeled with their computers names?",
  "Have you taken pictures of workstations?",
  "Are all of the workstations the same type?",
  "Is a KVM needed for the site.",
  "Are the door hinges for IT Closets on the outside?",
  "Are UPS plugged directly into the power outlets and no extension cords are used to power the UPS."
];

export default function App() {
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  const [siteName, setSiteName] = useState("");
  const [date, setDate] = useState("");
  const [technician, setTechnician] = useState("");

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleNoteChange = (index, value) => {
    setNotes({ ...notes, [index]: value });
  };

  const exportData = () => {
    const csv = [["Site Name", siteName], ["Date", date], ["Technician", technician], [], ["Question", "Answer", "Note"]];
    questions.forEach((q, i) => {
      const answer = responses[i] === true ? "Yes" : responses[i] === false ? "No" : "";
      const note = notes[i] || "";
      csv.push([q, answer, note]);
    });
    const csvContent = csv.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const filename = `${siteName || 'site'}_${date || 'date'}_checklist.csv`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Valley Expetec Technical Alignment Dept</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          <input type="date" className="border rounded px-3 py-2 w-full" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Technician" value={technician} onChange={(e) => setTechnician(e.target.value)} />
        </div>

        {questions.map((q, i) => (
          <div key={i} className="bg-gray-50 border rounded p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium w-3/4">{q}</p>
              <select className="ml-4 border p-1 rounded text-sm" value={responses[i] ?? ''} onChange={(e) => handleChange(i, e.target.value === 'true')}>
                <option value="">--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <input type="text" className="mt-2 w-full border rounded px-2 py-1 text-sm" maxLength={50} placeholder="Note (50 characters max)" value={notes[i] || ''} onChange={(e) => handleNoteChange(i, e.target.value)} />
          </div>
        ))}

        <div className="text-center mt-6">
          <button onClick={exportData} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Export CSV</button>
        </div>
      </div>
    </div>
  );
}
