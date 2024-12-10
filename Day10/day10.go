package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func isInBounds(file [][]int, x, y int) bool {
	return x >= 0 && x < len(file) && y >= 0 && y < len(file[0])
}

func nextTrails(file [][]int, x, y, nextHeight int) [][]int {
	nextTrails := [][]int{}
	directions := [][]int{
		{0, -1}, {-1, 0}, {1, 0}, {0, 1},
	}

	for _, d := range directions {
		nx, ny := x+d[0], y+d[1]
		if isInBounds(file, nx, ny) && file[nx][ny] == nextHeight {
			nextTrails = append(nextTrails, []int{nx, ny})
		}
	}

	return nextTrails
}

func Part1(lines [][]int) int {
	trailheadSum := 0

	for row := range lines {
		for col := range lines[row] {
			h := lines[row][col]
			if h == 0 {
				trailheads := 0
				queue := [][]int{
					{row, col, h + 1},
				}
				visitedPeaks := make(map[string]bool)

				for len(queue) > 0 {
					curr := queue[0]
					queue = queue[1:]
					tx, ty, nextHeight := curr[0], curr[1], curr[2]
					trails := nextTrails(lines, tx, ty, nextHeight)

					for _, trail := range trails {
						nx, ny := trail[0], trail[1]

						if lines[nx][ny] == 9 {
							key := fmt.Sprintf("%d:%d", nx, ny)
							if visitedPeaks[key] == true {
								continue
							}
							visitedPeaks[key] = true
							trailheads++
							continue
						}

						queue = append(queue, []int{nx, ny, nextHeight + 1})

					}

				}

				trailheadSum += trailheads
			}
		}
	}

	return trailheadSum
}

func Part2(lines [][]int) int {
	trailRatingSum := 0

	for row := range lines {
		for col := range lines[row] {
			h := lines[row][col]
			if h == 0 {
				trailheadRating := 0
				queue := [][]int{
					{row, col, h + 1},
				}
				for len(queue) > 0 {
					curr := queue[0]
					queue = queue[1:]
					tx, ty, nextHeight := curr[0], curr[1], curr[2]
					trails := nextTrails(lines, tx, ty, nextHeight)

					for _, trail := range trails {
						nx, ny := trail[0], trail[1]

						if lines[nx][ny] == 9 {
							trailheadRating++
							continue
						}

						queue = append(queue, []int{nx, ny, nextHeight + 1})
					}

				}

				trailRatingSum += trailheadRating
			}
		}
	}

	return trailRatingSum
}

func main() {
	lines := ReadInput("Day10/input.txt")
	fmt.Println("Part 1 answer:", Part1(lines))
	fmt.Println("Part 2 answer:", Part2(lines))
}

func ReadInput(fname string) [][]int {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var lines [][]int
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := strings.Split(scan.Text(), "")

		ints := make([]int, len(text))

		for i, s := range text {
			ints[i], _ = strconv.Atoi(s)
		}

		lines = append(lines, ints)
	}

	return lines
}
