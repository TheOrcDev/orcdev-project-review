"use client";

import { useState } from "react";
import { Button } from "./ui/8bit/button";
import { Input } from "./ui/8bit/input";
import { Label } from "./ui/label";

export function RandomNumber() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Label htmlFor="total-projects">Total projects</Label>
        <Input
          id="total-projects"
          onChange={(e) => setTotalProjects(Number(e.target.value))}
          type="number"
          value={totalProjects}
        />
      </div>

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
