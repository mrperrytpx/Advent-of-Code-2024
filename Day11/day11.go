package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func genStonesMap(line []int) map[int]int {
	stonesMap := make(map[int]int)

	for _, s := range line {
		if _, exists := stonesMap[s]; exists {
			stonesMap[s] = stonesMap[s] + 1
		} else {
			stonesMap[s] = 1
		}
	}

	return stonesMap
}

func simulate(line []int, blinks int) int {
	stonesMap := genStonesMap(line)
	const YEAR = 2024

	for i := 0; i < blinks; i++ {
		nextStonesMap := make(map[int]int)
		for s, c := range stonesMap {
			if s == 0 {
				nextStonesMap[1] = nextStonesMap[1] + c
				continue
			}

			stoneAsStr := fmt.Sprintf("%d", s)
			if len(stoneAsStr)%2 == 0 {
				left := stoneAsStr[0 : len(stoneAsStr)/2]
				right := stoneAsStr[len(stoneAsStr)/2:]

				intLeft, _ := strconv.Atoi(left)
				intRight, _ := strconv.Atoi(right)

				nextStonesMap[intLeft] = nextStonesMap[intLeft] + c
				nextStonesMap[intRight] = nextStonesMap[intRight] + c
				continue
			}

			nextStonesMap[s*YEAR] = nextStonesMap[s*YEAR] + c
		}

		stonesMap = nextStonesMap
	}

	stoneCount := 0
	for _, v := range stonesMap {
		stoneCount += v
	}

	return stoneCount
}

func main() {
	line := ReadInput("Day11/input.txt")
	fmt.Println("Part 1 answer:", simulate(line, 25))
	fmt.Println("Part 2 answer:", simulate(line, 75))
}

func ReadInput(fname string) []int {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var line []int
	scan := bufio.NewScanner(file)
	for scan.Scan() {
		text := strings.Split(scan.Text(), " ")
		ints := make([]int, len(text))
		for i, s := range text {
			ints[i], _ = strconv.Atoi(s)
		}

		line = ints
	}

	return line

}
