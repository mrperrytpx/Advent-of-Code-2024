package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"slices"
)

func isOutOfBounds(list []string, row int, col int, rowOffset int, colOffset int) bool {
	return row+rowOffset < 0 || row+rowOffset >= len(list) || col+colOffset < 0 || col+colOffset >= len(list[0])
}

func findNeighbouringMs(list []string, row int, col int, jump int) [][]int {
	neighbours := [][]int{}

	for i := -1; i <= 1; i += jump {
		for j := -1; j <= 1; j += jump {
			if i == 0 && j == 0 {
				continue
			}

			currRow, currCol := row+i, col+j
			if isOutOfBounds(list, currRow, currCol, 0, 0) {
				continue
			}

			if list[currRow][currCol] != 'M' {
				continue
			}

			n := []int{currRow, currCol}
			neighbours = append(neighbours, n)
		}
	}

	return neighbours
}

func Part1(list []string) int {
	xmasCnt := 0

	for row := range list {
		for col := range list[row] {
			if list[row][col] == 'X' {
				neighbours := findNeighbouringMs(list, row, col, 1)

				if len(neighbours) == 0 {
					continue
				}

				for _, n := range neighbours {
					dRow, dCol := n[0]-row, n[1]-col

					if isOutOfBounds(list, row, col, dRow*2, dCol*2) {
						continue
					}

					if list[row+dRow*2][col+dCol*2] != 'A' {
						continue
					}

					if isOutOfBounds(list, row, col, dRow*3, dCol*3) {
						continue
					}

					if list[row+dRow*3][col+dCol*3] != 'S' {
						continue
					}

					xmasCnt++
				}
			}
		}
	}

	return xmasCnt
}

func findDiagonals(list []string, row int, col int, jump int) string {
	var shape []byte

	for i := -1; i <= 1; i += jump {
		for j := -1; j <= 1; j += jump {
			currRow, currCol := row+i, col+j
			if isOutOfBounds(list, currRow, currCol, 0, 0) {
				continue
			}

			shape = append(shape, list[currRow][currCol])
		}
	}

	return string(shape)
}

func Part2(list []string) int {
	xmasCnt := 0

	acceptableShapes := []string{"MSMS", "MMSS", "SSMM", "SMSM"}

	for row := range list {
		for col := range list[row] {
			if list[row][col] == 'A' {
				shape := findDiagonals(list, row, col, 2)

				if slices.Contains(acceptableShapes, shape) {
					xmasCnt++
				}
			}
		}
	}

	return xmasCnt
}

func main() {
	file := ReadInput("Day04/input.txt")
	fmt.Println("Part 1 answer:", Part1(file))
	fmt.Println("Part 2 answer:", Part2(file))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var list []string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := scan.Text()
		list = append(list, text)
	}

	return list
}
