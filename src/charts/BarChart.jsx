import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-google-charts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// Material chart options
const options = {
  chart: {
    title: "Application Performance",
    subtitle: "Number of application over the weeks",
  },
  colors: ["#1b9e77", "#d95f02", "#7570b3"],
};

export default function BarChart() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "applications"));
      const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRows(items);
    };
    load();
  }, []);

  const data = useMemo(() => {
    const buckets = new Map();
    rows.forEach((row) => {
      const raw = row?.date_applied || row?.date;
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) return;
      const key = parsed.toISOString().slice(0, 10); // YYYY-MM-DD
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });

    const entries = Array.from(buckets.entries()).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    return [
      ["Date", "Number of Applications"],
      ...entries.map(([key, count]) => {
        const [y, m, d] = key.split("-");
        return [`${m}/${d}`, count];
      }),
    ];
  }, [rows]);

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="550px"
      data={data}
      options={options}
    />
  );
}
