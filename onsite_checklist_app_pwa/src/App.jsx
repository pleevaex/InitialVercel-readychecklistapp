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

function App() {
  const [responses, setResponses] = useState({});

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const exportData = () => {
    const csv = ['Question,Answer'];
    questions.forEach((q, i) => {
      const answer = responses[i] === true ? 'Yes' : responses[i] === false ? 'No' : '';
      csv.push(`"${q.replace(/"/g, '""')}",${answer}`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'checklist_export.csv');
    link.click();
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Onsite Checklist</h1>
      {questions.map((q, i) => (
        <div key={i} className="flex justify-between items-center bg-white p-4 shadow rounded">
          <label className="text-sm w-[75%]">{q}</label>
          <select
            className="ml-4 border p-1 rounded text-sm"
            value={responses[i] ?? ''}
            onChange={(e) => handleChange(i, e.target.value === 'true')}
          >
            <option value="">--</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      ))}
      <div className="text-center mt-6">
        <button
          onClick={exportData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default App;
