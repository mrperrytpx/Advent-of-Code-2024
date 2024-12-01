package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func Part1(lists [][]int) int {

	left, right := make([]int, 0), make([]int, 0)

	var cumulativeDistance int

	for i := 0; i < len(lists); i++ {
		left = append(left, lists[i][0])
		right = append(right, lists[i][1])
	}

	sort.Ints(left)
	sort.Ints(right)

	for i := 0; i < len(left); i++ {
		cumulativeDistance += int(math.Abs(float64(right[i]) - float64(left[i])))
	}

	return cumulativeDistance

}

func Part2(lists [][]int) int {
	left, right := make([]int, 0), make([]int, 0)

	var similarityScore int

	for i := 0; i < len(lists); i++ {
		left = append(left, lists[i][0])
		right = append(right, lists[i][1])
	}

	for i := 0; i < len(left); i++ {
		for j := 0; j < len(right); j++ {
			if left[i] == right[j] {
				similarityScore += left[i]
			}
		}
	}

	return similarityScore
}

func main() {
	lists := ReadInput("Day01/input.txt")
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
		text := strings.Split(scan.Text(), "   ")

		ints := make([]int, len(text))

		for i, s := range text {
			ints[i], _ = strconv.Atoi(s)
		}

		lists = append(lists, ints)
	}

	return lists
}
