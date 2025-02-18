import { FC, useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import api from "../api";
import Chat from "../components/Chat";
import Notes from "../components/Notes";
const Home: FC = () => {
  const [username, setUsername] = useState<string>("");

  const getUser = useCallback(() => {
    api
      .get("/api/myprofile/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        const username = JSON.parse(data).username;
        setUsername(username);
      });
  }, []);

  useEffect(() => {
    if (!username) getUser();
  }, [username, getUser]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* TODO: style this div as navbar */}
      <div style={{ margin: "0.2rem", float: "right" }}>
        You are logged as <b>{username}</b>
        <a href="/logout" style={{ appearance: "button", margin: "0 1rem" }}>
          Logout
        </a>
      </div>
      <Tabs style={{ marginTop: "0.5rem" }}>
        <TabList>
          <Tab>Chat</Tab>
          <Tab>Notes</Tab>
        </TabList>
        <TabPanel>
          <Chat />
        </TabPanel>
        <TabPanel>
          <Notes />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Home;
