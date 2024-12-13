package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func tokensSpent(lines []string, num int) int {
	totalTokens := 0.0
	bonus := float64(num)
	for _, line := range lines {
		regexPattern := `(\d+)`
		re := regexp.MustCompile(regexPattern)
		matchedStrs := re.FindAllString(line, -1)

		nums := make([]float64, 6)
		for i := range matchedStrs {
			n, _ := strconv.Atoi(matchedStrs[i])
			nums[i] = float64(n)
		}

		ax, ay := nums[0], nums[1]
		bx, by := nums[2], nums[3]
		px, py := nums[4]+bonus, nums[5]+bonus

		det := ax*by - ay*bx

		if det == 0 {
			continue
		}

		detA := px*by - py*bx
		detB := px*ay - py*ax

		a := detA / det
		b := -detB / det

		if a > 0 && b > 0 && math.Mod(a, 1) == 0 && math.Mod(b, 1) == 0 {
			totalTokens += a*3 + b
		}
	}

	return int(totalTokens)
}

func main() {
	lines := ReadInput("Day13/input.txt")
	fmt.Println("Part 1 answer:", tokensSpent(lines, 0))
	fmt.Println("Part 2 answer:", tokensSpent(lines, 10000000000000))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	scan := bufio.NewScanner(file)

	var lines []string

	var line string
	for scan.Scan() {
		line += scan.Text() + "\\n"
	}

	lines = append(lines, strings.Split(line, "\\n\\n")...)

	return lines
}
