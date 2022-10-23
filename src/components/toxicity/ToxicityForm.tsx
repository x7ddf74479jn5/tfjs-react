import React, { FC, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

import { PieChartSection } from "./PieChartSection";
import { Loading } from "./Loading";
import type { Predictions } from "../../types";

export const ToxicityForm: FC = () => {
  const [isWait, setIsWait] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<Predictions>([]);
  const blurSetMessage = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const submitToxicity = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsWait(true);
    e.preventDefault();
    const threshold = 0.5;
    const toxicityLabels = [
      "identity_attack",
      "insult",
      "obscene",
      "severe_toxicity",
      "sexual_explicit",
      "threat",
      "toxicity",
    ];

    toxicity.load(threshold, toxicityLabels).then((model) => {
      const sentences = [message];

      model.classify(sentences).then((predictions) => {
        setIsWait(false);
        setResults(predictions);
      });
    });
  };

  return (
    <div>
      <form onSubmit={submitToxicity}>
        <textarea
          name="message"
          id="message"
          className="toxicity-textarea"
          cols={50}
          rows={5}
          defaultValue={message}
          onBlur={(e) => blurSetMessage(e)}
        />
        <br />
        <button type="submit">submit</button>
      </form>
      {isWait ? <Loading /> : <PieChartSection results={results} />}
    </div>
  );
};
