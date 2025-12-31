"use client";

import { useState } from "react";
import { Button } from "./ui/8bit/button";
import { Input } from "./ui/8bit/input";

export function RandomNumber() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Input
        onChange={(e) => setTotalProjects(Number(e.target.value))}
        type="number"
        value={totalProjects}
      />

      <Button
        onClick={() =>
          setRandomNumber(Math.floor(Math.random() * totalProjects))
        }
      >
        Generate Random Number
      </Button>

      {randomNumber ? <h2>Random Number: {randomNumber}</h2> : null}
    </div>
  );
}
