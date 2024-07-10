import React, { useState } from "react";

interface IZone {
  id: number;
  title: string;
  ap: number;
}

const ListBox = () => {
  // Sample data for zones
  const initialLeftZones: IZone[] = [
    { id: 1, title: "Zone Name 1", ap: 10 },
    { id: 2, title: "Zone Name 2", ap: 10 },
    { id: 3, title: "Zone Name 3", ap: 10 },
    { id: 4, title: "Zone Name 4", ap: 10 },
  ];

  const initialRightZones = Array.from({ length: 182 }, (_, i) => ({
    id: i + 5,
    title: `Zone Name ${i + 5}`,
    ap: 10,
  }));

  const [leftZones, setLeftZones] = useState<IZone[]>(initialLeftZones);
  const [rightZones, setRightZones] = useState<IZone[]>(initialRightZones);
  const [selectedLeftZones, setSelectedLeftZones] = useState<IZone[]>([]);
  const [selectedRightZones, setSelectedRightZones] = useState<IZone[]>([]);

  // Handle selection of zones
  const handleSelectLeftZone = (zone: IZone) => {
    setSelectedLeftZones(
      selectedLeftZones.includes(zone)
        ? selectedLeftZones.filter((z) => z !== zone)
        : [...selectedLeftZones, zone]
    );
  };

  const handleSelectRightZone = (zone) => {
    setSelectedRightZones(
      selectedRightZones.includes(zone)
        ? selectedRightZones.filter((z) => z !== zone)
        : [...selectedRightZones, zone]
    );
  };

  // Handle moving zones
  const moveToRight = () => {
    setRightZones([...rightZones, ...selectedLeftZones]);
    setLeftZones(leftZones.filter((zone) => !selectedLeftZones.includes(zone)));
    setSelectedLeftZones([]);
  };

  const moveToLeft = () => {
    setLeftZones([...leftZones, ...selectedRightZones]);
    setRightZones(
      rightZones.filter((zone) => !selectedRightZones.includes(zone))
    );
    setSelectedRightZones([]);
  };

  return (
    <div className="zone-management">
      <h2>Edit Zones for General Entrance</h2>
      <div className="zone-lists">
        <div className="zone-list">
          <h3>Zones in Permission</h3>
          <div className="zone-list-box">
            <input type="text" placeholder="Search zones" />
            {leftZones.map((zone) => (
              <div key={zone.id} className="p-2 flex">
                <input
                  type="checkbox"
                  checked={selectedLeftZones.includes(zone)}
                  onChange={() => handleSelectLeftZone(zone)}
                />
                {zone.title} ({zone.ap})
              </div>
            ))}
          </div>
          <button onClick={moveToRight}>
            Remove zone(s) from the permission
          </button>
        </div>
        <div className="zone-list">
          <h3>Zones not in Permission</h3>
          <div className="zone-list-box">
            {rightZones.map((zone) => (
              <div key={zone.id}>
                <input
                  type="checkbox"
                  checked={selectedRightZones.includes(zone)}
                  onChange={() => handleSelectRightZone(zone)}
                />
                {zone.title} ({zone.ap})
              </div>
            ))}
          </div>
          <button onClick={moveToLeft}>Add zone(s) to the permission</button>
        </div>
      </div>
      <button onClick={() => alert("Save functionality not implemented")}>
        SAVE
      </button>
    </div>
  );
};

export default ListBox;
