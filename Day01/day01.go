package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func Part1(lists [][]int) int {

	var cumulativeDistance int

	for _, s := range lists {
		cumulativeDistance += s[1] - s[0]
	}

	return cumulativeDistance

}

func Part2(lists [][]int) int {
	var similarityScore int

	for _, s := range lists {
		for _, k := range lists {
			if s[0] == k[1] {
				similarityScore += s[0]
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
