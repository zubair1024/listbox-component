import React, { useState } from "react";

interface IItem {
  id: number;
  title: string;
  ap: number;
}

interface ListBoxProps {
  heading: string;
  subheading: string;
  itemType: string;
  parentItemType: string;
  // leftItems: IItem[];
  // rightItems: IItem[];
  // selectedLeftItems: IItem[];
  // selectedRightItems: IItem[];
  // handleSelectLeftItem: (zone: IItem) => void;
  // handleSelectRightItem: (zone: IItem) => void;
  // moveToRight: () => void;
  // moveToLeft: () => void;
}

const ListBox = (props: ListBoxProps) => {
  const {
    heading,
    subheading,
    itemType,
    parentItemType,
    // leftItems,
    // rightItems,
    // selectedLeftItems,
    // selectedRightItems,
    // handleSelectLeftItem,
    // handleSelectRightItem,
    // moveToRight,
    // moveToLeft,
  } = props;
  // Sample data for zones
  const initialLeftItems = [
    { id: 1, title: "Zone Name 1", ap: 10 },
    { id: 2, title: "Zone Name 2", ap: 10 },
    { id: 3, title: "Zone Name 3", ap: 10 },
    { id: 4, title: "Zone Name 4", ap: 10 },
  ];

  const initialRightItems = Array.from({ length: 182 }, (_, i) => ({
    id: i + 5,
    title: `Zone Name ${i + 5}`,
    ap: 10,
  }));

  const [leftItems, setLeftItems] = useState<IItem[]>(initialLeftItems);
  const [rightItems, setRightItems] = useState<IItem[]>(
    initialRightItems.slice(0, 182)
  );
  const [selectedLeftItems, setSelectedLeftItems] = useState<IItem[]>([]);
  const [selectedRightItems, setSelectedRightItems] = useState<IItem[]>([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  // Handle selection of zones
  const handleSelectLeftItem = (item) => {
    setSelectedLeftItems(
      selectedLeftItems.includes(item)
        ? selectedLeftItems.filter((z) => z !== item)
        : [...selectedLeftItems, item]
    );
  };

  const handleSelectRightItem = (item) => {
    setSelectedRightItems(
      selectedRightItems.includes(item)
        ? selectedRightItems.filter((z) => z !== item)
        : [...selectedRightItems, item]
    );
  };

  // Handle moving zones
  const moveToRight = () => {
    setRightItems([...rightItems, ...selectedLeftItems]);
    setLeftItems(
      leftItems
        .filter((zone) => !selectedLeftItems.includes(zone))
        .sort((a, b) => a.title.localeCompare(b.title))
    );
    setSelectedLeftItems([]);
  };

  const moveToLeft = () => {
    setLeftItems([...leftItems, ...selectedRightItems]);
    setRightItems(
      rightItems.filter((zone) => !selectedRightItems.includes(zone))
    );
    setSelectedRightItems([]);
  };

  // Handle search filter
  const filteredLeftZones = leftItems.filter((zone) =>
    zone.title.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRightZones = rightItems.filter((zone) =>
    zone.title.toLowerCase().includes(rightSearch.toLowerCase())
  );

  return (
    <div className="zone-management">
      <h2>{heading}</h2>
      <div>{subheading}</div>
      <div className="zone-lists">
        <div className="zone-list">
          <div>{`${leftItems.length} ${itemType} in ${parentItemType}`}</div>
          <input
            type="text"
            placeholder="Search for a Zone"
            value={leftSearch}
            onChange={(e) => setLeftSearch(e.target.value)}
          />
          <div className="zone-list-box">
            {filteredLeftZones.map((zone) => (
              <div key={zone.id}>
                <input
                  type="checkbox"
                  checked={selectedLeftItems.includes(zone)}
                  onChange={() => handleSelectLeftItem(zone)}
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
          <div>{`${rightItems.length} ${itemType} not in ${parentItemType}`}</div>
          <input
            type="text"
            placeholder="Search for a Zone"
            value={rightSearch}
            onChange={(e) => setRightSearch(e.target.value)}
          />
          <div className="zone-list-box">
            {filteredRightZones.map((zone) => (
              <div key={zone.id}>
                <input
                  type="checkbox"
                  checked={selectedRightItems.includes(zone)}
                  onChange={() => handleSelectRightItem(zone)}
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
