package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

const ROWS = 71
const COLS = 71
const SIM = 1024

var sx, sy = 0, 0
var ex, ey = ROWS - 1, COLS - 1
var DIRECTIONS = [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}

func isInBounds(row, col int) bool {
	return row >= 0 && row < ROWS && col >= 0 && col < COLS
}

func Part1(lines []string) int {
	step := 0
	path := make(map[string]bool)
	queue := [][]int{{sy, sx, step}}

	blockedSet := make(map[string]bool)
	for _, element := range lines[:SIM] {
		blockedSet[element] = true
	}

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		py, px, s := curr[0], curr[1], curr[2]

		key := fmt.Sprintf("%d,%d", py, px)
		if path[key] {
			continue
		}
		path[key] = true

		if px == ex && py == ey {
			step = s
			break
		}

		for _, dirs := range DIRECTIONS {
			ny, nx := py+dirs[1], px+dirs[0]
			nKey := fmt.Sprintf("%d,%d", ny, nx)

			if isInBounds(ny, nx) && !blockedSet[nKey] {
				queue = append(queue, []int{ny, nx, s + 1})
			}
		}
	}

	return step
}

func Part2(lines []string) string {
	var coord string

	for i := range lines {
		path := make(map[string]bool)
		queue := [][]int{{sy, sx}}
		found := false

		blockedSet := make(map[string]bool)
		for _, element := range lines[:i+1] {
			blockedSet[element] = true
		}

		for len(queue) > 0 {
			curr := queue[0]
			queue = queue[1:]

			py, px := curr[0], curr[1]

			key := fmt.Sprintf("%d,%d", py, px)
			if path[key] {
				continue
			}
			path[key] = true

			if px == ex && py == ey {
				found = true
				break
			}

			for _, dirs := range DIRECTIONS {
				ny, nx := py+dirs[1], px+dirs[0]
				nKey := fmt.Sprintf("%d,%d", ny, nx)

				if isInBounds(ny, nx) && !blockedSet[nKey] {
					queue = append(queue, []int{ny, nx})
				}
			}
		}

		if !found {
			coord = lines[i]
			break
		}
	}

	return coord

}

func main() {
	lines := ReadInput("Day18/input.txt")
	fmt.Println("Part 1 answer:", Part1(lines))
	fmt.Println("Part 2 answer:", Part2(lines))

}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scan := bufio.NewScanner(file)

	var lines []string
	for scan.Scan() {
		lines = append(lines, scan.Text())
	}

	return lines
}
