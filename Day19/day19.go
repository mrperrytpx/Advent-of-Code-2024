package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func Part1(d string, towels []string, memo map[string]bool) bool {
	if val, ok := memo[d]; ok {
		return val
	}

	if len(d) == 0 {
		return true
	}

	for _, t := range towels {
		if strings.HasPrefix(d, t) {
			rem := d[len(t):]
			if Part1(rem, towels, memo) {
				memo[d] = true
				return true
			}
		}
	}

	memo[d] = false
	return false
}

func Part2(d string, towels []string, memo map[string]int) int {
	if val, ok := memo[d]; ok {
		return val
	}

	if len(d) == 0 {
		return 1
	}

	count := 0
	for _, t := range towels {
		if strings.HasPrefix(d, t) {
			rem := d[len(t):]
			count += Part2(rem, towels, memo)
		}
	}

	memo[d] = count
	return count
}

func main() {
	lines := ReadInput("Day19/input.txt")
	towels := strings.Split(lines[0], ", ")
	designs := strings.Split(lines[1], "\\n")

	poss, combos := 0, 0
	for _, d := range designs {
		possMemo := make(map[string]bool)

		if Part1(d, towels, possMemo) {
			poss++
		}

		comboMemo := make(map[string]int)
		combos += Part2(d, towels, comboMemo)
	}

	fmt.Println("Part 1 answer:", poss)
	fmt.Println("Part 2 answer:", combos)

}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var lines []string
	var temp []string

	scan := bufio.NewScanner(file)
	for scan.Scan() {
		temp = append(temp, scan.Text())
	}

	lines = append(lines, strings.Split(strings.Join(temp, "\\n"), "\\n\\n")...)

	return lines
}
