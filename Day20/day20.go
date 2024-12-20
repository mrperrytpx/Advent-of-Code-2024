package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

type QueueItem struct {
	x    int
	y    int
	path []string
}

func getDistance(start, end string) int {
	sNums := make([]int, 2)
	for i, s := range strings.Split(start, ",") {
		n, _ := strconv.Atoi(s)
		sNums[i] = n
	}

	eNums := make([]int, 2)
	for i, e := range strings.Split(end, ",") {
		n, _ := strconv.Atoi(e)
		eNums[i] = n
	}

	sx, sy := sNums[0], sNums[1]
	ex, ey := eNums[0], eNums[1]

	return int(math.Abs(float64(sx-ex)) + math.Abs(float64(sy-ey)))
}

func Solve(lines []string, cond int) int {
	sx, sy := 0, 0
	ex, ey := 0, 0

	for i := range lines {
		for j := range lines[i] {
			if lines[i][j] == 'S' {
				sx = i
				sy = j
			}

			if lines[i][j] == 'E' {
				ex = i
				ey = j
			}
		}
	}

	var path []string
	directions := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	queue := []QueueItem{
		{x: sx, y: sy, path: []string{}},
	}
	visited := make(map[string]bool)

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		px, py, p := curr.x, curr.y, curr.path

		key := fmt.Sprintf("%d,%d", px, py)
		if _, exists := visited[key]; exists {
			continue
		}
		visited[key] = true
		p = append(p, key)

		if px == ex && py == ey {
			path = p
			break
		}

		for _, dirs := range directions {
			nx, ny := px+dirs[0], py+dirs[1]
			if lines[nx][ny] != '#' {
				queue = append(queue, QueueItem{x: nx, y: ny, path: p})
			}
		}

	}

	pico := 0
	for i := range path {
		start := path[i]
		for j := len(path) - 1; j >= i; j-- {
			end := path[j]
			dist := getDistance(start, end)

			if dist > cond {
				continue
			}

			jumped := slices.Index(path, end) - slices.Index(path, start) - dist
			if jumped >= 100 {
				pico++
			}
		}
	}

	return pico
}

func main() {
	lines := ReadInput("Day20/input.txt")
	fmt.Println("Part 1 answer:", Solve(lines, 2))
	fmt.Println("Part 2 answer:", Solve(lines, 20))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var lines []string
	scan := bufio.NewScanner(file)
	for scan.Scan() {
		lines = append(lines, scan.Text())
	}

	return lines
}
