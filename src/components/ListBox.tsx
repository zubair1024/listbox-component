import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

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
  leftItems: IItem[];
  rightItems: IItem[];
  columnNames: string[];
  titleField: string;
  handleSave: () => void;
}

/**
 *
 * @param props
 * @description Component for displaying a list of items and allowing the user to move items between two lists
 *
 * @param heading - The heading of the component
 * @param subheading - The subheading of the component
 * @param itemType - The type of item being displayed in the list
 * @param parentItemType - The type of item that the list is being displayed for
 * @param leftItems - The items to be displayed in the left list
 * @param rightItems - The items to be displayed in the right list
 * @param columnNames - The names of the columns to be displayed in the list
 * @param titleField - The name of the field to be displayed as the title of the item
 * @param handleSave - The function to be called when the save button is clicked
 * @returns
 */
const ListBox = (props: ListBoxProps) => {
  const {
    heading,
    subheading,
    itemType,
    parentItemType,
    columnNames,
    titleField,
    leftItems: initialLeftItems,
    rightItems: initialRightItems,
  } = props;

  const [leftItems, setLeftItems] = useState<IItem[]>(initialLeftItems);
  const [rightItems, setRightItems] = useState<IItem[]>(
    initialRightItems.slice(0, 182)
  );
  const [selectedLeftItems, setSelectedLeftItems] = useState<IItem[]>([]);
  const [selectedRightItems, setSelectedRightItems] = useState<IItem[]>([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");

  const handleSelectLeftItem = (item: IItem) => {
    setSelectedLeftItems(
      selectedLeftItems.includes(item)
        ? selectedLeftItems.filter((z) => z !== item)
        : [...selectedLeftItems, item]
    );
  };

  const handleSelectRightItem = (item: IItem) => {
    setSelectedRightItems(
      selectedRightItems.includes(item)
        ? selectedRightItems.filter((z) => z !== item)
        : [...selectedRightItems, item]
    );
  };

  const moveToRight = () => {
    setRightItems(
      [...rightItems, ...selectedLeftItems].sort((a, b) =>
        a[titleField].localeCompare(b[titleField])
      )
    );
    setLeftItems(
      leftItems
        .filter((zone) => !selectedLeftItems.includes(zone))
        .sort((a, b) => a[titleField].localeCompare(b[titleField]))
    );
    setSelectedLeftItems([]);
  };

  const moveToLeft = () => {
    setLeftItems(
      [...leftItems, ...selectedRightItems].sort((a, b) =>
        a[titleField].localeCompare(b[titleField])
      )
    );
    setRightItems(
      rightItems
        .filter((zone) => !selectedRightItems.includes(zone))
        .sort((a, b) => a[titleField].localeCompare(b[titleField]))
    );
    setSelectedRightItems([]);
  };

  const filteredLeftZones = leftItems.filter((zone) =>
    zone[titleField].toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRightZones = rightItems.filter((zone) =>
    zone[titleField].toLowerCase().includes(rightSearch.toLowerCase())
  );

  const handleSelectAllLeft = () => {
    if (selectedLeftItems.length === filteredLeftZones.length) {
      setSelectedLeftItems([]);
    } else {
      setSelectedLeftItems(filteredLeftZones);
    }
  };

  const handleSelectAllRight = () => {
    if (selectedRightItems.length === filteredRightZones.length) {
      setSelectedRightItems([]);
    } else {
      setSelectedRightItems(filteredRightZones);
    }
  };

  return (
    <div className="p-6 space-y-3  text-sm">
      <div className="text-xl font-bold mb-4 text-left">{heading}</div>
      <div className=" font-light text-gray-600">{subheading}</div>
      <div className="list-boxes flex justify-between">
        <div className="list-box w-[45%] ">
          <div className="text-left py-3">{`${leftItems.length} ${itemType} not in ${parentItemType}`}</div>
          <div
            className={`border-[1px] border-gray-300  rounded-md px-3 py-2 ${
              selectedLeftItems.length > 0 ? "bg-[#eff1f5]" : ""
            }`}
          >
            <div className="relative flex items-center justify-center w-full py-1">
              <FaSearch
                size={12}
                className="absolute left-3 text-gray-500 pointer-events-none "
              />
              <input
                className="w-full rounded-md shadow-inner text-md  pl-8 border-0 p-1 pr-8  border-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-light "
                type="text"
                placeholder={`Search for a ${itemType}`}
                value={leftSearch}
                onChange={(e) => setLeftSearch(e.target.value)}
              />
            </div>
            <div className="list-box-box border-2   overflow-y-auto  h-[300px] w-full">
              <table className="w-full relative ">
                <thead className="sticky top-0 border-b-2  border-b-gray-300 text-left">
                  <tr className="font-light">
                    <th className="text-center px-2">
                      <input
                        type="checkbox"
                        checked={
                          selectedLeftItems.length === filteredLeftZones.length
                        }
                        onChange={handleSelectAllLeft}
                      />
                    </th>
                    {columnNames.map((columnName) => (
                      <th className="cursor-pointer font-light py-2 px-1">
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-left">
                  {filteredLeftZones.map((zone) => (
                    <tr
                      key={zone.id}
                      className={`border-b-2 border-gray-300 ${
                        zone.id === selectedLeftItems[0]?.id
                          ? "bg-[#D2E4F9] "
                          : ""
                      }`}
                    >
                      <td className="text-center px-2">
                        <input
                          type="checkbox"
                          className=""
                          checked={selectedLeftItems.includes(zone)}
                          onChange={() => handleSelectLeftItem(zone)}
                        />
                      </td>
                      <td className="py-2 px-1 font-bold">{zone.title}</td>
                      <td className="font-bold">{zone.ap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={moveToRight}
            disabled={selectedLeftItems.length === 0}
            className="mt-3 w-full py-3 shadow-sm border-2 border-[#ca0f04] bg-[#ca0f04] text-white  text-center  font-light flex justify-center items-center  disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
          >
            <span className="font-bold">{`Remove ${itemType}(s) `}</span>
            <span className="pl-1"> {` from the ${parentItemType}`}</span>
            <FaArrowRight
              style={{ display: "inline-block", paddingLeft: "5px" }}
            />
          </button>
        </div>
        <div className="zone-list w-[45%]">
          <div className="text-left py-3">{`${rightItems.length} ${itemType} not in ${parentItemType}`}</div>
          <div
            className={`border-[1px] border-gray-300  rounded-md px-3 py-2 ${
              selectedRightItems.length > 0 ? "bg-[#eff1f5]" : ""
            }`}
          >
            <div className="relative flex items-center justify-center w-full py-1">
              <FaSearch
                size={12}
                className="absolute left-3 text-gray-500 pointer-events-none "
              />
              <input
                className="w-full rounded-md shadow-inner text-md  pl-8 border-0 p-1 pr-8  border-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-light "
                type="text"
                placeholder={`Search for a ${itemType}`}
                value={rightSearch}
                onChange={(e) => setRightSearch(e.target.value)}
              />
            </div>
            <div className="zone-list-box border-2  overflow-y-auto  h-[300px] w-full">
              <table className="w-full relative ">
                <thead className="sticky top-0 bg-white border-b-2 border-b-gray-300 text-left">
                  <tr className="font-light">
                    <th className="text-center px-2">
                      <input
                        type="checkbox"
                        checked={
                          selectedRightItems.length ===
                          filteredRightZones.length
                        }
                        onChange={handleSelectAllRight}
                      />
                    </th>
                    {columnNames.map((columnName) => (
                      <th className="cursor-pointer font-light py-2 px-1">
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-left">
                  {filteredRightZones.map((zone) => (
                    <tr key={zone.id} className="border-b-2 border-gray-300">
                      <td className="text-center px-2">
                        <input
                          type="checkbox"
                          className=""
                          checked={selectedRightItems.includes(zone)}
                          onChange={() => handleSelectRightItem(zone)}
                        />
                      </td>
                      <td className="py-2 px-1 font-bold">{zone.title}</td>
                      <td className="font-bold">{zone.ap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={moveToLeft}
            disabled={selectedRightItems.length === 0}
            className="mt-3 w-full py-3 shadow-sm border-2 border-[#1D72D4] bg-[#1D72D4] text-white  text-center  font-light flex justify-center items-center  disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
          >
            <FaArrowLeft
              style={{ display: "inline-block", paddingRight: "5px" }}
            />
            <span className="font-bold">{`Add ${itemType}(s) `}</span>
            <span className="pl-1"> {` to the ${parentItemType}`}</span>
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#1D72D4] hover:bg-[#1D72D4] text-white font-light py-2 px-4"
          onClick={() => alert("Save functionality not implemented")}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default ListBox;
