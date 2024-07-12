import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

interface IItem {
  id: number;
  title: string;
  [key: string]: unknown;
}

interface IColumn {
  title: string;
  field: string;
  type: "text" | "number";
}

interface ListBoxProps {
  heading: string;
  subheading: string;
  itemType: string;
  parentItemType: string;
  leftItems: IItem[];
  rightItems: IItem[];
  columnNames: IColumn[];
  handleSave: (leftItems: IItem[], rightItems: IItem[]) => void;
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
 * @param columnNames - The names of the columns to be displayed in the list. The field name is the name of the field in the item object, and the type is either "text" or "number"
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
    leftItems: initialLeftItems,
    rightItems: initialRightItems,
    handleSave,
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
        a.title.localeCompare(b.title)
      )
    );
    setLeftItems(
      leftItems
        .filter((item) => !selectedLeftItems.includes(item))
        .sort((a, b) => a.title.localeCompare(b.title))
    );
    setSelectedLeftItems([]);
  };

  const moveToLeft = () => {
    setLeftItems(
      [...leftItems, ...selectedRightItems].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    );
    setRightItems(
      rightItems
        .filter((item) => !selectedRightItems.includes(item))
        .sort((a, b) => a.title.localeCompare(b.title))
    );
    setSelectedRightItems([]);
  };

  const filteredLeftItems = leftItems.filter((item) =>
    item.title.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRightItem = rightItems.filter((item) =>
    item.title.toLowerCase().includes(rightSearch.toLowerCase())
  );

  const handleSelectAllLeft = () => {
    if (selectedLeftItems.length === filteredLeftItems.length) {
      setSelectedLeftItems([]);
    } else {
      setSelectedLeftItems(filteredLeftItems);
    }
  };

  const handleSelectAllRight = () => {
    if (selectedRightItems.length === filteredRightItem.length) {
      setSelectedRightItems([]);
    } else {
      setSelectedRightItems(filteredRightItem);
    }
  };

  return (
    <div className="p-6 space-y-3  text-sm">
      <div className="text-xl font-bold mb-4 text-left">{heading}</div>
      <div className=" font-light text-gray-600">{subheading}</div>
      <div className="list-boxes flex justify-center space-x-5">
        <div className="list-box w-[50%] ">
          <div className="text-left py-3 font-bold">{`${leftItems.length} ${itemType}  in ${parentItemType}`}</div>
          <div
            className={`border-[1px] border-gray-[#E6E8EA]  rounded-md p-3 ${
              selectedLeftItems.length > 0 ? "bg-[#eff1f5]" : ""
            }`}
          >
            <div className="relative flex items-center justify-center w-full py-1">
              <FaSearch
                size={12}
                className="absolute left-3 text-gray-500 pointer-events-none "
              />
              <input
                className="w-full rounded-md shadow-inner text-md  pl-8 border-0 p-1 pr-8  border-gray-[#E6E8EA] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-light "
                type="text"
                placeholder={`Search for a ${itemType}`}
                value={leftSearch}
                onChange={(e) => setLeftSearch(e.target.value)}
              />
            </div>
            <div className="list-box-box    overflow-y-auto  h-[300px] w-full">
              {filteredLeftItems.length > 0 ? (
                <table className="w-full relative  ">
                  <thead className="sticky top-0  text-left">
                    <tr className="font-light">
                      <th className="text-center px-2">
                        <input
                          type="checkbox"
                          checked={
                            filteredLeftItems.length > 0 &&
                            selectedLeftItems.length ===
                              filteredLeftItems.length
                          }
                          onChange={handleSelectAllLeft}
                        />
                      </th>
                      {columnNames.map((columnName) => (
                        <th className="cursor-pointer font-light py-2 px-1">
                          {columnName.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-left border-2 border-[#E6E8EA]">
                    {filteredLeftItems.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-b-2 border-gray-[#E6E8EA] ${
                          selectedLeftItems.includes(item)
                            ? "bg-[#D2E4F9] "
                            : ""
                        }`}
                      >
                        <td className="text-center px-2">
                          <input
                            type="checkbox"
                            className=""
                            checked={selectedLeftItems.includes(item)}
                            onChange={() => handleSelectLeftItem(item)}
                          />
                        </td>
                        {columnNames.map((columnName) => (
                          <td className="py-2 px-1 font-bold">
                            {item[columnName.field] as string | number}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-left font-light p-3">
                  No items to display
                </div>
              )}
            </div>
            <button
              onClick={moveToRight}
              disabled={selectedLeftItems.length === 0}
              className="mt-3 w-full py-3 shadow-sm border-2 border-[#ca0f04] bg-[#ca0f04] text-white  text-center  font-light flex justify-center items-center  disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-[#E6E8EA]"
            >
              <span className="font-bold">{`Remove ${itemType}(s) `}</span>
              <span className="pl-1"> {` from the ${parentItemType}`}</span>
              <FaArrowRight
                style={{ display: "inline-block", paddingLeft: "5px" }}
              />
            </button>
          </div>
        </div>
        <div className="box-list w-[50%]">
          <div className="text-left py-3 font-bold">{`${rightItems.length} ${itemType} not in ${parentItemType}`}</div>
          <div
            className={`border-[1px] border-gray-[#E6E8EA]  rounded-md p-3 ${
              selectedRightItems.length > 0 ? "bg-[#eff1f5]" : ""
            }`}
          >
            <div className="relative flex items-center justify-center w-full py-1">
              <FaSearch
                size={12}
                className="absolute left-3 text-gray-500 pointer-events-none "
              />
              <input
                className="w-full rounded-md shadow-inner text-md  pl-8 border-0 p-1 pr-8  border-gray-[#E6E8EA] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 font-light "
                type="text"
                placeholder={`Search for a ${itemType}`}
                value={rightSearch}
                onChange={(e) => setRightSearch(e.target.value)}
              />
            </div>
            <div className="list-box-box    overflow-y-auto  h-[300px] w-full">
              {filteredRightItem.length > 0 ? (
                <table className="w-full relative  ">
                  <thead className="sticky top-0  text-left">
                    <tr className="font-light">
                      <th className="text-center px-2">
                        <input
                          type="checkbox"
                          checked={
                            filteredRightItem.length > 0 &&
                            selectedRightItems.length ===
                              filteredRightItem.length
                          }
                          onChange={handleSelectAllRight}
                        />
                      </th>
                      {columnNames.map((columnName) => (
                        <th className="cursor-pointer font-light py-2 px-1">
                          {columnName.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-left border-2 border-[#E6E8EA]">
                    {filteredRightItem.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-b-2 border-gray-[#E6E8EA] ${
                          selectedRightItems.includes(item)
                            ? "bg-[#D2E4F9] "
                            : ""
                        }`}
                      >
                        <td className="text-center px-2">
                          <input
                            type="checkbox"
                            className=""
                            checked={selectedRightItems.includes(item)}
                            onChange={() => handleSelectRightItem(item)}
                          />
                        </td>
                        {columnNames.map((columnName) => (
                          <td className="py-2 px-1 font-bold">
                            {item[columnName.field] as string | number}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-left font-light p-3">
                  No items to display
                </div>
              )}
            </div>
            <button
              onClick={moveToLeft}
              disabled={selectedRightItems.length === 0}
              className="mt-3 w-full py-3 shadow-sm border-2 border-[#1D72D4] bg-[#1D72D4] text-white  text-center  font-light flex justify-center items-center  disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-[#E6E8EA]"
            >
              <FaArrowLeft
                style={{ display: "inline-block", paddingRight: "5px" }}
              />
              <span className="font-bold">{`Add ${itemType}(s) `}</span>
              <span className="pl-1"> {` to the ${parentItemType}`}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#1D72D4] hover:bg-[#1D72D4] text-white font-light py-2 px-4"
          onClick={() => handleSave(leftItems, rightItems)}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default ListBox;
