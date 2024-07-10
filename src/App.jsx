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
        />
      </div>
    </>
  );
}

export default App;
