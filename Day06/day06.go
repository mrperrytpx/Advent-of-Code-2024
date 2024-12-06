package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

type TGuardData struct {
	pos []int
	dir []int
	idx int
}

type TGuardPath struct {
	path  map[string]bool
	isInf bool
}

func initialGuardData(lines [][]string, shapes []string, directions [][]int) TGuardData {
	var data TGuardData

outerLoop:
	for row := range lines {
		for col := range lines[0] {
			if lines[row][col] != "#" && lines[row][col] != "." {
				data.pos = append(data.pos, row, col)
				data.idx = slices.Index(shapes, string(lines[row][col]))
				data.dir = directions[data.idx]
				break outerLoop
			}
		}
	}

	return data
}

func isOutOfBounds(lines [][]string, coords []int) bool {
	row, col := coords[0], coords[1]
	return row < 0 || row >= len(lines) || col < 0 || col >= len(lines[row])
}

func guardsPath(lines [][]string, directions [][]int, data TGuardData, shouldReturnPath bool) TGuardPath {
	guardsPath := TGuardPath{
		path:  make(map[string]bool),
		isInf: false,
	}

	stateMap := make(map[string]bool)
	for {
		state := fmt.Sprintf("%d:%d:%d", data.pos[0], data.pos[1], data.idx%4)

		if shouldReturnPath {
			visited := fmt.Sprintf("%d:%d", data.pos[0], data.pos[1])
			stateMap[visited] = true
		} else {
			if stateMap[state] == true {
				guardsPath.isInf = true
				return guardsPath
			}
			stateMap[state] = true
		}

		nextGuardPos := []int{data.pos[0] + data.dir[0], data.pos[1] + data.dir[1]}

		if oob := isOutOfBounds(lines, nextGuardPos); oob {
			if shouldReturnPath {
				guardsPath.path = stateMap
				return guardsPath
			} else {
				guardsPath.isInf = false
				return guardsPath
			}
		}

		if lines[nextGuardPos[0]][nextGuardPos[1]] == "#" {
			data.idx++
			data.dir = directions[data.idx%4]
			continue
		}

		data.pos = nextGuardPos
	}
}

func main() {
	lines := ReadInput("Day06/input.txt")

	GUARD_SHAPES := []string{"^", ">", "v", "<"}
	GUARD_DIRECTION := [][]int{{-1, 0}, {0, 1}, {1, 0}, {0, -1}}

	data := initialGuardData(lines, GUARD_SHAPES, GUARD_DIRECTION)
	initialGuardPath := guardsPath(lines, GUARD_DIRECTION, data, true)

	fmt.Println("Part 1 answer:", len(initialGuardPath.path))

	infinites := 0
	for key := range initialGuardPath.path {
		coords := strings.Split(key, ":")
		row, _ := strconv.Atoi(coords[0])
		col, _ := strconv.Atoi(coords[1])

		lines[row][col] = "#"

		if guardPath := guardsPath(lines, GUARD_DIRECTION, data, false); guardPath.isInf {
			infinites++
		}

		lines[row][col] = "."
	}

	fmt.Println("Part 2 answer:", infinites)
}

func ReadInput(fname string) [][]string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var lines [][]string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := strings.Split(scan.Text(), "")
		lines = append(lines, text)
	}

	return lines
}
