package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func checkRow(row []int) int {
	direction := row[0] - row[1]

	if direction == 0 || direction > 3 {
		return 0
	}

	isAscending := direction < 0

	for i := 0; i < len(row)-1; i++ {
		if (isAscending && row[i] >= row[i+1]) || (!isAscending && row[i] <= row[i+1]) || math.Abs(float64(row[i]-row[i+1])) > 3 {
			return i
		}
	}

	return -1

}

func Part1(lists [][]int) int {
	safeReports := 0

	for _, row := range lists {
		validReport := checkRow(row)

		if validReport == -1 {
			safeReports++
		}
	}

	return safeReports
}

func Part2(lists [][]int) int {
	safeReports := 0

	for _, row := range lists {
		faultyIdx := checkRow(row)

		if faultyIdx == -1 {
			safeReports++
			continue
		}

		hydra := [][]int{}

		if faultyIdx > 0 {
			firstHead := []int{}
			firstHead = append(firstHead, row[:faultyIdx-1]...)
			firstHead = append(firstHead, row[faultyIdx:]...)
			hydra = append(hydra, firstHead)
		}

		secondHead := []int{}
		secondHead = append(secondHead, row[:faultyIdx]...)
		secondHead = append(secondHead, row[faultyIdx+1:]...)
		hydra = append(hydra, secondHead)

		if faultyIdx < len(row)-1 {
			thirdHead := []int{}
			thirdHead = append([]int(nil), row[:faultyIdx+1]...)
			thirdHead = append(thirdHead, row[faultyIdx+2:]...)
			hydra = append(hydra, thirdHead)
		}

		for _, head := range hydra {
			if checkRow(head) == -1 {
				safeReports++
				break
			}
		}
	}

	return safeReports
}

func main() {
	lists := ReadInput("Day02/input.txt")
	fmt.Println("Part 1 answer:", Part1(lists))
	fmt.Println("Part 2 answer:", Part2(lists))
}

func ReadInput(fname string) [][]int {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var lists [][]int
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := strings.Split(scan.Text(), " ")
		ints := make([]int, len(text))

		for i, s := range text {
			ints[i], _ = strconv.Atoi(s)
		}

		lists = append(lists, ints)
	}

	return lists
}
