import "./App.css";
import FacebookWithGraphApi from "./components/graphApi";
import FacebookShareButtonT from "./components/shareWithSDK";
// import FacebookShareButtonWithSDK from "./components/shareWithSDK";
// import Share from "./components/shareAll";
import FacebookShareButton from "./FB-button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <FacebookShareButton></FacebookShareButton> */}
        <FacebookShareButtonT></FacebookShareButtonT>
        {/* <FacebookWithGraphApi></FacebookWithGraphApi> */}
        {/* <Share description={"this is a basic share page"} /> */}
      </header>
    </div>
  );
}

export default App;
