import { CSSProperties, useState } from "react";
import "./App.css";
import AgoraUIKit, { layout } from "agora-react-uikit";

function App() {
  const [channelName, setChannelName] = useState("test");
  const [AppID, setAppID] = useState("");
  const [token, setToken] = useState("");
  const [inCall, setInCall] = useState(false);

  return (
    <div style={styles.container}>
      <h1>Agora React Videocall</h1>
      {!inCall ? (
        <Form
          AppID={AppID}
          setAppID={setAppID}
          channelName={channelName}
          setChannelName={setChannelName}
          token={token}
          setToken={setToken}
          setInCall={setInCall}
        />
      ) : (
        <Videos channelName={channelName} AppID={AppID} token={token} />
      )}
    </div>
  );
}

function Videos(props: { channelName: string; AppID: string; token: string }) {
  const { AppID, channelName, token } = props;
  return (
    <div style={{ width: 1200, height: 800, flex: 1, display: "flex" }}>
      <AgoraUIKit
        rtcProps={{
          appId: AppID,
          channel: channelName,
          token: token,
          layout: layout.grid,
        }}
        callbacks={{
          "connection-state-change": () => {
            setTimeout(() => {
              let videosDom = document.getElementsByTagName("video");
              console.log("!videosDom", videosDom);
              [...videosDom].map((video) =>
                video.setAttribute("controls", "true")
              );
            }, 500);
          },
          "user-published": () => {
            setTimeout(() => {
              let videosDom = document.getElementsByTagName("video");
              console.log("!videosDom", videosDom);
              [...videosDom].map((video) =>
                video.setAttribute("controls", "true")
              );
            }, 500);
          },
        }}
        styleProps={{
          localBtnContainer: { display: "none" },
          UIKitContainer: {
            width: 1200,
            height: 800,
            flex: 1,
            display: "flex",
          },
        }}
      />
    </div>
  );
}

/* Standard form to enter AppID and Channel Name */
function Form(props: {
  AppID: string;
  setAppID: Function;
  channelName: string;
  setChannelName: Function;
  token: string;
  setToken: Function;
  setInCall: Function;
}) {
  const {} = props;
  const {
    AppID,
    setAppID,
    channelName,
    setChannelName,
    token,
    setToken,
    setInCall,
  } = props;
  return (
    <div>
      <p>Please enter your Agora AppID and Channel Name</p>
      <label htmlFor="appid">Agora App ID: </label>
      <input
        id="appid"
        type="text"
        value={AppID}
        onChange={(e) => setAppID(e.target.value)}
        placeholder="required"
      />
      <br />
      <br />
      <label htmlFor="channel">Channel Name: </label>
      <input
        id="channel"
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="required"
      />
      <br />
      <br />
      <label htmlFor="token">Channel Token: </label>
      <input
        id="token"
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="optional"
      />
      <br />
      <br />
      <button
        onClick={() =>
          AppID && channelName
            ? setInCall(true)
            : alert("Please enter Agora App ID and Channel Name")
        }
      >
        Join
      </button>
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as CSSProperties["flexDirection"],
    flex: 1,
    justifyContent: "center",
  },
};
