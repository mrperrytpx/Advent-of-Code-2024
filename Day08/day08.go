package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strings"
)

type TAntennas map[string][][]int

func getAntennas(file [][]string) TAntennas {
	antennas := make(TAntennas)

	for i := range file {
		for j := range file[i] {
			if file[i][j] != "." {
				if _, exists := antennas[file[i][j]]; !exists {
					antennas[file[i][j]] = [][]int{}
				}
				antennas[file[i][j]] = append(antennas[file[i][j]], []int{i, j})
			}
		}
	}

	return antennas
}

func isInBounds(file *[][]string, coords []int) bool {
	row, col := coords[0], coords[1]
	return row >= 0 && row < len(*file) && col >= 0 && col < len((*file)[0])
}

type TAntinodes map[string]bool

func Part1(file *[][]string, antennas TAntennas) int {
	antinodes := make(TAntinodes)

	for _, allCoords := range antennas {
		for i := range allCoords {
			for j := i + 1; j < len(allCoords); j++ {
				currAntenna, nextAntenna := allCoords[i], allCoords[j]

				xDiff := int(math.Abs(float64(nextAntenna[0] - currAntenna[0])))
				yDiff := (nextAntenna[1] - currAntenna[1]) * -1

				firstAA := []int{currAntenna[0] - xDiff, currAntenna[1] + yDiff}
				secondAA := []int{nextAntenna[0] + xDiff, nextAntenna[1] - yDiff}

				if isInBounds(file, firstAA) {
					state := fmt.Sprintf("%d:%d", firstAA[0], firstAA[1])
					antinodes[state] = true
				}

				if isInBounds(file, secondAA) {
					state := fmt.Sprintf("%d:%d", secondAA[0], secondAA[1])
					antinodes[state] = true
				}
			}
		}
	}

	return len(antinodes)
}

func Part2(file *[][]string, antennas TAntennas) int {
	antinodes := make(TAntinodes)

	for _, allCoords := range antennas {
		for i := range allCoords {
			for j := i + 1; j < len(allCoords); j++ {
				currAntenna, nextAntenna := allCoords[i], allCoords[j]

				xDiff := nextAntenna[0] - currAntenna[0]
				yDiff := nextAntenna[1] - currAntenna[1]

				tradeAntinodes := func(antenna []int, xDiff, yDiff int) {
					for {
						newAntenna := []int{antenna[0] + xDiff, antenna[1] + yDiff}

						if !isInBounds(file, newAntenna) {
							break
						}

						state := fmt.Sprintf("%d:%d", newAntenna[0], newAntenna[1])
						antinodes[state] = true
						antenna = newAntenna
					}
				}

				tradeAntinodes(currAntenna, xDiff, yDiff)
				tradeAntinodes(nextAntenna, -xDiff, -yDiff)
			}
		}
	}

	return len(antinodes)
}

func main() {
	file := ReadInput("Day08/input.txt")
	antennas := getAntennas(file)
	fmt.Println("Part 1 answer:", Part1(&file, antennas))
	fmt.Println("Part 2 answer:", Part2(&file, antennas))
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
