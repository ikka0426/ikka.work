"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { breakSortCal, finaleScoreCal } from "@/lib/calculation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MaimaiDxToFinale() {
  return (
    <>
      <Alert className="w-full my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>注意</AlertTitle>
        <AlertDescription>
          本计算器提供的计算方法参考自B站专栏：
          <Link href="https://www.bilibili.com/opus/695015525113135112" target="blank" className="text-blue-400 inline">
            maimai判定全解 第三部分 详细计分规则 - 墨滢-moying
          </Link>
          不保证计算过程中的四舍五入完全正确，如果有Bug，可以通过主页的评论反馈。
        </AlertDescription>
      </Alert>
      <ScoreCalculator />
    </>
  )
}

function ScoreCalculator() {
  const rowLabels = ['Tap', 'Hold', 'Slide', 'Touch', 'Break'];
  const colLabels = ['Critical Perfect', 'Perfect', 'Great', 'Good', 'Miss'];
  const columnColors = {
    'Critical Perfect': 'text-yellow-400',
    'Perfect': 'text-yellow-500',
    'Great': 'text-pink-500',
    'Good': 'text-lime-600',
    'Miss': 'text-neutral-700'
  }
  type ColumnKey = keyof typeof columnColors;

  const initialInputs = Array(5).fill(0).map(() => Array(5).fill(0));
  const initialDxScore = 0;
  
  const [inputs, setInputs] = useState(initialInputs);
  const [dxScore, setDxScore] = useState<number>(initialDxScore);
  const [result, setResult] = useState<{breakSort: number[], finaleScore: number}[] | null>(null);

  const handleReset = () => {
    setInputs(initialInputs);
    setDxScore(initialDxScore);
    setResult(null);
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[row][col] = Math.min(9999, Math.max(0, parseInt(value) || 0));
    setInputs(newInputs);
  };

  const handleDxScoreChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    const clampedValue = Math.min(101, Math.max(0, parseFloat(numValue.toFixed(4))));
    setDxScore(clampedValue);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">
          DX达成率
        </label>
        <div className="relative">
          <Input
            type="number"
            min="0"
            max="101"
            step="0.0001"
            value={dxScore}
            onChange={(e) => handleDxScoreChange(e.target.value)}
            className="w-full h-8 pl-2 pr-8"
          />
          <span className="absolute right-3 top-2 text-sm text-gray-500">%</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-6 gap-1 mb-1">
          <div className="text-xs font-medium"></div>
          {colLabels.map((label, i) => (
            <div key={i} className={`text-xs font-medium text-center ${columnColors[label as ColumnKey]}`}>{label}</div>
          ))}
        </div>

        {rowLabels.map((rowLabel, row) => (
          <div key={row} className="grid grid-cols-6 gap-1 mb-1">
            <div className="text-xs font-medium flex items-center">{rowLabel}</div>
            {colLabels.map((_, col) => (
              <Input
                key={col}
                type="number"
                value={inputs[row][col]}
                onChange={(e) => handleInputChange(row, col, e.target.value)}
                className="h-8 text-xs p-1 text-center"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Button 
          onClick={() => {
            let breakSort = breakSortCal(inputs, dxScore)
            let finaleScore = finaleScoreCal(inputs, breakSort)
            if (breakSort.length == finaleScore.length) {
              setResult(breakSort.map((breakSort, index) => ({
                breakSort,
                finaleScore: finaleScore[index]
              })))
            }
          }}
          className="flex-1 h-8 text-sm"
        >
          计算
        </Button>
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="flex-1 h-8 text-sm"
        >
          清空
        </Button>
      </div>

      {result !== null && (
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
          <p className="text-sm text-muted-foreground">可能的绝赞分布及对应旧框达成率</p>
          {result.map((res, _) => (
            <>
              <p className="text-sm">Perfect-1 共 {res.breakSort[0]} 个</p>
              <p className="text-sm">Perfect-2 共 {res.breakSort[1]} 个</p>
              <p className="text-sm">Great-1 共 {res.breakSort[2]} 个</p>
              <p className="text-sm">Great-2 共 {res.breakSort[3]} 个</p>
              <p className="text-sm">Great-3 共 {res.breakSort[4]} 个</p>
              <p className="text-sm">Finale Score: {res.finaleScore.toFixed(2)}</p>
            </>
          ))}
        </div>
      )}
    </div>
  );
}