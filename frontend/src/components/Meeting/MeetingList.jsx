import React, { useEffect, useState } from "react";
import axios from "axios";

function MeetingList() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/meetings/public"
        );
        const data = response.data;
        // Przetwarzanie pobranych danych
        console.log(data);
      } catch (error) {
        console.error("Błąd pobierania danych z API:", error);
      }
    };

    fetchData();
  }, []);
  return <div>MeetingList</div>;
}

export default MeetingList;
