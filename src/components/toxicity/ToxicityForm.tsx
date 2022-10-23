import React, { FC, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

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
      "identity_attack", // 名指しの攻撃
      "insult", // 侮辱
      "obscene", // 猥褻
      "severe_toxicity", // 極端に有害
      "sexual_explicit", // あからさまに性的な表現
      "threat", // 脅迫
      "toxicity", // 有害
    ];
    // load()はネットワーク経由で実際のモデルファイルをダウンロードする
    toxicity.load(threshold, toxicityLabels).then((model) => {
      // 彼女は石器人みたいだ。知性はそれ以下だけど！
      // She looks like a cavewoman, only far less intelligent!

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
    </div>
  );
};
