import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () => {
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request("/api/link/generate", "POST", {
          from: link
        });
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Insert URL"
            id="link"
            type="text"
            name="text"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="text">Link</label>
        </div>
      </div>
    </div>
  );
};
