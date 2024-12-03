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

func Part1(line string) int {
	sumOfInstructions := 0
	const regexPattern = `((mul\()(\d+,\d+)\))`

	re := regexp.MustCompile(regexPattern)
	pairs := re.FindAllString(line, -1)

	for _, v := range pairs {
		firstSwap := strings.Replace(v, "mul(", "", -1)
		secondSwap := strings.Replace(firstSwap, ")", "", -1)
		pairButTheyreStrings := strings.Split(secondSwap, ",")

		ints := make([]int, len(pairButTheyreStrings))

		for i, p := range pairButTheyreStrings {
			ints[i], _ = strconv.Atoi(p)
		}

		sumOfInstructions += ints[0] * ints[1]

	}

	return sumOfInstructions
}

func Part2(line string) int {
	sumOfInstructions := 0
	flag := true

	const regexPattern = `((mul\()(\d+,\d+)\))|(don't\(\))|(do\(\))`

	re := regexp.MustCompile(regexPattern)
	pairs := re.FindAllString(line, -1)

	for _, v := range pairs {
		if v == "do()" {
			flag = true
			continue
		}

		if v == "don't()" {
			flag = false
			continue
		}

		if !flag {
			continue
		}

		firstSwap := strings.Replace(v, "mul(", "", -1)
		secondSwap := strings.Replace(firstSwap, ")", "", -1)
		pairButTheyreStrings := strings.Split(secondSwap, ",")

		ints := make([]int, len(pairButTheyreStrings))

		for i, p := range pairButTheyreStrings {
			ints[i], _ = strconv.Atoi(p)
		}

		sumOfInstructions += ints[0] * ints[1]

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
