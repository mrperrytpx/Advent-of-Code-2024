package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strings"
)

func Part1(area []string, instructions string) int {
	movementMap := map[rune][]int{
		'<': {0, -1},
		'^': {-1, 0},
		'>': {0, 1},
		'v': {1, 0},
	}

	strArea := strings.Join(area, "")

	rx := int(math.Floor(float64(strings.Index(strArea, "@") / len(area[0]))))
	ry := strings.Index(strArea, "@") % len(area[0])

	grid := make([][]string, len(area))
	for i, row := range area {
		grid[i] = strings.Split(row, "")
	}

	grid[rx][ry] = "."

	for _, ins := range instructions {
		dir := movementMap[ins]
		dx, dy := dir[0], dir[1]

		nx, ny := rx+dx, ry+dy
		inFront := grid[nx][ny]

		if inFront == "#" {
			continue
		}

		if inFront == "." {
			rx = nx
			ry = ny
			continue
		}

		if inFront == "O" {
			for i, j := nx, ny; ; i, j = i+dx, j+dy {
				curr := grid[i][j]
				next := grid[i+dx][j+dy]

				if next == "#" {
					break
				}

				if curr == "O" && next == "." {
					grid[nx][ny] = "."
					grid[i+dx][j+dy] = "O"
					rx = nx
					ry = ny
					break
				}
			}
		}

	}

	sumOfGps := 0
	for i := range grid {
		for j := range grid[i] {
			if grid[i][j] == "O" {
				sumOfGps += 100*i + j
			}
		}
	}

	return sumOfGps

}

func main() {
	lines := ReadInput("Day15/input.txt")
	area := strings.Split(lines[0], "\\n")
	instructions := strings.ReplaceAll(lines[1], "\\n", "")
	fmt.Println("Part 1 answer:", Part1(area, instructions))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scan := bufio.NewScanner(file)

	var lines []string

	var line string
	for scan.Scan() {
		line += scan.Text() + "\\n"
	}

	lines = append(lines, strings.Split(line, "\\n\\n")...)

	return lines
}
