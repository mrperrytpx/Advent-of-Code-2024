package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func extractMul(line string) int {
	leftChop := strings.Replace(line, "mul(", "", -1)
	rightChop := strings.Replace(leftChop, ")", "", -1)
	pairButTheyreStrings := strings.Split(rightChop, ",")

	ints := make([]int, len(pairButTheyreStrings))

	for i, p := range pairButTheyreStrings {
		num, err := strconv.Atoi(p)
		if err != nil {
			continue
		}
		ints[i] = num
	}

	return ints[0] * ints[1]
}

func Part1(line string) int {
	sumOfInstructions := 0
	const regexPattern = `((mul\()(\d+,\d+)\))`

	re := regexp.MustCompile(regexPattern)
	matchedStrs := re.FindAllString(line, -1)

	for _, str := range matchedStrs {
		sumOfInstructions += extractMul(str)
	}

	return sumOfInstructions
}

func Part2(line string) int {
	sumOfInstructions := 0
	isEnabled := true
	const regexPattern = `((mul\()(\d+,\d+)\))|(don't\(\))|(do\(\))`

	re := regexp.MustCompile(regexPattern)
	matchedStrs := re.FindAllString(line, -1)

	for _, str := range matchedStrs {
		if str == "do()" {
			isEnabled = true
			continue
		}

		if str == "don't()" {
			isEnabled = false
			continue
		}

		if !isEnabled {
			continue
		}

		sumOfInstructions += extractMul(str)
	}

	return sumOfInstructions
}

func main() {
	line := ReadInput("Day03/input.txt")
	fmt.Println("Part 1 solution:", Part1(line))
	fmt.Println("Part 2 solution:", Part2(line))
}

func ReadInput(fname string) string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var text string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text += scan.Text()
	}

	return text
}
