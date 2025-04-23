
const toTap = [1, 2, 3, 1, 5]

const baseLostRatio = [
  [0, 0, 0.2, 0.5, 1],
  [0, 0, 0.4, 1, 2],
  [0, 0, 0.6, 1.5, 3],
  [0, 0, 0.2, 0.5, 1],
  [0, 0, [1, 2, 2.5], 3, 5]
]

const additionLostRatio = [
  0,
  [0.25, 0.5],
  0.6,
  0.7,
  1
]

const finaleBreakRatio = [5.2, 5.1, 5, 4, 3, 2.5, 2, 0]

export function breakSortCal(result: number[][], score: number): number[][] {
  let tapNum = 0
  for (let i = 0; i < 5; ++i) {
      for (let j = 0; j < 5; ++j) {
          tapNum += result[i][j] * toTap[i]
      }
  }
  let breakNum = 0;
  for (let i = 0; i < 5; ++i) {
      breakNum += result[4][i]
  }
  let baseLost = 100. / tapNum
  let additionLost = 1. / breakNum
  let lostScore = 101 - score;
  for (let i = 0; i < 4; ++i) {
      for (let j = 0; j < 5; ++j) {
          lostScore -= result[i][j] * (baseLostRatio[i][j] as number) * baseLost
      }
  }
  lostScore -= result[4][2] * (additionLostRatio[2] as number) * additionLost;
  lostScore -= result[4][3] * (baseLostRatio[4][3] as number) * baseLost + result[4][3] * (additionLostRatio[3] as number) * additionLost;
  lostScore -= result[4][4] * (baseLostRatio[4][4] as number) * baseLost + result[4][4] * (additionLostRatio[4] as number) * additionLost;
  let legalSort = []
  for (let z = 0; z <= result[4][2]; ++z) {
      if (lostScore - z * (baseLostRatio[4][2] as number[])[2] * baseLost < -0.001) {
          break
      }
      for (let y = 0; y <= result[4][2] - z; ++y) {
          let x = result[4][2] - z - y
          if (lostScore - (z * (baseLostRatio[4][2] as number[])[2] + y * (baseLostRatio[4][2] as number[])[1] + x * (baseLostRatio[4][2] as number[])[0]) * baseLost < -0.001) {
              break
          }
          for (let n = 0; n <= result[4][1]; ++n) {
              let m = result[4][1] - n
              let delta = lostScore - (z * (baseLostRatio[4][2] as number[])[2] + y * (baseLostRatio[4][2] as number[])[1] + x * (baseLostRatio[4][2] as number[])[0]) * baseLost
                                    - (n * (additionLostRatio[1] as number[])[0] + m * (additionLostRatio[1] as number[])[1]) * additionLost
              if (delta < 0.0001 && delta > -0.0001) {
                  legalSort.push([n, m, x, y, z])
              }
          }
      }
  }
  return legalSort;
}


export function finaleScoreCal(result: number[][], breakSort: number[][]): number[] {
  let tapNum = 0
  for (let i = 0; i < 5; ++i) {
      for (let j = 0; j < 5; ++j) {
          tapNum += result[i][j] * toTap[i]
      }
  }
  let baseLost = 100. / tapNum
  let finaleScore = []
  for (let sortCase of breakSort) {
      let caseScoreRatio = 0
      for (let i = 0; i < 4; ++i) {
          for (let j = 0; j < 5; ++j) {
              caseScoreRatio += (toTap[i] - (baseLostRatio[i][j] as number)) * result[i][j]
          }
      }
      caseScoreRatio += finaleBreakRatio[0] * result[4][0]
      caseScoreRatio += finaleBreakRatio[1] * sortCase[0]
      caseScoreRatio += finaleBreakRatio[2] * sortCase[1]
      caseScoreRatio += finaleBreakRatio[3] * sortCase[2]
      caseScoreRatio += finaleBreakRatio[4] * sortCase[3]
      caseScoreRatio += finaleBreakRatio[5] * sortCase[4]
      caseScoreRatio += finaleBreakRatio[6] * result[4][3]
      finaleScore.push(caseScoreRatio * baseLost)
  }
  return finaleScore
}