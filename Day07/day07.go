package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

type TData struct {
	tar int
	seq []int
}

func getData(line string) TData {
	data := TData{}

	splitLine := strings.Split(line, ": ")
	stringTar, stringSeq := splitLine[0], splitLine[1]

	tar, _ := strconv.Atoi(stringTar)

	seq := []int{}
	splitStringSeq := strings.Split(stringSeq, " ")

	for _, opp := range splitStringSeq {
		val, _ := strconv.Atoi(opp)
		seq = append(seq, val)
	}

	data.seq = seq
	data.tar = tar

	return data
}

func addAndMultiply(arr []int, curr, tar, i int) bool {
	next := arr[i]
	add := curr + next
	mul := curr * next
	i++

	if i == len(arr) {
		return add == tar || mul == tar
	}

	return (add <= tar && addAndMultiply(arr, add, tar, i)) ||
		(mul <= tar && addAndMultiply(arr, mul, tar, i))

}

func addMultiAndConcat(arr []int, curr, tar, i int) bool {
	next := arr[i]
	add := curr + next
	mul := curr * next
	concat, _ := strconv.Atoi(fmt.Sprintf("%d%d", curr, next))
	i++

	if i == len(arr) {
		return add == tar || mul == tar || concat == tar
	}

	return (add <= tar && addMultiAndConcat(arr, add, tar, i)) ||
		(mul <= tar && addMultiAndConcat(arr, mul, tar, i)) ||
		(concat <= tar && addMultiAndConcat(arr, concat, tar, i))

}

func main() {
	lines := ReadInput("Day07/input.txt")

	part1 := 0
	part2 := 0
	start := time.Now()

	for _, l := range lines {
		data := getData(l)

		first := data.seq[0]

		if canBeTrue := addAndMultiply(data.seq, first, data.tar, 1); canBeTrue {
			part1 += data.tar
		}
		if canBeTrue := addMultiAndConcat(data.seq, first, data.tar, 1); canBeTrue {
			part2 += data.tar
		}

	}
	fmt.Println(time.Since(start))

	fmt.Println("Part 1 answer:", part1)
	fmt.Println("Part 2 answer:", part2)

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
		text := scan.Text()
		lines = append(lines, text)
	}

	return lines
}
