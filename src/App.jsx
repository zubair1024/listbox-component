import "./App.css";
import ListBox from "./components/ListBox";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <ListBox
          heading="Edit Zones for General Entrance"
          subheading="Move zones between the left and right lists using the provided buttons to add or remove zones from the permission."
          itemType="Zone"
          parentItemType="Permission"
          leftItems={[
            { id: 1, title: "Zone Name 1", ap: 10 },
            { id: 2, title: "Zone Name 2", ap: 10 },
            { id: 3, title: "Zone Name 3", ap: 10 },
            { id: 4, title: "Zone Name 4", ap: 10 },
          ]}
          rightItems={[
            { id: 5, title: "Zone Name 5", ap: 10 },
            { id: 6, title: "Zone Name 6", ap: 10 },
            { id: 7, title: "Zone Name 7", ap: 10 },
            { id: 8, title: "Zone Name 8", ap: 10 },
            { id: 9, title: "Zone Name 9", ap: 10 },
          ]}
          titleField="title"
          columnNames={[
            {
              title: "Title",
              field: "title",
              type: "text",
            },
            {
              title: "AP",
              field: "ap",
              type: "number",
            },
          ]}
          handleSave={() => alert("Save functionality not implemented")}
        />
      </div>
    </>
  );
}

export default App;
