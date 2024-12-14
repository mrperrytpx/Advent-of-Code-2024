package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func Part1(lines []string, rows, cols, seconds int) int {
	MIDDLE_ROW := int(math.Floor(float64(rows) / 2))
	MIDDLE_COL := int(math.Floor(float64(cols) / 2))

	regexPattern := `(-?\d+)`
	re := regexp.MustCompile(regexPattern)

	quadrants := make([]int, 4)
	for _, line := range lines {
		matchedStrs := re.FindAllString(line, -1)

		nums := make([]int, 6)
		for i := range matchedStrs {
			n, _ := strconv.Atoi(matchedStrs[i])
			nums[i] = n
		}

		pCol, pRow, vCol, vRow := nums[0], nums[1], nums[2], nums[3]

		nx := (((vRow*seconds + pRow) % rows) + rows) % rows
		ny := (((vCol*seconds + pCol) % cols) + cols) % cols

		if nx < MIDDLE_ROW && ny < MIDDLE_COL {
			quadrants[0]++
		}
		if nx > MIDDLE_ROW && ny < MIDDLE_COL {
			quadrants[1]++
		}
		if nx < MIDDLE_ROW && ny > MIDDLE_COL {
			quadrants[2]++
		}
		if nx > MIDDLE_ROW && ny > MIDDLE_COL {
			quadrants[3]++
		}

	}

	result := 1
	for _, q := range quadrants {
		result *= q
	}

	return result
}

func Part2(lines []string, rows, cols int) int {
	regexPattern := `(-?\d+)`

	step := 1
outerLoop:
	for {
		robots := make(map[string]bool)
		for _, line := range lines {
			re := regexp.MustCompile(regexPattern)
			matchedStrs := re.FindAllString(line, -1)

			nums := make([]int, 4)
			for i := range matchedStrs {
				n, _ := strconv.Atoi(matchedStrs[i])
				nums[i] = n
			}
			pCol, pRow, vCol, vRow := nums[0], nums[1], nums[2], nums[3]

			nx := (((vRow*step + pRow) % rows) + rows) % rows
			ny := (((vCol*step + pCol) % cols) + cols) % cols

			key := fmt.Sprintf("%d:%d", nx, ny)
			if _, exists := robots[key]; exists {
				step++
				continue outerLoop
			}

			robots[key] = true
		}

		if len(robots) == len(lines) {
			for robot := range robots {
				nums := make([]int, 2)
				for i, s := range strings.Split(robot, ":") {
					n, _ := strconv.Atoi(s)
					nums[i] = n
				}
				x, y := nums[0], nums[1]

				lkey := fmt.Sprintf("%d:%d", x+1, y-1)
				ckey := fmt.Sprintf("%d:%d", x+1, y)
				rkey := fmt.Sprintf("%d:%d", x+1, y+1)
				if robots[lkey] == true && robots[ckey] == true && robots[rkey] == true {
					return step
				}
			}
		}

		step++
	}
}

func main() {
	lines := ReadInput("Day14/input.txt")
	fmt.Println("Part 1 answer:", Part1(lines, 103, 101, 100))
	fmt.Println("Part 2 answer:", Part2(lines, 103, 101))
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
